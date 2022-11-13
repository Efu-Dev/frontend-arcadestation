import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/form_maquina.css';
import img4 from '../Img/logo_ek1.png';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';

const FormularioClientes = () => {

    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [precio, setPrecio] = useState("");
    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        let res = undefined;
        await axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/maquinas/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).post('',
        {
            codigo,
            nombre,
            precio
        }).then((r) => {
            res = r;
            alert("Máquina creada exitosamente");
        });

        if(res.data.message === "Success"){
            navigate('/home');
        }

        console.log(res);
    };

    const onChangeCodigo = async(e) => {
        setCodigo(e.target.value.replace(/^\s+/, ""));
        setSendable(true);
        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/maquinas/${e.target.value.replace(/^\s+/, "")}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        });

        if((res === undefined || res.codigo === undefined) && e.target.value.replace(/^\s+/, "") !== ''){ // Máquina no existe
            setEditable(false);
            setNombre('');
            setPrecio('');        
        }
        else if(e.target.value.replace(/^\s+/, "") === ''){
            setEditable(true);
            setNombre('');
            setPrecio('');
        }
        else{
            alert('La máquina ya está registrada');
            setNombre(res.nombre);
            setPrecio(res.precio);
            setEditable(true);
            setSendable(false);
        }
    }

    return(
        <main class="main-container">
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
          
    
            <div class="div-gerente barra_de_navegacion">
                <div class="div-gerente reportes">
                    <button type="button" class="btn btn-white dropdownd-toggle" id="reportes" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true">
                        <u>Reportes</u>
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
    
           

                <form class="div-gerente rectangulo" onSubmit={(e) => checkCreacion(e)}>

                    <div className='div-gerente' id="Codigo">
                        Código:
                        <input type="text" class="codigo" maxLength={8} value={codigo} onChange={(e) => onChangeCodigo(e)} pattern="[0-9]+" required />
                    </div>

                    {
                        editable ? (
                            <>
                                <div className='div-gerente' id="nombre_maq">
                                    Nombre:
                                    <input type="text" class="nombre"  maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />
                                </div>

                                <div className='div-gerente' id="Precio">
                                    Precio:
                                    <input class="precio" type="number" min={0.01} max={99.99} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value.replace(/^\s+/, ""))} required disabled />
                                </div>
                            </>
                        ) : (
                            <>
                            <div className='div-gerente' id="nombre_maq">
                                Nombre:
                                <input type="text" class="nombre"  maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required />
                            </div>

                            <div className='div-gerente' id="Precio">
                                Precio:
                                <input class="precio" type="number" min={0.01} max={99.99} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value.replace(/^\s+/, ""))} required />
                            </div>
                            </>
                        )
                    }

                    {sendable ? (
                        <div class="div-gerente Crear2">
                            <button class="Crearb"> Crear </button>
                        </div>
                    ) : (
                        <div class="div-gerente Crear2">
                            <button class="Crearb" disabled> Crear </button>
                        </div>
                    )}
                </form>
            </div>
        </main>

    );
};

export default FormularioClientes;