import logo from './logo.svg';
import LogIn from './components/LogIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import FormularioClientes from './components/crear/FormularioClientes.jsx';
import FormularioEmpleados from './components/crear/FormularioEmpleados.jsx';
import FormularioMaquina from './components/crear/FormularioMaquina.jsx';
import FormularioTransaccion from './components/crear/FormularioTransaccion.jsx';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/crear/clientes' element={<FormularioClientes />} />
          <Route path='/crear/empleados' element={<FormularioEmpleados />} />
          <Route path='/crear/maquinas' element={<FormularioMaquina />} />
          <Route path='/crear/transaccion' element={<FormularioTransaccion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
