import React, {useState} from 'react';
import axios from 'axios';
import download from 'downloadjs';

const ConsultarTarjeta = () => {

    const [datos, setDatos] = useState({});
    const [cedula, setCedula] = useState('');
    const [datosActuales, setDatosActuales] = useState([]);

    const mostrarTarjeta = async (e) => {
        e.preventDefault();
        let res = undefined;
        await axios.create({
            baseURL: `http://127.0.0.1:8000/api/tarjetas/${cedula}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token')
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
        setCedula(nuevo);
        setDatosActuales([]);
    };

    const reporteTransacciones = () => {
        axios.create({
          baseURL: `http://127.0.0.1:8000/reportes/generar/transacciones/${datosActuales[0].numero}`,
          'headers': {
            'Authorization': localStorage.getItem('access_token')
          }
        }).get().then((res) => {
          const content = res.headers['content-type'];
          download(res.data, 'REPORTE_TRANSACCIONES_ARCADESTATION.pdf', content)
        }).catch((e) => console.log(e));
    };

    return (
        <>
            <h1>Consultar Tarjeta</h1>
            <form onSubmit={(e) => mostrarTarjeta(e)}>
                <label>Número:</label>
                <input type="text" pattern='[0-9]+' onChange={(e) => onChangeNumero(e.target.value.trim())} required />
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
                            <td style={{border: 'solid 1px black'}}>{`${new Date(tarjeta.fecha_entrada).getDate()}/${new Date(tarjeta.fecha_entrada).getMonth()+1}/${new Date(tarjeta.fecha_entrada).getFullYear()} 
                            ${new Date(tarjeta.fecha_entrada).getHours()}:${new Date(tarjeta.fecha_entrada).getMinutes()}`}</td>
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
                            <a href='#' onClick={reporteTransacciones}>Imprimir Reporte de Transacciones</a>
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
                                            <td>{reg.referencia}</td>
                                            <td>{reg.descripcion}</td>
                                            <td>{reg.resultado === '' ? 'Aprobada' : 'Denegada'}</td>
                                            <td>
                                                {
                                                    reg.tipo_pago_id === 1 ? 'Tarjeta de Débito' :
                                                    reg.tipo_pago_id === 2 ? 'Pago Móvil' :
                                                    reg.tipo_pago_id === 3 ? 'Tarjeta de Crédito' :
                                                    'Transferencia'
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