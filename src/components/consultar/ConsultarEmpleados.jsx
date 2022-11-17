import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/consultar_cliente.css';
import img4 from '../Img/logo_ek1.png';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';

const ConsultarClientes = () => {

    const [datos, setDatos] = useState({});
    const [cedula, setCedula] = useState('');
    const [datosActuales, setDatosActuales] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/empleados/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            console.log(res);
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
        <main class="main-container" id='container-consulta'>
            <input class="" type="checkbox" name="" id="check" />
                <div class="div-gerente menu">
                    <label for="check">
                        <span class="fas fa-times" id="times"></span>
                        <span class="far fa-circle-user" id="bars"></span>
                    </label>
                    <div class="div-gerente head">menú</div><br /> <br /> <br /> <br />
        
                    <li><a href="#"><i class="fas fa-users"></i> Manual de usuario</a></li>
                    <li><a href="#" onClick={crearBackup}><i class="fas fa-cloud"></i> Crear Respaldo de base de datos</a></li>
                    <li><a href="#" onClick={restaurarBackup}><i class="fas fa-cloud"></i> Restaurar base de datos</a></li>
                    <li><Link to="/control/cambiar_contrasena"><i class="fas fa-gear"></i> Cambiar Contraseña</Link></li>
                    <li><Link to="/control/probar_maquina"><i class="fas fa-gamepad"></i> Probar máquina</Link></li>
                </div>
        
                <div class="div-gerente barra_de_navegacion mb-5">
                    <div class="div-gerente reportes">
                        <button type="button" class="btn btn-white dropdownd-toggle" id="reportes" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="true">
                            Reportes
                        </button>
                        <div class="div-gerente dropdown-menu">
                        <li><a href="#reporte_empleado" onClick={reporteEmpleados} class="dropdown-item">Reporte de Empleados</a></li>
                        <li><a href="#reporte_cliente" onClick={reporteClientes} class="dropdown-item">Reporte de Clientes</a></li>
                        <li><a href="#reporte_maquina" onClick={reporteMaquinas} class="dropdown-item">Reporte de Máquinas</a></li>
                        </div>
                    </div>
        
                    <div class="div-gerente agregar">
        
                        <button type="button" class="btn btn-white dropdownd-toggle" id="agregar" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="true">
                            Agregar
                        </button>
                        <div class="div-gerente dropdown-menu">
                            <li><Link to="/crear/clientes" class="dropdown-item">Agregar Cliente</Link></li>
                            <li><Link to="/crear/empleados" class="dropdown-item">Agregar Empleado</Link></li>
                            <li><Link to="/crear/maquinas" class="dropdown-item">Agregar Máquina</Link></li>
                            <li><Link to="/crear/transaccion" class="dropdown-item">Agregar Recarga</Link></li>    
                        </div>
                    </div>
                    <div class="div-gerente consultar">
                        <button type="button" class="btn btn-white dropdownd-toggle" id="consultar" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="true">
                            Consultar
                        </button>
                        <div class="div-gerente dropdown-menu">
                            <li><Link to="/consultar/clientes" class="dropdown-item">Consultar Cliente</Link></li>
                            <li><Link to="/consultar/empleados" class="dropdown-item">Consultar Empleado</Link></li>
                            <li><Link to="/consultar/tarjeta" class="dropdown-item">Consultar Tarjeta</Link></li>
                            <li><Link to="/consultar/maquinas" class="dropdown-item">Consultar Máquina</Link></li>
                        </div>
                    </div>
                    <div class="div-gerente modificar">
                        <button type="button" class="btn btn-white dropdownd-toggle" id="modificar" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="true">
                            Modificar
                        </button>
                        <div class="div-gerente dropdown-menu">
                        <li><Link to="/modificar/clientes" class="dropdown-item">Modificar Cliente</Link></li>
                        <li><Link to="/modificar/empleados" class="dropdown-item">Modificar Empleado</Link></li>
                        <li><Link to="/modificar/maquinas" class="dropdown-item">Modificar Máquina</Link></li>    
                        </div>
                    </div>

                    <img src={img4} class="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}} />

                </div>

            <div class="div-gerente container-fluid" style={{'marginTop': '150px'}}>
                <header class="consulta">
                    <h2>Consultar Empleados</h2>
                </header>

                <form onSubmit={(e) => mostrarEmpleado(e)}>
                    <input onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => e.target.setCustomValidity('Para hacer la búsqueda, este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} type="text" placeholder="Ingrese Cédula." class="search" pattern='[0-9]+' onChange={(e) => onChangeCedula(e.target.value.replace(/\s+/, ""))} value={cedula} maxLength={9} required />
                    <button class="boton" type='submit'>Buscar</button>
                </form>

            <div class="div-gerente row" id='contenedor-tabla'>
                <div class="div-gerente cuadrado-consulta">
                    <table class="tabla">
                        <thead class="encabezado">
                            <tr>
                                <th>Nombre</th>
                                <th>Cédula</th>
                                <th>Género</th>
                                <th>Dirección</th>
                                <th>Cargo</th>
                                <th>F. Entrada</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Activo</th>
                                <th>Usuario</th>
                            </tr>
                        </thead>

                        <tbody>
                        {datosActuales.map((empleado) => {
                            return(<tr key={empleado.id}>
                                    <td>{empleado.persona.nombre}</td>
                                    <td>{empleado.cedula_id}</td>
                                    <td>{empleado.persona.genero === 'H' ? "Hombre" : "Mujer"}</td>
                                    <td>{empleado.persona.direccion}</td>
                                    <td>{empleado.cargo}</td>
                                    <td>{`${new Date(empleado.fecha_entrada).getDate()}/${new Date(empleado.fecha_entrada).getMonth()+1}/${new Date(empleado.fecha_entrada).getFullYear()}`}</td>
                                    <td style={{'overflowWrap': 'break-word'}}>{empleado.email}</td>
                                    <td>{empleado.telefono}</td>
                                    <td>{empleado.activo === 'S' ? "Sí" : "No"}</td>
                                    <td>{empleado.usuario}</td>                        
                                </tr>)
                            })}                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    </main>
    );

    return (
        <>
            <h1>Consultar Empleados</h1>
            <form onSubmit={(e) => mostrarEmpleado(e)}>
                <label htmlFor="cedula">Cédula:</label>
                <input type="text" pattern='[0-9]+' onChange={(e) => onChangeCedula(e.target.value.replace(/^\s+/, "").replace(/^\s+/, ""))} required />
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
                        <th>Activo</th>  
                        <th>Usuario</th>                                      
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
                        <td style={{border: 'solid 1px black'}}>{empleado.activo === 'S' ? "Sí" : "No"}</td>
                        <td style={{border: 'solid 1px black'}}>{empleado.usuario}</td>                        
                    </tr>)
                })}
                </tbody>
                
            </table>
        </>
        
    )
};

export default ConsultarClientes;