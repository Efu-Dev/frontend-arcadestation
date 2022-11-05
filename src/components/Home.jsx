import axios from 'axios'
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import download from 'downloadjs';

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
    <div>
        <h1>¡Bienvenido, {datos.empleado.cargo} {datos.persona.nombre}!</h1>
        <h5 style={{textAlign: "left"}}>Creación</h5>
        <ol style={{textAlign: "left"}}>
          <li><Link to="/crear/clientes">Crear Cliente</Link></li>
          <li><Link to="/crear/empleados">Crear Empleado</Link></li>
          <li><Link to="/crear/maquinas">Crear Máquinas</Link></li>
          <li><Link to="/crear/transaccion">Crear Transacción</Link></li>
        </ol>

        <h5 style={{textAlign: "left"}}>Modificación</h5>
        <ol style={{textAlign: "left"}}>
          <li><Link to="/modificar/clientes">Modificar Cliente</Link></li>
          <li><Link to="/modificar/empleados">Modificar Empleado</Link></li>
          <li><Link to="/modificar/maquinas">Modificar Máquinas</Link></li>
        </ol>

        <h5 style={{textAlign: "left"}}>Consultas</h5>
        <ol style={{textAlign: "left"}}>
          <li><Link to="/consultar/clientes">Consultar Clientes</Link></li>
          <li><Link to="/consultar/empleados">Consultar Empleados</Link></li>
          <li><Link to="/consultar/tarjeta">Consultar Tarjeta</Link></li>
          <li><Link to="/consultar/maquinas">Consultar Máquina</Link></li>
        </ol>

        <h5 style={{textAlign: "left"}}>Reportes</h5>
        <ol style={{textAlign: "left"}}>
          <li><a href='#1' onClick={reporteClientes}>Reporte de Clientes</a></li>
          <li><a href='#2' onClick={reporteEmpleados}>Reporte de Empleados</a></li>
          <li><a href='#3' onClick={reporteMaquinas}>Reporte de Máquinas</a></li>
        </ol> 

        <h5 style={{textAlign: "left"}}>Otros</h5>
        <ol style={{textAlign: "left"}}>
          <li><Link to="/control/probar_maquina">Probar Máquina</Link></li>
          <li><a href='#4' onClick={crearBackup}>Hacer Respaldo de Base de Datos</a></li>
          <li><a href='#5' onClick={restaurarBackup}>Restaurar Último Respaldo de la Base de Datos</a></li>
          <li><Link to="/control/cambiar_contrasena">Cambiar Contraseña</Link></li>
        </ol> 

        <button onClick={() => {logOut();}}>Salir</button>
    </div>
  )
}

export default Home