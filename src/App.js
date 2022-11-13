import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import LogIn from './components/LogIn';

import FormularioClientes from './components/crear/FormularioClientes.jsx';
import FormularioEmpleados from './components/crear/FormularioEmpleados.jsx';
import FormularioMaquina from './components/crear/FormularioMaquina.jsx';
import FormularioTransaccion from './components/crear/FormularioTransaccion.jsx';
import ProbarMaquina from './components/crear/ProbarMaquina.jsx';

import FormularioModClientes from './components/modificar/FormularioModClientes.jsx';
import FormularioModMaquina from './components/modificar/FormularioModMaquina.jsx';
import FormularioModEmpleados from './components/modificar/FormularioModEmpleados.jsx';

import ConsultarClientes from './components/consultar/ConsultarClientes.jsx';
import ConsultarEmpleados from './components/consultar/ConsultarEmpleados.jsx';
import ConsultarTarjeta from './components/consultar/ConsultarTarjeta.jsx';
import ConsultarMaquinas from './components/consultar/ConsultarMaquinas.jsx';
import ConsultarActividad from './components/consultar/ConsultarActividad.jsx';

import CambiarContraseña from './components/control/CambiarContraseña.jsx';
import RecuperarContrasena from './components/control/RecuperarContrasena.jsx';

import FormularioClientesCajero from './components/crear/FormularioClientesCajero';
import FormularioTransaccionesCajero from './components/crear/FormularioTransaccionesCajero';
import ConsultarTarjetaCajero from './components/consultar/ConsultaTarjetaCajero';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Control */}
          <Route path='/' element={<LogIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/control/recuperacion_contrasena' element={<RecuperarContrasena />} />
          <Route path='/control/cambiar_contrasena' element={<CambiarContraseña />} />
          <Route path='/control/probar_maquina' element={<ProbarMaquina />} />

          {/* Creación */}
          <Route path='/crear/clientes' element={<FormularioClientes />} />
          <Route path='/crear/empleados' element={<FormularioEmpleados />} />
          <Route path='/crear/maquinas' element={<FormularioMaquina />} />
          <Route path='/crear/transaccion' element={<FormularioTransaccion />} />

          {/* Modificación */}
          <Route path='/modificar/clientes' element={<FormularioModClientes />} />
          <Route path='/modificar/empleados' element={<FormularioModEmpleados />} />
          <Route path='/modificar/maquinas' element={<FormularioModMaquina />} />

          {/* Consultar */}
          <Route path='/consultar/clientes' element={<ConsultarClientes />} />
          <Route path='/consultar/empleados' element={<ConsultarEmpleados />} />
          <Route path='/consultar/maquinas' element={<ConsultarMaquinas />} />
          <Route path='/consultar/tarjeta' element={<ConsultarTarjeta />} />
          <Route path='/consultar/maquinas/:codigo' element={<ConsultarActividad />} />

          {/* Cajero */}
          <Route path='/cajero/clientes' element={<FormularioClientesCajero />} />
          <Route path='/cajero/transaccion' element={<FormularioTransaccionesCajero />} />
          <Route path='/cajero/tarjeta' element={<ConsultarTarjetaCajero />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
