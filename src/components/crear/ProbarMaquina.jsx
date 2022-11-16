import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/form_maquina.css';
import img4 from '../Img/logo_ek1.png';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';

const ProbarMaquina = () => {

    const [maquinas, setMaquinas] = useState(false);
    const [maquina, setMaquina] = useState(false);
    const [tarjeta, setTarjeta] = useState('');
    const [puntaje, setPuntaje] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/maquinas/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            if(res.data.message === 'Success'){
                setMaquinas(res.data.datos);
                setMaquina(res.data.datos.filter(x => x.activa === 'S')[0])
            }
            else
              alert(res.data.message);
          }).catch((e) => console.log(e));
    }, []);

    const probarMaquina = async (e) => {
        e.preventDefault();
        let continuar = false;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/tarjetas/${tarjeta}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            console.log(res);
            if(res.data.message === 'Success' && res.data.datos.anulada === 'N')
                continuar = true;
            else
                alert('La tarjeta no se encuentra activa o no existe. Verifique en caja.');
            
            console.log("A");
        }).catch((e) => {return;});
        
        if(!continuar)
            return;

        console.log(continuar);

        await axios.create({
            'baseURL': `https://arcadestation.pythonanywhere.com/api/registro/actividad/${maquina.codigo}`,
            'headers': {
                'Authorization': localStorage.getItem('access_token_as')
            }
        }).post('', {
            tarjeta,
            puntaje,
        }).then((res) => {
            if(res.data.message === 'Success'){
                alert("Actividad registrada exitosamente.");
                navigate('/home')
            }else{
                alert(res.data.message);
            }          
        }).catch((e) => console.log(e));
    };

    const changeMaquina = async (e) => {
        let res = undefined;
        console.log(e);
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/maquinas/${e}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((r) => {
            if(r.data.message === 'Success')
              setMaquina(r.data.datos);
            else
              alert(res.data.message);
          }).catch((e) => console.log(e));    
    };

    if(!maquinas)
        return (<h2>Cargando...</h2>)

    return (
        <main class="main-container">
        <input class="" type="checkbox" name="" id="check" />
            <div class="div-gerente menu">
                <label for="check">
                    <span class="fas fa-times" id="times"></span>
                    <span class="far fa-circle-user" id="bars"></span>
                </label>
                <div class="div-gerente head">menú</div><br /> <br /> <br /> <br />
    
                <li><a href="#"><i class="fas fa-users"></i> Manual de usuario</a></li>
                <li><a href="#" onClick={crearBackup}><i class="fas fa-cloud"></i> Crear Respaldo de base de datos</a></li>
                <li><a href="#" onClick={restaurarBackup}><i class="fas fa-cloud"></i> Restaurar base de datos</a></li>
                <li><Link to="/control/cambiar_contrasena"><i class="fas fa-gear"></i> Cambiar Contraseña</Link></li>
                <li><Link to="/control/probar_maquina"><i class="fas fa-gamepad"></i> Probar máquina</Link></li>
            </div>
          
    
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
    
           

                <form class="div-gerente rectangulo" onSubmit={(e) => probarMaquina(e)}>
                <h1>Probar Máquina</h1>
                <div class="div-gerente" id="Monto">
                    Máquina:<br />
                    <select name="maquina" id="maquina" onChange={e => changeMaquina(e.target.value)} value={maquina.codigo}>
                        {
                            maquinas.filter((i) => i.activa === 'S').map((i) => (
                                <option value={i.codigo}>{i.codigo} - {i.nombre}</option>
                            ))
                        }
                    </select>
                </div>
                                
                <div class="div-gerente" id="Descripcion">
                    Precio:
                    <input name='precio' type="number" value={maquina.precio} disabled />
                </div>
                <div class="div-gerente" id="Referencia">
                    Tarjeta:
                    <input onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => {e.target.setCustomValidity('Este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')}} placeholder='Ejemplo: 1234567890123' type="text" pattern='\d+' maxLength={13} minLength={13}  onChange={e => setTarjeta(e.target.value.trimStart())} required />
                </div>
                <div class="div-gerente" id="Tipo">
                    Puntaje:
                    <input step={1} onKeyDown={(e) => {e.key === '.' ? e.preventDefault() : console.log('');}} placeholder='Ejemplo: 5000' name='puntaje' type="number" maxLength={9} onChange={e => setPuntaje(e.target.value.trim())} value={puntaje} required />
                </div>     

                <div class="div-gerente cambiar-contrasena-submit">
                    <button class="Crearb"> Probar </button>
                </div>
                </form>
            </div>
        </main>
    );
}

export default ProbarMaquina;