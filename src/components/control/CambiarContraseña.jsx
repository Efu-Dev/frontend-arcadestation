import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import img4 from '../Img/logo_ek1.png';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';


const CambiarContraseña = () => {

    const [contrasena, setContrasena] = useState('');
    const [contrasenaRepetir, setContrasenaRepetir] = useState('');
    const navigate = useNavigate();

    const cambiarContraseña = (e) => {
        e.preventDefault();
        setContrasena((contrasena) => contrasena.replace(/^\s+/, ""));
        setContrasenaRepetir((contrasenaRepetir) => contrasenaRepetir.replace(/^\s+/, ""));
        if(contrasena === contrasenaRepetir){
            axios.create({
                baseURL: 'https://arcadestation.pythonanywhere.com/usuarios/cambiar/',
                'headers': {
                  'Authorization': localStorage.getItem('access_token_as')
                }
              }).post('', {contrasena}).then((res) => {
                if(res.data.message === 'Success'){
                    alert("Contraseña cambiada exitosamente");
                    navigate('/home');
                }
              }).catch((e) => console.log(e));
        } else{
            alert("Las contraseñas no coinciden");
            setContrasena('');
            setContrasenaRepetir('');
        }
    }

    return (
        <main class="main-container">
        <input class="" type="checkbox" name="" id="check" />
            <div class="div-gerente menu">
                <label for="check">
                    <span class="fas fa-times" id="times"></span>
                    <span class="far fa-circle-user" id="bars"></span>
                </label>
                <div class="div-gerente head">menú</div><br /> <br /> <br /> <br />
    
                <li><a href="#"><i class="fas fa-users"></i> Manual de Usuario</a></li>
                <li><Link to='/' onClick={crearBackup}><i class="fas fa-cloud"></i> Crear Respaldo de Base de Datos</Link></li>
                <li><Link to="/" onClick={restaurarBackup}><i class="fas fa-cloud"></i> Restaurar Base de Datos</Link></li>
                <li><Link to="/control/cambiar_contrasena"><i class="fas fa-gear"></i> Cambiar Contraseña</Link></li>
                <li><Link to="/control/probar_maquina"><i class="fas fa-gamepad"></i> Probar máquina</Link></li>
            </div>
          
    
            <div class="div-gerente barra_de_navegacion">
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

                <form class="div-gerente rectangulo" onSubmit={(e) => cambiarContraseña(e)}>
                    <h1>Cambiar contraseña</h1>
                    <div className='div-gerente' id="nombre_maq">
                        Contraseña:
                        <input type="password" placeholder='Al menos 5 y máximo 20.' value={contrasena} maxLength={20} minLength={5} required onChange={(e) => setContrasena(e.target.value.replace(/^\s+/, ""))} />
                    </div>

                    <div className='div-gerente' id="Precio">
                        Repetir Contraseña:
                        <input type="password" placeholder='Al menos 5 y máximo 20.' value={contrasenaRepetir} maxLength={20} minLength={5} required onChange={(e) => setContrasenaRepetir(e.target.value.replace(/^\s+/, ""))} />
                    </div>

                    <div class="div-gerente cambiar-contrasena-submit">
                            <button class="Crearb"> Crear </button>
                    </div>
                </form>
            </div>
        </main>
    );

    return (
        <div>
            <h1>Cambiar Contraseña</h1>
            <form onSubmit={(e) => cambiarContraseña(e)}>
                <label>Nueva Contraseña:</label>
                <input type="password" required onChange={(e) => setContrasena(e.target.value.replace(/^\s+/, ""))} />

                <label>Repetir Nueva Contraseña:</label>
                <input type="password" required onChange={(e) => setContrasenaRepetir(e.target.value.replace(/^\s+/, ""))} />

                <button type="submit">Cambiar</button>
            </form>
        </div>
    )
}

export default CambiarContraseña