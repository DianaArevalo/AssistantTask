using System;
using System.Collections.Generic;

namespace AssistantTask.Server.Models;

public partial class Task
{
    public int IdTask { get; set; }

    public string? Description { get; set; }

    public DateTime? RegisterDate { get; set; }
}
