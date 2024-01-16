import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {

    const [task, setTask] = useState([])

    const showTask = async () => {
        console.log("Invocando API...");
        fetch("api/Task/List").then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
        })
            .then((responseJson) => {
                const data =  responseJson.json();
                setTask(data);
            })
            .catch((error) => {
                console.error(error)
            });
        console.log("Esperando respuesta...");

      }

    //Metodo convertir Fecha
    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + " | " + hora
    }

    useEffect(() => {
        showTask();
    }, [])

    return (
        <div className= "container bg-dark p-4 vh-100">
            <h2 className= "text-white">Pendientes</h2>
            <div className="row">

                <div className="col-sm-12">    </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">


                    <div className="list-group">
                        {
                            task.map(
                                (item) => (
                                    <div key={item.idTask }
                                        className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.Description}</h5>

                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">{formatDate(item.RegisterDate)}</small>
                                            <button className="btn btn-sm btn-outline-danger">Cerrar</button>
                                        </div>
                                        
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
    }


export default App;