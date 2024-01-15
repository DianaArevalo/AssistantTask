using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AssistantTask.Server.Models;

namespace AssistantTask.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TaskController : ControllerBase
	{

		private readonly TaskContext _dbcontext;

		public TaskController(TaskContext context)
		{ 
			_dbcontext = context;
		}

		[HttpGet]
		[Route("List")]

		public async Task<IActionResult> Lista()
		{
			List<Models.Task> lista = _dbcontext.Tasks.OrderByDescending(t => t.IdTask).ThenBy(t => t.RegisterDate).ToList();

			return StatusCode(StatusCodes.Status200OK, lista);
		}

		[HttpPost]
		[Route("Save")]
		public async Task<IActionResult> Save([FromBody] Models.Task request)
		{
			await _dbcontext.Tasks.AddAsync(request);
			await _dbcontext.SaveChangesAsync();
			return StatusCode(StatusCodes.Status200OK, "ok");
		}


		[HttpDelete]
		[Route("Close/{id:int}")]
		public async Task<IActionResult> Close(int id)
		{
            Models.Task task = _dbcontext.Tasks.Find(id);

			await _dbcontext.Tasks.AddAsync(task);
			await _dbcontext.SaveChangesAsync();
			return StatusCode(StatusCodes.Status200OK, "ok");
		}

	}
	}

