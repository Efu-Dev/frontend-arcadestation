import React from 'react';
import img1 from './Img/dde6daf4675eec6dc7e0c73a83e37bd2_1.png';
import img2 from './Img/_8a36117830713c529bb94c295c5255b5_1.png';
import img3 from './Img/mask_group_ek1.png'
import img4 from './Img/logo_ek1.png';
import './css/gerente.module.css';

const Navbar = ({usuario}) => {
    
  return (
    <div class="menu">
		<label for="check">
			<span class="fas fa-times" id="times"></span>
			<span class="far fa-circle-user" id="bars"></span>
		</label>
		<div class="head"> menu 

			<li><a href="#"><i class="fas fa-users"></i> Manual de ayuda de usuario</a></li>
			<li><a href="#"><i class="fas fa-cloud"></i> Respaldo de base de datos</a></li>
			<li><a href="#"><i class="fas fa-gear"></i> Configuracion</a></li>
			<li><a href="#"><i class="fas fa-info"></i> Acerca de</a></li>
			<li><a href="#"><i class="fas fa-gamepad"></i> Probar maquina</a></li>

		</div>
		<img src={img1} class="img-1" />
		<img src={img2} class="img-2" />
		<img src={img3} class="img-3" />

		<div class="barra_de_navegacion">
			<div class="reportes">
				<button type="button" class="btn btn-white dropdownd-toggle" id="reportes" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Reportes
				</button>
				<div class="dropdown-menu">
					<li><a href="#" class="dropdown-item">Reporte de Empleado</a></li>
					<li><a href="#" class="dropdown-item">Reporde de Cliente</a></li>
					<li><a href="#" class="dropdown-item">Reporte de Maquina</a></li>


				</div>

			</div>

			<div class="agregar">

				<button type="button" class="btn btn-white dropdownd-toggle" id="agregar" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Agregar
				</button>
				<div class="dropdown-menu">
					<li><a href="#" class="dropdown-item">Agregar Cliente</a></li>
					<li><a href="#" class="dropdown-item">Agregar Empleado</a></li>
					<li><a href="#" class="dropdown-item">Agregar Maquina</a></li>
					<li><a href="#" class="dropdown-item">Agregar Transacción</a></li>

				</div>
			</div>
			<div class="consultar">
				<button type="button" class="btn btn-white dropdownd-toggle" id="consultar" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Consultar
				</button>
				<div class="dropdown-menu">
					<li><a href="#" class="dropdown-item">Consultar Cliente</a></li>
					<li><a href="#" class="dropdown-item">Consultar Empleado</a></li>
					<li><a href="#" class="dropdown-item">Consultar Tarjeta</a></li>
					<li><a href="#" class="dropdown-item">Consultar Maquina</a></li>


				</div>
			</div>
			<div class="modificar">
				<button type="button" class="btn btn-white dropdownd-toggle" id="modificar" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="true">
					Modificar
				</button>
				<div class="dropdown-menu">
					<li><a href="#" class="dropdown-item">Modificar Cliente</a></li>
					<li><a href="#" class="dropdown-item">Modificar Empleado</a></li>
					<li><a href="#" class="dropdown-item">Modificar Maquina</a></li>
				</div>
			</div>

			<img src={img4} class="logo" />
			<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
				integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
				crossorigin="anonymous"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
				integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
				crossorigin="anonymous"></script>
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
				integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
				crossorigin="anonymous"></script>
		</div>
    </div>
  );
};

export default Navbar;