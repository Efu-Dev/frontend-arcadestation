import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import download from 'downloadjs';
import manual from '../pdf/Manual_Usuario_ArcadeStation.pdf';

import './css/home.css';

import img1 from './Img/dde6daf4675eec6dc7e0c73a83e37bd2_1.png';
import img2 from './Img/_8a36117830713c529bb94c295c5255b5_1.png';
import img3 from './Img/mask_group_ek1.png';
import img4 from './Img/logo_ek1.png';
import img5 from './Img/mask_group_ek2.png';

import img6 from './Img/dde6daf4675eec6dc7e0c73a83e37bd2_1_ek2.png';
import img7 from './Img/_238738_1.png';

export const reporteEmpleados = () => {
  axios.create({
    baseURL: 'https://arcadestation.pythonanywhere.com/reportes/generar/empleados',
    'headers': {
      'Authorization': localStorage.getItem('access_token_as')
    }
  }).get().then((res) => {
    const content = res.headers['content-type'];
    download(res.data, 'REPORTE_EMPLEADOS_ARCADESTATION.pdf', content)
  }).catch((e) => console.log(e));
};

export const reporteMaquinas = () => {
  axios.create({
    baseURL: 'https://arcadestation.pythonanywhere.com/reportes/generar/máquinas',
    'headers': {
      'Authorization': localStorage.getItem('access_token_as')
    }
  }).get().then((res) => {
    const content = res.headers['content-type'];
    download(res.data, 'REPORTE_MAQUINAS_ARCADESTATION.pdf', content)
  }).catch((e) => console.log(e));
};

export const crearBackup = () => {
  axios.create({
    baseURL: 'https://arcadestation.pythonanywhere.com/backupdb/',
    'headers': {
      'Authorization': localStorage.getItem('access_token_as')
    }
  }).get().then((res) => {
    if (res.data.message === 'Success')
      alert('El respaldo ha sido generado y enviado a la nube MEGA de la empresa.');
    else
      alert('No se pudo crear el respaldo.');
  }).catch((e) => console.log(e));
};

export const reporteClientes = () => {
  axios.create({
    baseURL: 'https://arcadestation.pythonanywhere.com/reportes/generar/clientes',
    'headers': {
      'Authorization': localStorage.getItem('access_token_as')
    }
  }).get().then((res) => {
    const content = res.headers['content-type'];
    download(res.data, 'REPORTE_CLIENTES_ARCADESTATION.pdf', content)
  }).catch((e) => console.log(e));
};

export const restaurarBackup = () => {
  axios.create({
    baseURL: 'https://arcadestation.pythonanywhere.com/backupdb/',
    'headers': {
      'Authorization': localStorage.getItem('access_token_as')
    }
  }).post().then((res) => {
    if (res.data.message === 'Success')
      alert('El último respaldo guardado en la nube de la empresa ha sido restaurado exitosamente.');
    else
      alert('El último respaldo guardado en la nube de la empresa NO pudo ser restaurado.');
  }).catch((e) => console.log(e));
};

