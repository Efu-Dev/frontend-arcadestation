import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/consultar_cliente.css';
import img4 from '../Img/logo_ek1.png';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';
import download from 'downloadjs';

const ConsultarTarjetaCajero = () => {

    const [datos, setDatos] = useState({});
    const [cedula, setCedula] = useState('');
    const [datosActuales, setDatosActuales] = useState([]);
    const navigate = useNavigate();

    const mostrarTarjeta = async (e) => {
        e.preventDefault();
        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/tarjetas/${cedula}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((resp) => {
            res = [resp.data.datos];
          }).catch((e) => console.log(e));
        
        console.log(res);
        const datosTarjeta = res.filter((i) => {
            return Number(i.numero) === Number(cedula);
        });
        if(datosTarjeta.length > 0)
            setDatosActuales(datosTarjeta);
        else
            alert("No hay una tarjeta con ese número.");     
            
        console.log(res[0].registros)
    };

    const onChangeNumero = (nuevo) => {
        setCedula(nuevo);
        setDatosActuales([]);
    };

    const reporteTransacciones = () => {
        axios.create({
          baseURL: `https://arcadestation.pythonanywhere.com/reportes/generar/transacciones/${datosActuales[0].numero}`,
          'headers': {
            'Authorization': localStorage.getItem('access_token_as')
          }
        }).get().then((res) => {
          const content = res.headers['content-type'];
          download(res.data, 'REPORTE_TRANSACCIONES_ARCADESTATION.pdf', content)
        }).catch((e) => console.log(e));
    };

    return (
        <main class="main-container" id='container-consulta'>
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

                </div>

            <div class="div-gerente container-fluid" style={{'marginTop': '150px'}}>
                <header class="consulta">
                    <h2>Consultar Tarjeta</h2>
                </header>

                <form onSubmit={(e) => mostrarTarjeta(e)}>
                    <input onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => e.target.setCustomValidity('Para hacer la búsqueda, campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} type="text" placeholder="Ingrese Número" class="search" pattern='[0-9]+' onChange={(e) => onChangeNumero(e.target.value.replace(/\s+/, ""))} maxLength={13} required />
                    <button class="boton" type='submit'>Buscar</button>
                </form>
        
        
            <div class="div-gerente row" id='contenedor-tabla'>
                <div class="div-gerente cuadrado-consulta">
                    <table class="tabla">
                        <thead class="encabezado">
                            <tr>
                                    <th>Cliente</th>
                                    <th>Cédula</th>
                                    <th># Tarjeta</th>
                                    <th>Saldo</th>
                                    <th>Fecha de Creación</th>
                                    <th>¿Anulada?</th>
                                    <th>Fecha de Anulación</th>    
                            </tr>
                        </thead>
            
                        <tbody>
                            {datosActuales.map((tarjeta) => {
                            return(<tr key={tarjeta.id}>
                                <td>{tarjeta.persona.nombre}</td>
                                <td>{tarjeta.persona.cedula}</td>
                                <td>{tarjeta.numero}</td>
                                <td>{tarjeta.saldo}</td>
                                <td>{`${new Date(tarjeta.fecha_creacion).getDate()}/${new Date(tarjeta.fecha_creacion).getMonth()+1}/${new Date(tarjeta.fecha_creacion).getFullYear()} 
                                ${new Date(tarjeta.fecha_creacion).getHours()}:${new Date(tarjeta.fecha_creacion).getMinutes()}`}</td>
                                <td>{tarjeta.anulada === 'N' ? "No" : "Sí"}</td>
                                {tarjeta.anulada === 'S' ? (
                                    <td>{`${new Date(tarjeta.fecha_anulacion).getDate()+1}/${new Date(tarjeta.fecha_anulacion).getMonth()+1}/${new Date(tarjeta.fecha_anulacion).getFullYear()}`}</td>
                                ) : (
                                    <td>-</td>
                                )}                        
                                </tr>)
                            })}    
                            </tbody>
                        </table>                       
                </div>
                </div>
            </div>
        </main>
    );
};

export default ConsultarTarjetaCajero;