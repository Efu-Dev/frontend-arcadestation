import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const ConsultarClientes = () => {

    const [datos, setDatos] = useState({});
    const [codigo, setCodigo] = useState('');
    const [datosActuales, setDatosActuales] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios.create({
            baseURL: 'http://127.0.0.1:8000/api/maquinas/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            setDatos(res.data.datos);
            setDatosActuales(res.data.datos);
            setLoading(false);
          }).catch((e) => console.log(e));
    }, []);

    const mostrarMaquina = (e) => {
        e.preventDefault();
        const datosEmpleado = datos.filter((i) => {
            return Number(i.codigo) === Number(codigo);
        });
        console.log(datosEmpleado)
        if(datosEmpleado.length > 0)
            setDatosActuales(datosEmpleado);
        else
            alert("No hay una máquina registrada con ese código.");
    };

    const onChangeCodigo = (nuevo) => {
        setCodigo(nuevo);
        setDatosActuales(datos);
    }

    const verActividad = (maquinaCodigo) => {
        navigate(`/consultar/maquinas/${maquinaCodigo}`);
    };

    if(loading)
        return <h1>Cargando...</h1>    

    return (
        <>
            <h1>Consultar Máquinas</h1>
            <form onSubmit={(e) => mostrarMaquina(e)}>
                <label htmlFor="codigo">Código:</label>
                <input type="text" pattern='[0-9]+' onChange={(e) => onChangeCodigo(e.target.value.replace(/^\s+/, "").replace(/^\s+/, ""))} required />
                <button type="submit">Buscar</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Código</th>
                        <th>Precio</th>
                        <th>Activa</th>
                        <td>Ver Actividad</td>               
                    </tr>
                </thead>
                
                <tbody>
                {datosActuales.map((maquina) => {
                    return(<tr key={maquina.id}>
                        <td style={{border: 'solid 1px black'}}>{maquina.nombre}</td>
                        <td style={{border: 'solid 1px black'}}>{maquina.codigo}</td>
                        <td style={{border: 'solid 1px black'}}>{maquina.precio}</td>
                        <td style={{border: 'solid 1px black'}}>{maquina.activa === 'S' ? "Sí" : "No"}</td>
                        <td>
                            <button onClick={() => verActividad(maquina.codigo)}>Ver Registro</button>
                        </td>
                    </tr>)
                })}
                </tbody>
                
            </table>
        </>
        
    )
};

export default ConsultarClientes;