const Home = () => {

  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.create({
      baseURL: 'https://arcadestation.pythonanywhere.com/usuarios/get/',
      'headers': {
        'Authorization': localStorage.getItem('access_token_as')
      }
    }).get().then((res) => {
      setDatos(res.data);
      setLoading(false);
    }).catch((e) => console.log(e));
  }, []);

  const logOut = () => {
    localStorage.removeItem('access_token_as');
    localStorage.removeItem('refresh_token_as');
    navigate('/');
  };

  if (!localStorage.getItem('access_token_as'))
    navigate('/');

  if (loading)
    return (<h3>Cargando...</h3>)

  if (datos.empleado.activo === 'N'){
    localStorage.removeItem('access_token_as')
    localStorage.removeItem('refresh_token_as')
    alert("Su cuenta se encuentra anulada.");
    navigate('/');
  }

  if (datos.empleado.cargo === 'Gerente')
    return (
      <main className="main-container">

      <input className='input-gerente' type="checkbox" name="" id="check" />
      <div class="div-gerente menu">
        <label for="check">
          <span class="span-gerente fas fa-times" id="times"></span>
          <span class="span-gerente far fa-circle-user" id="bars"></span>
        </label>
        <div class="div-gerente head" style={{marginBottom: '50px'}}>menú</div> <br /><br /><br /><br />
        
          <li><a href={manual} target='_blank' rel='noreferrer'><i class="fas fa-users"></i> Manual de Usuario</a></li>
          <li><Link to='/' onClick={crearBackup}><i class="fas fa-cloud"></i> Crear Respaldo de Base de Datos</Link></li>
          <li><Link to='/' onClick={restaurarBackup}><i class="fas fa-cloud"></i> Restaurar Base de Datos</Link></li>
          <li><Link to="/control/cambiar_contrasena"><i class="fas fa-gear"></i> Cambiar Contraseña</Link></li>
          <li><Link to="/control/probar_maquina"><i class="fas fa-gamepad"></i> Probar máquina</Link></li>

        </div>
        <img src={img1} class="img-1" />
        <img src={img2} class="img-2" />
        <img src={img3} class="img-3" />

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

        </div>

        <div class="div-gerente outer button">

          <button onClick={logOut}> Salir </button>
          <span className='span-gerente'></span>
          <span className='span-gerente'></span>
        </div>

        <div className='div-gerente' id="nombre_del_gerente">
          {datos.persona.nombre}
        </div>
        <div className='div-gerente' id="__0000">
          #{datos.persona.cedula}
        </div>
        <div className='div-gerente' id="bienvenido">
          ¡BIENVENIDO ESTIMADO GERENTE!
        </div>
        <div className='div-gerente' id="saludo">
          Aquí encontrarás las funciones administrativas de ARCADESTATION. Echa un
          vistazo y descubre sus funciones, o retoma las actividades que has dejado inconclusas.
        </div>

        <img src={img5} id="mask_group_ek2" />
      </main>
    )

  else
    return (
      <main class="main-container">

        <input className='input-gerente' type="checkbox" name="" id="check" />
        <div class="div-gerente menu">
          <label for="check">
            <span class="span-gerente fas fa-times" id="times"></span>
            <span class="span-gerente far fa-circle-user" id="bars"></span>
          </label>
          <div class="div-gerente head">menú</div> <br /> <br /> <br /> <br />
          <li><a href={manual} target='_blank' rel='noreferrer'><i class="fas fa-users"></i> Manual de Usuario</a></li>
          <li><Link to="/cajero/contrasena"><i class="fas fa-gear"></i> Cambiar Contraseña</Link></li>
          <li><Link to="/cajero/maquina"><i class="fas fa-info"></i> Probar Máquina</Link></li>
        </div>

        <img src={img6} class="img-1" />
        <img src={img7} class="img-2" />
        <img src={img3} class="img-3" />

        <div class="div-gerente barra_de_navegacion">
          <div class="div-gerente Crear">
            <button type="button" class="btn btn-white dropdown-toggle" id="Crear" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="true">
              Agregar
            </button>
            <div class="div-gerente dropdown-menu">
              <li><Link to="/cajero/clientes" class="dropdown-item">Agregar Cliente</Link></li>
              <li><Link to="/cajero/transaccion" class="dropdown-item">Agregar Recarga</Link></li>
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

          <img src={img4} class="logo" />
        </div>

        <div class="div-gerente outer button">

          <button onClick={logOut}> Salir </button>
          <span></span>
          <span></span>
        </div>

        <div className='div-gerente' id="nombre_del_gerente">
          {datos.persona.nombre}
        </div>
        <div className='div-gerente' id="__0000">
          #{datos.persona.cedula}
        </div>
        <div className='div-gerente' id="bienvenido">
          ¡BIENVENIDO ESTIMADO CAJERO!
        </div>
        <div className='div-gerente' id="saludo">
          Aquí tendrás tus funciones laborales de ARCADESTATION. Echa un vistazo y descubre tus funciones, en caso
          de una duda utilice el manual de usuario.
        </div>

        <img src={img5} id="mask_group_ek2" />
      </main>
    )
}

export default Home;