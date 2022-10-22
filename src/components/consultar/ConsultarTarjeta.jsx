import React, {useState} from 'react';
import axios from 'axios';

const ConsultarTarjeta = () => {

    const [datos, setDatos] = useState({});
    const [cedula, setCedula] = useState('');
    const [datosActuales, setDatosActuales] = useState([]);

    const mostrarTarjeta = (e) => {
        e.preventDefault();
        const datosEmpleado = datos.filter((i) => {
            console.log(`${Number(i.cedula_id)} ${Number(cedula)} ${Number(i.cedula_id) === Number(cedula)}`)
            return Number(i.cedula_id) === Number(cedula);
        });
        console.log(datosEmpleado)
        if(datosEmpleado.length > 0)
            setDatosActuales(datosEmpleado);
        else
            alert("No hay una tarjeta con ese número.");
        console.log(datosActuales)
    };

    const onChangeNumero = (nuevo) => {
        setCedula(nuevo);
        setDatosActuales(datos);
    }   

    return (
        <>
            <h1>Consultar Tarjeta</h1>
            <form onSubmit={(e) => mostrarTarjeta(e)}>
                <label>Número:</label>
                <input type="text" pattern='[0-9]+' onChange={(e) => onChangeNumero(e.target.value.trim())} required />
                <button type="submit">Buscar</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Cédula</th>
                        <th># Tarjeta</th>
                        <th>Saldo</th>
                        <th>Fecha de Creación</th>
                        <th>¿Anulada?</th>
                        <th>Fecha de Anulación</th>                   
                    </tr>
                </thead>
                
                <tbody>
                {datosActuales.map((tarjeta) => {
                    return(<tr key={tarjeta.id}>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.persona.nombre}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.cedula_id}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.persona.genero === 'H' ? "Hombre" : "Mujer"}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.persona.direccion}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.cargo}</td>
                        <td style={{border: 'solid 1px black'}}>{`${new Date(tarjeta.fecha_entrada).getDate()}/${new Date(tarjeta.fecha_entrada).getMonth()+1}/${new Date(tarjeta.fecha_entrada).getFullYear()} 
                        ${new Date(tarjeta.fecha_entrada).getHours()}:${new Date(tarjeta.fecha_entrada).getMinutes()}`}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.email}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.telefono}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.usuario.username}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.activo === 'S' ? "Sí" : "No"}</td>
                        <td style={{border: 'solid 1px black'}}>
                            {tarjeta.usuario.intentos > 3 ? <button>Enviar Correo</button>
                            : <button disabled>Enviar Correo</button>}
                        </td>
                    </tr>)
                })}
                </tbody>
                
            </table>
        </>
        
    )
};

export default ConsultarTarjeta;