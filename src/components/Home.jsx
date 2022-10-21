import axios from 'axios'
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.create({
      baseURL: 'http://127.0.0.1:8000/usuarios/get/',
      'headers': {
        'Authorization': localStorage.getItem('access_token')
      }
    }).get().then((res) => {
      setDatos(res.data);
      setLoading(false);
    }).catch((e) => console.log(e));
  }, []);

  const logOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  if(!localStorage.getItem('access_token'))
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
        <button onClick={() => {logOut();}}>Salir</button>
    </div>
  )
}

export default Home