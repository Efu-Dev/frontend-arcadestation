import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ConsultarClientes = () => {

    const [datos, setDatos] = useState({});
    const [cedula, setCedula] = useState('');
    const [datosActuales, setDatosActuales] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.create({
            baseURL: 'http://127.0.0.1:8000/api/clientes/',
            'headers': {
              'Authorization': localStorage.getItem('access_token')
            }
          }).get().then((res) => {
            setDatos(res.data.datos);
            setDatosActuales(res.data.datos);
            setLoading(false);
          }).catch((e) => console.log(e));
    }, []);

    const mostrarCliente = (e) => {
        e.preventDefault();
        const datosCliente = datos.filter((i) => {
            return i.cedula_id == cedula;
        });
        if(datosCliente.length > 0)
            setDatosActuales(datosCliente);
        else
            alert("No hay un cliente con esa cédula registrado.");
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
            <h1>Consultar Clientes</h1>
            <form onSubmit={(e) => mostrarCliente(e)}>
                <label htmlFor="cedula">Cédula:</label>
                <input type="text" pattern='[0-9]+' onChange={(e) => onChangeCedula(e.target.value)} required />
                <button type="submit">Buscar</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Género</th>
                        <th>Dirección</th>
                        <th>Fecha de Registro</th>
                        <th># Tarjeta</th>
                    </tr>
                </thead>
                
                <tbody>
                {datosActuales.map((cliente) => {
                    return(<tr key={cliente.id}>
                        <td style={{border: 'solid 1px black'}}>{cliente.persona.nombre}</td>
                        <td style={{border: 'solid 1px black'}}>{cliente.cedula_id}</td>
                        <td style={{border: 'solid 1px black'}}>{cliente.persona.genero === 'H' ? "Hombre" : "Mujer"}</td>
                        <td style={{border: 'solid 1px black'}}>{cliente.persona.direccion}</td>
                        <td style={{border: 'solid 1px black'}}>{`${new Date(cliente.fecha_registro).getDay()}/${new Date(cliente.fecha_registro).getMonth()}/${new Date(cliente.fecha_registro).getFullYear()} 
                        ${new Date(cliente.fecha_registro).getHours()}:${new Date(cliente.fecha_registro).getMinutes()}`}</td>
                        <td style={{border: 'solid 1px black'}}>{cliente.tarjeta}</td>
                    </tr>)
                })}
                </tbody>
                
            </table>
        </>
        
    )
};

export default ConsultarClientes;