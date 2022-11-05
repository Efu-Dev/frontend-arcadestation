import axios from 'axios'
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import download from 'downloadjs';

import './css/gerente.css';

import img1 from './Img/dde6daf4675eec6dc7e0c73a83e37bd2_1.png';
import img2 from './Img/_8a36117830713c529bb94c295c5255b5_1.png';
import img3 from './Img/mask_group_ek1.png';
import img4 from './Img/logo_ek1.png';
import img5 from './Img/mask_group_ek2.png';

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

  const reporteClientes = () => {
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

  const reporteEmpleados = () => {
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

  const reporteMaquinas = () => {
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

  const crearBackup = () => {
    axios.create({
      baseURL: 'https://arcadestation.pythonanywhere.com/backupdb/',
      'headers': {
        'Authorization': localStorage.getItem('access_token_as')
      }
    }).get().then((res) => {
      if(res.data.message === 'Success')
        alert('El respaldo ha sido generado y enviado a la nube MEGA de la empresa.');
      else
        alert('No se pudo crear el respaldo.');
    }).catch((e) => console.log(e));
  };

  const restaurarBackup = () => {
    axios.create({
      baseURL: 'https://arcadestation.pythonanywhere.com/backupdb/',
      'headers': {
        'Authorization': localStorage.getItem('access_token_as')
      }
    }).post().then((res) => {
      if(res.data.message === 'Success')
        alert('El último respaldo guardado en la nube de la empresa ha sido restaurado exitosamente.');
      else
        alert('El último respaldo guardado en la nube de la empresa NO pudo ser restaurado.');
    }).catch((e) => console.log(e));
  };

  if(!localStorage.getItem('access_token_as'))
    return (<h1>Estimado Usuario, no tiene permiso para acceder a este módulo.</h1>);

  if(loading)
    return (<h3>Cargando...</h3>)

  return (
    <main className="main-container">
		<input className='input-gerente' type="checkbox" name="" id="check" />
		<div class="div-gerente menu">
			<label for="check">
				<span class="span-gerente fas fa-times" id="times"></span>
				<span class="span-gerente fas fa-circle-user" id="bars"></span>
			</label>
			<div class="div-gerente head"> menu </div>

			<li><a href="#"><i class="fas fa-users"></i> Manual de ayuda de usuario</a></li>
			<li><a href="#"><i class="fas fa-cloud"></i> Respaldo de base de datos</a></li>
			<li><a href="#"><i class="fas fa-gear"></i> Configuracion</a></li>
			<li><a href="#"><i class="fas fa-info"></i> Acerca de</a></li>
			<li><a href="#"><i class="fas fa-gamepad"></i> Probar maquina</a></li>


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
					<li><a href="#" class="dropdown-item">Reporte de Empleado</a></li>
					<li><a href="#" class="dropdown-item">Reporde de Cliente</a></li>
					<li><a href="#" class="dropdown-item">Reporte de Maquina</a></li>


				</div>

			</div>

			<div class="div-gerente agregar">

				<button type="button" class="btn btn-white dropdownd-toggle" id="agregar" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Agregar
				</button>
				<div class="div-gerente dropdown-menu">
					<li><a href="#" class="dropdown-item">Agregar Cliente</a></li>
					<li><a href="#" class="dropdown-item">Agregar Empleado</a></li>
					<li><a href="#" class="dropdown-item">Agregar Maquina</a></li>
					<li><a href="#" class="dropdown-item">Agregar Transacción</a></li>

				</div>
			</div>
			<div class="div-gerente consultar">
				<button type="button" class="btn btn-white dropdownd-toggle" id="consultar" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Consultar
				</button>
				<div class="div-gerente dropdown-menu">
					<li><a href="#" class="dropdown-item">Consultar Cliente</a></li>
					<li><a href="#" class="dropdown-item">Consultar Empleado</a></li>
					<li><a href="#" class="dropdown-item">Consultar Tarjeta</a></li>
					<li><a href="#" class="dropdown-item">Consultar Maquina</a></li>


				</div>
			</div>
			<div class="div-gerente modificar">
				<button type="button" class="btn btn-white dropdownd-toggle" id="modificar" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Modificar
				</button>
				<div class="div-gerente dropdown-menu">
					<li><a href="#" class="dropdown-item">Modificar Cliente</a></li>
					<li><a href="#" class="dropdown-item">Modificar Empleado</a></li>
					<li><a href="#" class="dropdown-item">Modificar Maquina</a></li>

				</div>
			</div>


			<img src={img4} class="logo" />

		</div>

		<div class="div-gerente outer button">

			<button onClick={logOut}> LOG OUT </button>
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
}

export default Home