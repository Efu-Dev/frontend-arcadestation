import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/consultar_cliente.css';
import img4 from '../Img/logo_ek1.png';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';
import { useParams } from 'react-router-dom';
import download from 'downloadjs';

const ConsultarActividad = () => {

    const {codigo} = useParams();
    const [datos, setDatos] = useState({});
    const [maquina, setMaquina] = useState(undefined);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(codigo);
        axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/registro/actividad/${codigo}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            console.log(res);
            setDatos(res.data.datos);
            setLoading1(false);
          }).catch((e) => console.log(e));

        axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/maquinas/${String(codigo)}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            console.log(res);
            setMaquina(res.data.datos);
            setLoading2(false);
          }).catch((e) => console.log(e));
    }, []);

    const reporteActividad = () => {
        axios.create({
          baseURL: `https://arcadestation.pythonanywhere.com/reportes/generar/actividad/${codigo}`,
          'headers': {
            'Authorization': localStorage.getItem('access_token_as')
          }
        }).get().then((res) => {
          const content = res.headers['content-type'];
          download(res.data, 'REPORTE_ACTIVIDAD_ARCADESTATION.pdf', content);
        }).catch((e) => console.log(e));
      };

    if(loading1 || loading2)
        return <h1>Cargando...</h1>

    return (
      <main class="main-container" id='container-consulta'>
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
  
          <div class="div-gerente barra_de_navegacion mb-5">
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

      <div class="div-gerente container-fluid" style={{'marginTop': '150px'}}>
          <header class="consulta">
              <h2>Registro de Actividad</h2>
          </header>

          <div>
            <ul>
                  <li><b>Máquina: </b> {maquina.nombre}</li>
                  <li><b>Código: </b> {maquina.codigo}</li>
                  <li><b>Precio: </b> {maquina.precio}</li>
                  <li><b>Reporte: </b> <button onClick={reporteActividad}>Descargar</button></li>
            </ul>
          </div>
  
  
     <div class="div-gerente row" id='contenedor-tabla'>
         <div class="div-gerente cuadrado-consulta">
             <table class="tabla">
                 <thead class="encabezado">
                     <tr>
                        <th>Fecha</th>
                        <th>Puntaje</th>
                        <th>Tarjeta</th>
                     </tr>
                 </thead>
     
                 <tbody>
                  {datos.map((registro) => {
                        return(<tr key={registro.id}>
                            <td style={{border: 'solid 1px black'}}>{`${new Date(registro.fecha).getDate()}/${new Date(registro.fecha).getMonth()+1}/${new Date(registro.fecha).getFullYear()}`}</td>
                            <td style={{border: 'solid 1px black'}}>{registro.puntaje}</td>
                            <td style={{border: 'solid 1px black'}}>{registro.tarjeta}</td>
                        </tr>)
                    })}    
                  </tbody>
              </table>                       
         </div>
      </div>
 </div>
</main>
    );

    return (
        <>
            <h1>Registro de Actividad</h1>
            <ul>
                <li><b>Máquina: </b> {maquina.nombre}</li>
                <li><b>Código: </b> {maquina.codigo}</li>
                <li><b>Precio: </b> {maquina.precio}</li>
                <li><b>Reporte: </b> <a href="#" onClick={reporteActividad}>Imprimir</a></li>
            </ul>

            {
                datos && datos.length > 0 ?
                (
                    <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Puntaje</th>
                        <th>Tarjeta</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    datos.map((registro) => {
                        return(<tr key={registro.id}>
                            <td style={{border: 'solid 1px black'}}>{`${new Date(registro.fecha).getDate()}/${new Date(registro.fecha).getMonth()+1}/${new Date(registro.fecha).getFullYear()} 
                            ${new Date(registro.fecha).getHours()}:${new Date(registro.fecha).getMinutes()}`}</td>
                            <td style={{border: 'solid 1px black'}}>{registro.puntaje}</td>
                            <td style={{border: 'solid 1px black'}}>{registro.tarjeta}</td>
                        </tr>)
                    })
                }
                </tbody>
                
            </table>
                ) : 
                <h1>No hay actividad registrada en esta máquina.</h1>
            }

            
        </>
        
    )
};

export default ConsultarActividad;