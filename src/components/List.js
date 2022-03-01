import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import {url} from '../helpers/url';
import '../styles/List.css';
import { Link } from 'react-router-dom';

export const List = () => {

    const [registro, setRegistro] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
            axios.get(url)
            .then(response => {
                setRegistro(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteData = (id) => {
         axios.delete(url+id)
         .then(response => {
             getData();
           console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }

    console.log(registro)
    return (
        <div>
              <button><Link to='/dashboard'>Regresar a Inicio</Link></button>
            <table className="tabla">
                <thead>
                    <tr>
                    <th>Nombres y Apellidos</th>
                    <th>Tipo Documento</th>
                    <th>Número Documento</th>
                    <th>Semestre</th>
                    <th>Celular</th>
                    <th>Programa Académico</th>
                    <th>Imagen</th>
                    <th>Acción</th>
                    </tr>
                </thead>
                
                 <tbody>
                     
                     {
                         registro.map(r => (
                             <tr key={r.id}>
                                 <td>{r.nombre}</td>
                                 <td>{r.tipo}</td>
                                 <td>{r.numero}</td>
                                 <td>{r.semestre}</td>
                                 <td>{r.celular}</td>
                                 <td>{r.programaacademico}</td>
                                 <td><img src={r.imagen} width="40" height="50" alt=""/></td>
                                 <td><button onClick={() => deleteData(r.id)}>Eliminar</button></td>
                            </tr>
                         ))
                     }
                 </tbody>
            </table>
        </div>
    )
}
