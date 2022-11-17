import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/consultar_cliente.css';
import img4 from '../Img/logo_ek1.png';
import {crearBackup, restaurarBackup, reporteClientes, reporteEmpleados, reporteMaquinas} from '../Home.jsx';
import download from 'downloadjs';

const ConsultarTarjeta = () => {

    const [datos, setDatos] = useState({});
    const [cedula, setCedula] = useState('');
    const [datosActuales, setDatosActuales] = useState([]);
    const navigate = useNavigate();

    const mostrarTarjeta = async (e) => {
        e.preventDefault();
        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/tarjetas/${cedula}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((resp) => {
            res = [resp.data.datos];
          }).catch((e) => console.log(e));
        
        console.log(res);
        const datosTarjeta = res.filter((i) => {
            return Number(i.numero) === Number(cedula);
        });
        if(datosTarjeta.length > 0)
            setDatosActuales(datosTarjeta);
        else
            alert("No hay una tarjeta con ese número.");     
            
        console.log(res[0].registros)
    };

    const onChangeNumero = (nuevo) => {
        nuevo = nuevo.replace(' ', '');
        setCedula(nuevo.replace(/\s+/, ''));
        setDatosActuales([]);
    };

    const reporteTransacciones = () => {
        axios.create({
          baseURL: `https://arcadestation.pythonanywhere.com/reportes/generar/transacciones/${datosActuales[0].numero}`,
          'headers': {
            'Authorization': localStorage.getItem('access_token_as')
          }
        }).get().then((res) => {
          const content = res.headers['content-type'];
          download(res.data, 'REPORTE_TRANSACCIONES_ARCADESTATION.pdf', content)
        }).catch((e) => console.log(e));
    };

    return (
        <main class="main-container" id='container-consulta'>
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
                    <h2>Consultar Tarjeta</h2>
                </header>

                <form onSubmit={(e) => mostrarTarjeta(e)}>
                    <input onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => e.target.setCustomValidity('Para hacer la búsqueda, este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} type="text" placeholder="Ingrese Número" class="search" pattern='[0-9]+' onChange={(e) => onChangeNumero(e.target.value.replace(/\s+/, ""))} value={cedula} maxLength={13} required />
                    <button class="boton" type='submit'>Buscar</button>
                </form>
        
        
            <div class="div-gerente row" id='contenedor-tabla'>
                <div class="div-gerente cuadrado-consulta">
                    <table class="tabla">
                        <thead class="encabezado">
                            <tr>
                                    <th>Cliente</th>
                                    <th>Cédula</th>
                                    <th># Tarjeta</th>
                                    <th>Saldo</th>
                                    <th>Fecha de Creación</th>
                                    <th>¿Anulada?</th>
                                    <th>Fecha de Anulación</th>    
                            </tr>
                        </thead>
            
                        <tbody>
                            {datosActuales.map((tarjeta) => {
                            return(<tr key={tarjeta.id}>
                                <td>{tarjeta.persona.nombre}</td>
                                <td>{tarjeta.persona.cedula}</td>
                                <td>{tarjeta.numero}</td>
                                <td>{tarjeta.saldo}</td>
                                <td>{`${new Date(tarjeta.fecha_creacion).getDate()}/${new Date(tarjeta.fecha_creacion).getMonth()+1}/${new Date(tarjeta.fecha_creacion).getFullYear()}`}</td>
                                <td>{tarjeta.anulada === 'N' ? "No" : "Sí"}</td>
                                {tarjeta.anulada === 'S' ? (
                                    <td>{`${new Date(tarjeta.fecha_anulacion).getDate()+1}/${new Date(tarjeta.fecha_anulacion).getMonth()+1}/${new Date(tarjeta.fecha_anulacion).getFullYear()}`}</td>
                                ) : (
                                    <td>-</td>
                                )}                        
                                </tr>)
                            })}    
                            </tbody>
                        </table>                       
                </div>
                </div>

                {
                    datosActuales[0] !== undefined ? (
                        <div class="div-gerente row" style={{marginTop: '35vh', backgroundColor: 'rgba(251.82, 74.62, 148.26, 1)'}}>
                <div class="div-gerente cuadrado-consulta" style={{backgroundColor: 'rgba(251.82, 74.62, 148.26, 1)'}}>
                {
                        datosActuales[0] !== undefined ? 
                        (<>
                        {
                            datosActuales[0].registros.length > 0 ?
                            (
                            <div>
                                <div className='d-flex justify-content-end'>
                                    <button onClick={reporteTransacciones}>Reporte de Transacciones</button>
                                </div>
                                <table class="tabla" style={{width: '100%', backgroundColor: 'white'}}>
                                <thead class="encabezado">
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Monto</th>
                                        <th>Referencia</th>
                                        <th>Descripción</th>
                                        <th>Resultado</th>
                                        <th>Tipo</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        datosActuales[0].registros.map((reg) => (
                                            <tr>
                                                <td>{`${new Date(reg.fecha).getDate()}/${new Date(reg.fecha).getMonth()+1}/${new Date(reg.fecha).getFullYear()}`}</td>
                                                <td>{reg.monto}</td>
                                                <td>{reg.referencia ? reg.referencia : 'No Aplica'}</td>
                                                <td>{reg.descripcion}</td>
                                                <td>{reg.resultado === '' || reg.resultado === 'A' ? 'Aprobada' : 'Denegada'}</td>
                                                <td>
                                                    {
                                                        reg.tipo_pago_id === 1 ? 'Tarjeta de Débito' :
                                                        reg.tipo_pago_id === 2 ? 'Pago Móvil' :
                                                        reg.tipo_pago_id === 3 ? 'Tarjeta de Crédito' :
                                                        reg.tipo_pago_id === 4 ? 'Transferencia' :
                                                        'Uso Tarjeta'
                                                    }
                                                </td>
                                            </tr>
                                            
                                        ))
                                    }
                                </tbody>                            
                            </table> 
                            </div>                   
                            ) :
                            (
                                <h5>Esta tarjeta no ha sido recargada ni utilizada.</h5>
                            )
                        }
                        </>) :
                        <></>
                    }                    
               </div>
            </div>
                    ) : 
                    <></>
                }

                
       </div>
    </main>
    );

    return (
        <>
            <h1>Consultar Tarjeta</h1>
            <form onSubmit={(e) => mostrarTarjeta(e)}>
                <label>Número:</label>
                <input type="text" pattern='[0-9]+' onChange={(e) => onChangeNumero(e.target.value.replace(/^\s+/, "").replace(/^\s+/, ""))} required />
                <button type="submit">Buscar</button>
            </form>

            <h5>Datos Tarjeta</h5>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Cédula</th>
                        <th># Tarjeta</th>
                        <th>Saldo</th>
                        <th>Fecha de Creación</th>
                        <th>¿Anulada?</th>
                        <th>Fecha de Anulación</th>                   
                    </tr>
                </thead>
                
                <tbody>
                {datosActuales.map((tarjeta) => {
                    return(<tr key={tarjeta.id}>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.persona.nombre}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.persona.cedula}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.numero}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.saldo}</td>
                        <td style={{border: 'solid 1px black'}}>{`${new Date(tarjeta.fecha_creacion).getDate()}/${new Date(tarjeta.fecha_creacion).getMonth()+1}/${new Date(tarjeta.fecha_creacion).getFullYear()} 
                        ${new Date(tarjeta.fecha_creacion).getHours()}:${new Date(tarjeta.fecha_creacion).getMinutes()}`}</td>
                        <td style={{border: 'solid 1px black'}}>{tarjeta.anulada === 'N' ? "No" : "Sí"}</td>
                        {tarjeta.anulada === 'S' ? (
                            <td style={{border: 'solid 1px black'}}>{`${new Date(tarjeta.fecha_anulacion).getDate()+1}/${new Date(tarjeta.fecha_anulacion).getMonth()+1}/${new Date(tarjeta.fecha_anulacion).getFullYear()}`}</td>
                        ) : (
                            <td style={{border: 'solid 1px black'}}>-</td>
                        )}
                        
                    </tr>)
                })}
                </tbody>
            </table>

            {
                    datosActuales[0] !== undefined ? 
                    (<>
                    {
                        datosActuales[0].registros.length > 0 ?
                        (
                        <>
                            <a href='#1' onClick={reporteTransacciones}>Imprimir Reporte de Transacciones</a>
                            <table>
                            
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Referencia</th>
                                    <th>Descripción</th>
                                    <th>Resultado</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    datosActuales[0].registros.map((reg) => (
                                        <tr>
                                            <td>{`${new Date(reg.fecha).getDate()}/${new Date(reg.fecha).getMonth()+1}/${new Date(reg.fecha).getFullYear()} 
                                            ${new Date(reg.fecha).getHours()}:${new Date(reg.fecha).getMinutes()}`}</td>
                                            <td>{reg.monto}</td>
                                            <td>{reg.referencia ? reg.referencia : 'No Aplica'}</td>
                                            <td>{reg.descripcion}</td>
                                            <td>{reg.resultado === '' || reg.resultado === 'A' ? 'Aprobada' : 'Denegada'}</td>
                                            <td>
                                                {
                                                    reg.tipo_pago_id === 1 ? 'Tarjeta de Débito' :
                                                    reg.tipo_pago_id === 2 ? 'Pago Móvil' :
                                                    reg.tipo_pago_id === 3 ? 'Tarjeta de Crédito' :
                                                    reg.tipo_pago_id === 4 ? 'Transferencia' :
                                                    'Uso Tarjeta'
                                                }
                                            </td>
                                        </tr>
                                        
                                    ))
                                }
                            </tbody>                            
                        </table> 
                        </>                   
                        ) :
                        (
                            <h5>Esta tarjeta no ha sido recargada ni utilizada.</h5>
                        )
                    }
                    </>) :
                    <></>
                }
        </>
        
    )
};

export default ConsultarTarjeta;