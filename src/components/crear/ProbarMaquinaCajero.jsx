import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/form_maquina.css';
import img4 from '../Img/logo_ek1.png'; import manual from '../../pdf/Manual_Usuario_ArcadeStation.pdf';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';

const ProbarMaquinaCajero = () => {

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
            <span class="span-gerente fas fa-times" id="times"></span>
            <span class="span-gerente far fa-circle-user" id="bars"></span>
          </label>
          <div class="div-gerente head">menú</div> <br /> <br /> <br /> <br />
          <li><a href={manual} target='_blank' rel='noreferrer'><i class="fas fa-users"></i> Manual de Ayuda de Usuario</a></li>
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
                    <input value={tarjeta} onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => {e.target.setCustomValidity('Este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')}} placeholder="Ejemplo: 1234567890123" type="text" pattern='\d+' maxLength={13} onChange={e => setTarjeta(e.target.value.trimStart())} required />
                </div>
                <div class="div-gerente" id="Tipo">
                    Puntaje:
                    <input step={1} onKeyDown={(e) => {e.key === '.' ? e.preventDefault() : console.log('');}} name='puntaje' type="number" maxLength={9} onChange={e => setPuntaje(e.target.value.trim())} value={puntaje} required />
                </div>     

                <div class="div-gerente cambiar-contrasena-submit">
                    <button class="Crearb"> Probar </button>
                </div>
                </form>
            </div>
        </main>
    );


        return (<div>
            <h1>Probar Máquina</h1>
            <form onSubmit={e => probarMaquina(e)}>
                <label htmlFor="maquina">Máquina:</label>
                <select name="maquina" id="maquina" onChange={e => changeMaquina(e.target.value)} value={maquina.codigo}>
                    {
                        maquinas.filter((i) => i.activa === 'S').map((i) => (
                            <option value={i.codigo}>{i.nombre}</option>
                        ))
                    }
                </select>

                <label htmlFor="tarjeta">Precio:</label>
                <input name='precio' type="number" value={maquina.precio} disabled />

                <label htmlFor="tarjeta">Tarjeta:</label>
                <input type="text" pattern='\d+' onChange={e => setTarjeta(e.target.value.trimStart())} required />

                <label htmlFor="tarjeta">Puntaje:</label>
                <input name='puntaje' type="number" onChange={e => setPuntaje(e.target.value.trim())} value={puntaje} required />

                <button type="submit">Probar Máquina</button>
            </form>
            
        </div>)
}

export default ProbarMaquinaCajero;