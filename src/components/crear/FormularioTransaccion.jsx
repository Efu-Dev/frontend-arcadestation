import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import img4 from '../Img/logo_ek1.png';
import manual from '../../pdf/Manual_Usuario_ArcadeStation.pdf';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';

import '../css/form_trans_gerente.css';

const FormularioClientes = () => {

    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState("");
    const [referencia, setReferencia] = useState("");
    const [tarjeta, setTarjeta] = useState("");
    const [tipoPago, setTipoPago] = useState(1);
    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        let res = undefined;
        setSendable(false);
        await axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/registro/transaccion/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).post('',
        {
            descripcion,
            monto,
            tarjeta_id: tarjeta,
            referencia,
            tipo_pago: tipoPago
        }).then((r) => {
            res = r;
            if(res.data.message === 'Success')
                alert("Transacción registrada exitosamente");
            else
                alert(res.data.message);
        }).catch((e) => {
            alert("Ocurrió un error.");
        });

        if(res.data.message === "Success"){
            navigate('/home');
        }

        console.log(res);
    };

    const onChangeTarjeta = async(e) => {
        setTarjeta(e.replace(/\s+/, ''));
        let res = "";
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/tarjetas/${e.replace(/\s+/, '')}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('').then((r) => {
            res = r;
        });

        console.log(res.data);
        if(res.data.message !== '404' && !e.replace(/\s+/, '').match(/^0+$/) && e.replace(/\s+/, '') !== '' && res.data.datos.anulada !== 'S'){
            setEditable(false);
        }
        else if (res.data.datos.anulada === 'S'){
            setEditable(true);
            setMonto('');
            setDescripcion('');
            setReferencia('');
            setTipoPago(1);
            alert("La tarjeta se encuentra anulada. Un gerente debe de reactivarla.")
        }
        else{
            setMonto('');
            setDescripcion('');
            setReferencia('');
            setTipoPago(1);
            setEditable(true);
        }
    }

    return (
        <main class="main-container">
        <input class="" type="checkbox" name="" id="check" />
            <div class="div-gerente menu">
                <label for="check">
                    <span class="fas fa-times" id="times"></span>
                    <span class="far fa-circle-user" id="bars"></span>
                </label>
                <div class="div-gerente head">menú</div><br /> <br /> <br /> <br />
    
                <li><a href={manual} target='_blank' rel='noreferrer'><i class="fas fa-users"></i> Manual de Usuario</a></li>
                <li><Link to='/' onClick={crearBackup}><i class="fas fa-cloud"></i> Crear Respaldo de Base de Datos</Link></li>
                <li><Link to="/" onClick={restaurarBackup}><i class="fas fa-cloud"></i> Restaurar Base de Datos</Link></li>
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
    
            </div>
				
                    <form class="div-gerente rectangulo_transaccion" onSubmit={(e) => checkCreacion(e)}>

                        <div class="div-gerente" id="Tarjeta">
                            Tarjeta:
                            <input placeholder='Ejemplo: 1234567890123' type="text" class="tarjeta" name="tarjeta" onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => e.target.setCustomValidity('Este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} maxLength={13} pattern='\d+' value={tarjeta} onChange={(e) => onChangeTarjeta(e.target.value.replace(/\s+/, ""))} required />
                        </div>

                        {
                            editable ? (
                                <>

                                <h1>Agregar Recarga</h1>
                                <div class="div-gerente" id="Monto">
                                    Monto:<br />
                                    <input placeholder='Ejemplo: 2.65' class="monto" name="monto" type="number" step={0.01} min={0.01} max={9999999.99} value={monto} onChange={(e) => setMonto(e.target.value.replace(/^\s+/, ""))} required disabled />
                                </div>
                                <div class="div-gerente" id="Descripcion">
                                    Descripción:
                                    <input placeholder='Ejemplo: Recarga' class="monto" name="descripcion" type="text" maxLength={40} value={descripcion} onChange={(e) => setDescripcion(e.target.value.replace(/^\s+/, ""))} required disabled/>
                                </div>
                                <div class="div-gerente" id="Referencia">
                                    Referencia:
                                    <input placeholder='Ejemplo: 125540' type="text" class="monto" name="referencia" value={referencia} onChange={(e) => setReferencia(e.target.value.replace(/\s+/, ""))} pattern="\d+" required disabled />
                                </div>
                                <div class="div-gerente" id="Tipo">
                                    Tipo de Pago:
                                    <select name="tipoPago" onChange={(e) => setTipoPago(e.target.value.replace(/^\s+/, ""))} disabled="disabled">
                                        <option value="1">Tarjeta de Débito</option>
                                        <option value="2">Pago Móvil</option>
                                        <option value="3">Tarjeta de Crédito</option>
                                        <option value="4">Transferencia</option>                          
                                    </select>
                                </div>
                                </>
                            ) : (
                                <>
                                <h1>Agregar Recarga</h1>
                                <div class="div-gerente" id="Monto">
                                    Monto:<br />
                                    <input placeholder='Ejemplo: 2.65' class="monto" name="monto" type="number" step={0.01} min={0.01} max={9999999.99} value={monto} onChange={(e) => setMonto(e.target.value.replace(/\s+/, ""))} required  />
                                </div>
                                <div class="div-gerente" id="Descripcion">
                                    Descripción:
                                    <input placeholder='Ejemplo: Recarga' class="monto" name="descripcion" type="text" maxLength={40} value={descripcion} onChange={(e) => setDescripcion(e.target.value.replace(/^\s+/, ""))} required />
                                </div>
                                <div class="div-gerente" id="Referencia">
                                    Referencia:
                                    <input onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => e.target.setCustomValidity('Este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} placeholder='Ejemplo: 125540' maxLength={45} type="text" class="monto" name="referencia" value={referencia} onChange={(e) => setReferencia(e.target.value.replace(/\s+/, ""))} pattern="\d+" required  />
                                </div>
                                <div class="div-gerente" id="Tipo">
                                    Tipo de Pago:
                                    <select name="tipoPago" onChange={(e) => setTipoPago(e.target.value.replace(/^\s+/, ""))}>
                                        <option value="1">Tarjeta de Débito</option>
                                        <option value="2">Pago Móvil</option>
                                        <option value="3">Tarjeta de Crédito</option>
                                        <option value="4">Transferencia</option>                          
                                    </select>
                                </div>                                
                                </>
                            )
                        }

                        {
                            sendable ? (
                                <div class="div-gerente Crear2">
                                    <button type='submit' class="Crearb"> Crear </button>
                                </div>
                            ) : (
                                <div class="div-gerente Crear2">
                                    <button disabled type='submit' class="Crearb"> Crear </button>
                                </div>
                            )
                        }

                        
		            </form>
     </main>
    );
};

export default FormularioClientes;