import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import img4 from '../Img/logo_ek1.png'; import manual from '../../pdf/Manual_Usuario_ArcadeStation.pdf';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';

import '../css/form_trans_gerente.css';

const FormularioTransaccionesCajero = () => {

    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState("");
    const [referencia, setReferencia] = useState("");
    const [tarjeta, setTarjeta] = useState("");
    const [tipoPago, setTipoPago] = useState(1);
    const [editable, setEditable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        let res = undefined;

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
        <input type="checkbox" name="" id="check" />
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
    
            </div>
				
                    <form class="div-gerente rectangulo_transaccion" onSubmit={(e) => checkCreacion(e)}>

                        <div class="div-gerente" id="Tarjeta">
                            Tarjeta:
                            <input placeholder='Ejemplo: 1234567890123' type="text" class="tarjeta" name="tarjeta" maxLength={13} pattern='\d+' value={tarjeta} onChange={(e) => onChangeTarjeta(e.target.value.replace(/\s+/, ""))} required onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => e.target.setCustomValidity('Este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} />
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
                                    <input placeholder='Ejemplo: 125540' type="text" class="monto" name="referencia" value={referencia} onChange={(e) => setReferencia(e.target.value.replace(/^\s+/, ""))} pattern="\d+" required disabled />
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
                                    <input placeholder='Ejemplo: 2.65' class="monto" name="monto" type="number" step={0.01} min={0.01} max={9999999.99} value={monto} onChange={(e) => setMonto(e.target.value.replace(/^\s+/, ""))} required  />
                                </div>
                                <div class="div-gerente" id="Descripcion">
                                    Descripción:
                                    <input placeholder='Ejemplo: Recarga' class="monto" name="descripcion" type="text" maxLength={40} value={descripcion} onChange={(e) => setDescripcion(e.target.value.replace(/^\s+/, ""))} required />
                                </div>
                                <div class="div-gerente" id="Referencia">
                                    Referencia:
                                    <input onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => e.target.setCustomValidity('Este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} placeholder='Ejemplo: 125540' type="text" class="monto" name="referencia" value={referencia} onChange={(e) => setReferencia(e.target.value.replace(/^\s+/, ""))} pattern="\d+" required  />
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

                        <div class="div-gerente Crear2">
                            <button type='submit' class="Crearb"> Crear </button>
                        </div>
		            </form>
     </main>
    );
};

export default FormularioTransaccionesCajero;