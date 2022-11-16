import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../css/form_empleado.css';
import img4 from '../Img/logo_ek1.png';

import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';

const FormularioEmpleados = () => {

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direccion, setDireccion] = useState("");
    const [genero, setGenero] = useState('');
    const [cargo, setCargo] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();

        setNombre((n) => n.trimEnd());
        setDireccion((dir) => dir.trimEnd())
        setEmail((e) => e.trimEnd());
        setTelefono((e) => e.trimEnd());

        if(nombre.split(" ").length !== 2){
            alert("El nombre debe seguir el siguiente formato: Nombre Apellido");
            return;
        }

        let res = undefined;
        await axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/empleados/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).post('',
        {
            cedula,
            nombre,
            direccion,
            genero,
            cargo,
            telefono,
            email
        }).then((r) => {
            res = r;
            if(r.data.message === 'Success')
                alert("Empleado creado exitosamente");
            else
                alert(r.data.message);
        }).catch((e) => {
            alert("Ocurrió un error.");
        });

        if(res.data.message === "Success"){
            navigate('/home');
        }

        console.log(res);
    };

    const onChangeCedula = async (e) => {
        setCedula(e.target.value.replace(/^\s+/, ""));
        setSendable(true);
        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/personas/${e.target.value.replace(/^\s+/, "")}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        });

        if(res.nombre === undefined && e.target.value.replace(/^\s+/, "") !== ''){
            setNombre('');
            setDireccion('');
            setGenero('');
            setEmail('');
            setTelefono('');
            setCargo('');
            setEditable(false);
        }
        else{
            if(e.target.value.replace(/^\s+/, "") !== ''){
                setNombre(res.nombre);
                setDireccion(res.direccion);
                setGenero(res.genero);
                await axios.create({
                    baseURL: `https://arcadestation.pythonanywhere.com/api/empleados/${e.target.value.replace(/^\s+/, "")}`,
                    'headers': {
                      'Authorization': localStorage.getItem('access_token_as')
                    }
                  }
                ).get('',
                {}).then((r) => {
                    res = r.data.datos;
                });
                console.log(res);
                if(Object.keys(res).length !== 0){
                    setSendable(false);
                    alert("El empleado ya está registrado en el sistema");
                    setEmail(res.email);
                    setTelefono(res.telefono);
                    setCargo(res.cargo);
                }
            }
            setEditable(true); 
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
                <div class="div-gerente" id="ingrese_cedula__ek1">
                    Ingrese Cédula:
                    <input placeholder='Ej: 29714067' type="text" class="cedula" maxLength={9} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" required />
                </div>

                {
                    editable ? (
                        <>
                        <h1>Agregar Empleado</h1>
                        <div class="div-gerente" id="nombre_ek1">
                            Nombre y Apellido:
                            <input placeholder='Ej: Andrés González' type="text" class="nombre" maxLength={50} pattern="[a-zA-ZáéíóúÁÉÍÓÚ]+\s[a-zA-ZáéíóúÁÉÍÓÚ]+" value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />
                        </div>

                        <div class="div-gerente" id="direccion_ek1">
                            Dirección:
                            <textarea placeholder='Dirección del Empleado' type="text" class="direccion"  required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} disabled />
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
                        
                        {sendable ? (
                            <>
                            
                            <div class="div-gerente" id="email">
                                Email:
                                <input placeholder='Ej: noreply@arcadestation.com' type="email" class="Email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value.replace(/^\s+/, ""))} required />
                            </div>

                            <div class="div-gerente" id="tele">
                                Teléfono:
                                <input pattern='\d+' class="telefono" type="text" maxLength={15} value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/^\s+/, ""))} required />
                            </div>

                            <div class="div-gerente" id="Cargo">
                                Cargo:
                                <select class="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                                    <option value={'Cajero'}>Cajero</option>
                                    <option value={'Gerente'}>Gerente</option>
                                </select>
                            </div>
                            </>
                        ) : (
                            <>
                            <div class="div-gerente" id="email">
                                Email:
                                <input placeholder='Ej: noreply@arcadestation.com' type="email" class="Email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value.replace(/^\s+/, ""))} required disabled />
                            </div>

                            <div class="div-gerente" id="tele">
                                Teléfono:
                                <input pattern='\d+' class="telefono" type="text" maxLength={15} value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/^\s+/, ""))} required disabled />
                            </div>

                            <div class="div-gerente" id="Cargo">
                                Cargo:
                                <select class="cargo" value={cargo} disabled>
                                    <option value={'Cajero'}>Cajero</option>
                                    <option value={'Gerente'}>Gerente</option>
                                </select>
                            </div>                            
                            </>
                        ) }
                        </>
                    ) : (
                        <>
                        <h1>Agregar Empleado</h1>
                        <div class="div-gerente" id="nombre_ek1">
                            Nombre y Apellido:
                            <input placeholder='Ej: Andrés González' type="text" class="nombre" maxLength={50} pattern="[a-zA-ZáéíóúÁÉÍÓÚ]+\s[a-zA-ZáéíóúÁÉÍÓÚ]+" value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required />
                        </div>

                        <div class="div-gerente" id="direccion_ek1">
                            Dirección:
                            <textarea placeholder='Dirección del Empleado' type="text" class="direccion"  required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} />
                        </div>

                        <div class="div-gerente cuadrado">
                            <div class="div-gerente" id="genero">
                                Género:
                            </div>
                            <form method="get" id="sexo" onChange={(e) => setGenero(e.target.value)}>
                                <input name="intereses" type="radio" value={'H'} defaultChecked={true} checked={genero === 'H' || genero !== 'M'} />H
                                <input name="intereses" type="radio" value={'M'} checked={genero === 'M'} />M
                            </form>
                        </div>

                        {sendable ? (
                            <>
                            <div class="div-gerente" id="email">
                                Email:
                                <input placeholder='Ej: noreply@arcadestation.com' type="email" class="Email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value.replace(/^\s+/, ""))} required />
                            </div>

                            <div class="div-gerente" id="tele">
                                Teléfono:
                                <input pattern='\d+' class="telefono" type="text" maxLength={15} value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/^\s+/, ""))} required />
                            </div>

                            <div class="div-gerente" id="Cargo">
                                Cargo:
                                <select class="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                                    <option value={'Cajero'}>Cajero</option>
                                    <option value={'Gerente'}>Gerente</option>
                                </select>
                            </div>
                            </>
                        ) : (
                            <>
                            <div class="div-gerente" id="email">
                                Email:
                                <input placeholder='Ej: noreply@arcadestation.com' type="email" class="Email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value.replace(/^\s+/, ""))} required disabled />
                            </div>

                            <div class="div-gerente" id="tele">
                                Teléfono:
                                <input pattern='\d+' class="telefono" type="text" maxLength={15} value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/^\s+/, ""))} required disabled />
                            </div>

                            <div class="div-gerente" id="Cargo">
                                Cargo:
                                <select class="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} disabled>
                                    <option value={'Cajero'}>Cajero</option>
                                    <option value={'Gerente'}>Gerente</option>
                                </select>
                            </div>                            
                            </>
                        ) }
                        </>
                    )
                }

                {sendable ? <button type="submit" class="crear"> Crear </button> : <button type="submit" class="crear" disabled> Crear </button>}
        </form>

        </div>
        </main>
    );
};

export default FormularioEmpleados;