import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import img4 from '../Img/logo_ek1.png';
import img1 from '../Img/image_1.png';
import img2 from '../Img/image_3.png';

import '../css/form_mod_clientes.css'

import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';

const FormularioModClientes = () => {

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direccion, setDireccion] = useState("");
    const [genero, setGenero] = useState('');
    const [tarjetaAnulada, setTarjetaAnulada] = useState(false);
    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        setNombre((n) => n.trimEnd());
        setDireccion((dir) => dir.trimEnd())

        if(nombre.split(" ").length !== 2){
            alert("El nombre debe seguir el siguiente formato: Nombre Apellido");
            return;
        }

        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/clientes/${cedula}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('').then((r) => {
            res = r;            
        });
        console.log(res);

        if(res.data.datos.cedula)
            await axios.create({
                baseURL: `https://arcadestation.pythonanywhere.com/api/personas/${cedula}`,
                'headers': {
                'Authorization': localStorage.getItem('access_token_as')
                }
            }
            ).put('',
            {
                cedula,
                nombre,
                direccion,
                genero,
                tarjetaAnulada: tarjetaAnulada ? "S" : "N"
            }).then((r) => {
                res = r;
                console.log(tarjetaAnulada);          
            });

        if(res.data.message === "Success"){
            alert("Cliente modificado exitosamente");
            navigate('/home');
        } else{
            alert("Datos inválidos. Verifique que todos los campos estén llenos.");
        }

        console.log(res);
    };

    const onChangeCedula = async (e) => {
        setCedula(e.target.value.replace(/^\s+/, "").replace(/^0+/, ""));
        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/clientes/${e.target.value.replace(/^\s+/, "")}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        });

        console.log(res);
        setTarjetaAnulada(res.tarjeta_activa === 'S')

        if(res.cedula === undefined && e.target.value.replace(/^\s+/, "").replace(/^0+/, "") !== ''){
            setNombre('');
            setDireccion('');
            setGenero('');
            setEditable(true);
        }
        else{
            await axios.create({
                baseURL: `https://arcadestation.pythonanywhere.com/api/personas/${e.target.value.replace(/^\s+/, "").replace(/^0+/, "")}`,
                'headers': {
                  'Authorization': localStorage.getItem('access_token_as')
                }
              }
            ).get('',
            {}).then((r) => {
                res = r.data.datos;
            });
            console.log(res)    
            setNombre(res.nombre);
            setDireccion(res.direccion);
            setGenero(res.genero);
            setEditable(false); 
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

                    <div class="div-gerente" id="ingrese_cedula__ek1_mcliente">
                        Ingrese Cédula:
                        <input class="cedula" name="cedula" type="text" maxLength={9} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" required />
                    </div>

                    {editable ? (
                        <>

                        <h1>Modificar Cliente</h1>
                            <div class="div-gerente" id="nombre_ek1_mcliente">
                            Nombre y Apellido:

                            <input class="nombre" name="nombre" type="text" maxLength={50} pattern="[a-zA-ZáéíóúÁÉÍÓÚ]+\s[a-zA-ZáéíóúÁÉÍÓÚ]+" value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />
                            </div>

                            <div class="div-gerente" id="direccion_ek1mcliente">
                                Dirección:
                                <textarea class="direccion" name="direccion" type="text" required disabled maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))}  />
                            </div>

                            <div class="div-gerente cuadrado">
                                    <div class="div-gerente" id="genero">
                                        Género:
                                    </div>
                                    <form method="get" id="sexo" onChange={(e) => setGenero(e.target.value)} disabled>
                                        <input name="intereses" type="radio" value={'H'} defaultChecked={true} checked={genero === 'H' || genero !== 'M'} />H
                                        <input name="intereses" type="radio" value={'M'} checked={genero === 'M'} />M
                                    </form>
                            </div>
                            <div class="div-gerente cuadrado2">
                                <div id="Anulada">
                                    Tarjeta Anulada:
                                </div>
                                <input type="checkbox"  name="tarjeta_anulada" id="tarjeta_anulada" disabled />
                            </div>                    
                        </>
                    ) : (
                        <>
                           <h1>Modificar Cliente</h1>
                            <div class="div-gerente" id="nombre_ek1_mcliente">
                            Nombre y Apellido:

                            <input class="nombre" name="nombre" type="text" maxLength={50} pattern="[a-zA-ZáéíóúÁÉÍÓÚ]+\s[a-zA-ZáéíóúÁÉÍÓÚ]+" value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required />
                            </div>

                            <div class="div-gerente" id="direccion_ek1mcliente">
                                Dirección:
                                <textarea class="direccion" name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))}  />
                            </div>

                            <div class="div-gerente cuadrado">
                                    <div class="div-gerente" id="genero">
                                        Género:
                                    </div>
                                    <form method="get" id="sexo" onChange={(e) => setGenero(e.target.value)} disabled>
                                        <input name="intereses" type="radio" value={'H'} defaultChecked={true} checked={genero === 'H' || genero !== 'M'} />H
                                        <input name="intereses" type="radio" value={'M'} checked={genero === 'M'} />M
                                    </form>
                            </div>
                            <div class="div-gerente cuadrado2">
                                <div id="Anulada">
                                    Tarjeta Anulada:
                                </div>
                                    <input type="checkbox"  name="tarjeta_anulada" id="tarjeta_anulada" onChange={(e) => {setTarjetaAnulada(e.target.checked)}} checked={tarjetaAnulada} />
                            </div>                       
                        </>
                    )}

                    {sendable ? (
                        <div class="Crear2">
                            <button class="Crearb" type='submit'> Modificar </button>
                        </div>
                    ) : (
                        <div class="Crear2">
                            <button class="Crearb" type='submit' disabled> Modificar </button>
                        </div>
                    )}

                
                </form>
            </div>
        </main>
    );

    return (
        <div>
            <h1>Crear Cliente</h1>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre y Apellido:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} disabled />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value.replace(/^\s+/, ""))} pattern="[h|m|H|M]" required disabled />
                
                <label htmlFor="tarjeta_anulada">Tarjeta Anulada:</label>
                <input type="checkbox" name="tarjeta_anulada" id="tarjeta_anulada" disabled />
                </>) :
                (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre y Apellido:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value.replace(/^\s+/, ""))} pattern="[h|m|H|M]" required />
                
                <label htmlFor="tarjeta_anulada">Tarjeta Anulada:</label>
                <input type="checkbox" name="tarjeta_anulada" id="tarjeta_anulada" onChange={(e) => {setTarjetaAnulada(e.target.checked)}} checked={tarjetaAnulada} />
                </>)
                }
                {sendable ? (<button type='submit'>Enviar Formulario</button>) : <button type='submit' disabled>Enviar Formulario</button>}
            </form>
        </div>
    );
};

export default FormularioModClientes;