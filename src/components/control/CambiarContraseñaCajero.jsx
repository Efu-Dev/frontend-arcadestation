import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import img4 from '../Img/logo_ek1.png';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';


const CambiarContraseñaCajero = () => {

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
            <span class="span-gerente fas fa-times" id="times"></span>
            <span class="span-gerente far fa-circle-user" id="bars"></span>
          </label>
          <div class="div-gerente head">menú</div> <br /> <br /> <br /> <br />
          <li><a href="#"><i class="fas fa-users"></i> Manual de Ayuda de Usuario</a></li>
          <li><Link to="/cajero/contrasena"><i class="fas fa-gear"></i> Cambiar Contraseña</Link></li>
          <li><Link to="/cajero/maquina"><i class="fas fa-info"></i> Probar Máquina</Link></li>
        </div>

        <div class="div-gerente barra_de_navegacion">
          <div class="div-gerente Crear">
            <button type="button" class="btn btn-white dropdown-toggle" id="Crear" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="true">
              Crear
            </button>
            <div class="div-gerente dropdown-menu">
              <li><Link to="/cajero/clientes" class="dropdown-item">Crear Cliente</Link></li>
              <li><Link to="/cajero/transaccion" class="dropdown-item">Crear Recarga</Link></li>
            </div>
          </div>

          <div class="div-gerente Consultar">
            <button type="button" class="btn btn-white dropdown-toggle" id="Consultar" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="true">
              Consultar
            </button>
            <div class="div-gerente dropdown-menu">

              <li><Link to="/cajero/tarjeta" class="dropdown-item">Consultar tarjeta</Link></li>
            </div>
          </div>

                <img src={img4} class="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}} />   

                <form class="div-gerente rectangulo" onSubmit={(e) => cambiarContraseña(e)}>
                    <h1>Cambiar contraseña</h1>
                    <div className='div-gerente' id="nombre_maq">
                        Contraseña:
                        <input type="password" placeholder='Al menos 5 y máximo 20.' maxLength={20} minLength={5} required onChange={(e) => setContrasena(e.target.value.replace(/^\s+/, ""))} />
                    </div>

                    <div className='div-gerente' id="Precio">
                        Repetir Contraseña:
                        <input type="password" placeholder='Al menos 5 y máximo 20.' maxLength={20} minLength={5} required onChange={(e) => setContrasenaRepetir(e.target.value.replace(/^\s+/, ""))} />
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

export default CambiarContraseñaCajero;