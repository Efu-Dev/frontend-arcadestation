import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import download from 'downloadjs';

const ConsultarActividad = () => {

    const {codigo} = useParams();
    const [datos, setDatos] = useState({});
    const [maquina, setMaquina] = useState(undefined);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        console.log(codigo);
        axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/registro/actividad/${codigo}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            console.log(res);
            setDatos(res.data.datos);
            setLoading1(false);
          }).catch((e) => console.log(e));

        axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/maquinas/${String(codigo)}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            console.log(res);
            setMaquina(res.data.datos);
            setLoading2(false);
          }).catch((e) => console.log(e));
    }, []);

    const reporteActividad = () => {
        axios.create({
          baseURL: `https://arcadestation.pythonanywhere.com/reportes/generar/actividad/${codigo}`,
          'headers': {
            'Authorization': localStorage.getItem('access_token_as')
          }
        }).get().then((res) => {
          const content = res.headers['content-type'];
          download(res.data, 'REPORTE_ACTIVIDAD_ARCADESTATION.pdf', content);
        }).catch((e) => console.log(e));
      };

    if(loading1 || loading2)
        return <h1>Cargando...</h1>    

    return (
        <>
            <h1>Registro de Actividad</h1>
            <ul>
                <li><b>Máquina: </b> {maquina.nombre}</li>
                <li><b>Código: </b> {maquina.codigo}</li>
                <li><b>Precio: </b> {maquina.precio}</li>
                <li><b>Reporte: </b> <a href="#" onClick={reporteActividad}>Imprimir</a></li>
            </ul>

            {
                datos && datos.length > 0 ?
                (
                    <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Puntaje</th>
                        <th>Tarjeta</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    datos.map((registro) => {
                        return(<tr key={registro.id}>
                            <td style={{border: 'solid 1px black'}}>{`${new Date(registro.fecha).getDate()}/${new Date(registro.fecha).getMonth()+1}/${new Date(registro.fecha).getFullYear()} 
                            ${new Date(registro.fecha).getHours()}:${new Date(registro.fecha).getMinutes()}`}</td>
                            <td style={{border: 'solid 1px black'}}>{registro.puntaje}</td>
                            <td style={{border: 'solid 1px black'}}>{registro.tarjeta}</td>
                        </tr>)
                    })
                }
                </tbody>
                
            </table>
                ) : 
                <h1>No hay actividad registrada en esta máquina.</h1>
            }

            
        </>
        
    )
};

export default ConsultarActividad;