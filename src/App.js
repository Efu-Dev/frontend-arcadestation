import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import LogIn from './components/LogIn';

import FormularioClientes from './components/crear/FormularioClientes.jsx';
import FormularioEmpleados from './components/crear/FormularioEmpleados.jsx';
import FormularioMaquina from './components/crear/FormularioMaquina.jsx';
import FormularioTransaccion from './components/crear/FormularioTransaccion.jsx';

import FormularioModClientes from './components/modificar/FormularioModClientes.jsx';
import FormularioModMaquina from './components/modificar/FormularioModMaquina.jsx';
import FormularioModEmpleados from './components/modificar/FormularioModEmpleados.jsx';

import ConsultarClientes from './components/consultar/ConsultarClientes.jsx';
import ConsultarEmpleados from './components/consultar/ConsultarEmpleados.jsx';
import ConsultarTarjeta from './components/consultar/ConsultarTarjeta.jsx';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Control */}
          <Route path='/' element={<LogIn />} />
          <Route path='/home' element={<Home />} />

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
          <Route path='/consultar/maquinas' element={<FormularioModMaquina />} />
          <Route path='/consultar/tarjeta' element={<ConsultarTarjeta />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
