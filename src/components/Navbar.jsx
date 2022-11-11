import React from 'react';
import img1 from './Img/dde6daf4675eec6dc7e0c73a83e37bd2_1.png';
import img2 from './Img/_8a36117830713c529bb94c295c5255b5_1.png';
import img3 from './Img/mask_group_ek1.png'
import img4 from './Img/logo_ek1.png';

import axios from 'axios';
import download from 'downloadjs';

const Navbar = ({usuario}) => {

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
    
  return (
    <div class="div-gerente menu">
			<label for="check">
				<span class="span-gerente fas fa-times" id="times"></span>
				<span class="span-gerente fas fa-circle-user" id="bars"></span>
			</label>
			<div class="div-gerente head" style={{marginBottom: '50px'}}>menú</div>

      
        <li><a href="#"><i class="fas fa-users"></i> Manual de usuario</a></li>
        <li><a href="#"><i class="fas fa-cloud"></i> Crear Respaldo de base de datos</a></li>
        <li><a href="#"><i class="fas fa-cloud"></i> Restaurar base de datos</a></li>
        <li><a href="#"><i class="fas fa-gear"></i> Cambiar Contraseña</a></li>
        <li><a href="#"><i class="fas fa-gamepad"></i> Probar máquina</a></li>

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
					<li><a href="/crear/clientes" class="dropdown-item">Agregar Cliente</a></li>
					<li><a href="/crear/empleados" class="dropdown-item">Agregar Empleado</a></li>
					<li><a href="/crear/maquinas" class="dropdown-item">Agregar Máquina</a></li>
					<li><a href="/crear/transaccion" class="dropdown-item">Agregar Recarga</a></li>
				</div>
			</div>
			<div class="div-gerente consultar">
				<button type="button" class="btn btn-white dropdownd-toggle" id="consultar" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Consultar
				</button>
				<div class="div-gerente dropdown-menu">
					<li><a href="/consultar/clientes" class="dropdown-item">Consultar Cliente</a></li>
					<li><a href="/consultar/empleados" class="dropdown-item">Consultar Empleado</a></li>
					<li><a href="/consultar/tarjeta" class="dropdown-item">Consultar Tarjeta</a></li>
					<li><a href="/consultar/maquinas" class="dropdown-item">Consultar Maquina</a></li>
				</div>
			</div>
			<div class="div-gerente modificar">
				<button type="button" class="btn btn-white dropdownd-toggle" id="modificar" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Modificar
				</button>
				<div class="div-gerente dropdown-menu">
					<li><a href="/modificar/clientes" class="dropdown-item">Modificar Cliente</a></li>
					<li><a href="/modificar/empleados" class="dropdown-item">Modificar Empleado</a></li>
					<li><a href="/modificar/maquinas" class="dropdown-item">Modificar Maquina</a></li>

				</div>
			</div>


			<img src={img4} class="logo" />
			</div>
		</div>
  );
};

export default Navbar;