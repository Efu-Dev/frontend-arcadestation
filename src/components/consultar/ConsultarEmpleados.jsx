import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ConsultarClientes = () => {

    const [datos, setDatos] = useState({});
    const [cedula, setCedula] = useState('');
    const [datosActuales, setDatosActuales] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/empleados/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            setDatos(res.data.datos);
            setDatosActuales(res.data.datos);
            setLoading(false);
          }).catch((e) => console.log(e));
    }, []);

    const mostrarEmpleado = (e) => {
        e.preventDefault();
        const datosEmpleado = datos.filter((i) => {
            console.log(`${Number(i.cedula_id)} ${Number(cedula)} ${Number(i.cedula_id) === Number(cedula)}`)
            return Number(i.cedula_id) === Number(cedula);
        });
        console.log(datosEmpleado)
        if(datosEmpleado.length > 0)
            setDatosActuales(datosEmpleado);
        else
            alert("No hay un empleado con esa cédula registrado.");
        console.log(datosActuales)
    };

    const onChangeCedula = (nuevo) => {
        setCedula(nuevo);
        setDatosActuales(datos);
    }

    if(loading)
        return <h1>Cargando...</h1>    

    return (
        <>
            <h1>Consultar Empleados</h1>
            <form onSubmit={(e) => mostrarEmpleado(e)}>
                <label htmlFor="cedula">Cédula:</label>
                <input type="text" pattern='[0-9]+' onChange={(e) => onChangeCedula(e.target.value.trim())} required />
                <button type="submit">Buscar</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Género</th>
                        <th>Dirección</th>
                        <th>Cargo</th>
                        <th>Fecha Entrada</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Usuario</th>
                        <th>Activo</th>
                        <th>Recuperación</th>                     
                    </tr>
                </thead>
                
                <tbody>
                {datosActuales.map((empleado) => {
                    return(<tr key={empleado.id}>
                        <td style={{border: 'solid 1px black'}}>{empleado.persona.nombre}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.cedula_id}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.persona.genero === 'H' ? "Hombre" : "Mujer"}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.persona.direccion}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.cargo}</td>
                        <td style={{border: 'solid 1px black'}}>{`${new Date(empleado.fecha_entrada).getDate()}/${new Date(empleado.fecha_entrada).getMonth()+1}/${new Date(empleado.fecha_entrada).getFullYear()} 
                        ${new Date(empleado.fecha_entrada).getHours()}:${new Date(empleado.fecha_entrada).getMinutes()}`}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.email}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.telefono}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.usuario.username}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.activo === 'S' ? "Sí" : "No"}</td>
                        <td style={{border: 'solid 1px black'}}>
                            {empleado.usuario.intentos > 3 ? <button>Enviar Correo</button>
                            : <button disabled>Enviar Correo</button>}
                        </td>
                    </tr>)
                })}
                </tbody>
                
            </table>
        </>
        
    )
};

export default ConsultarClientes;