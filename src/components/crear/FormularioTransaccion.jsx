import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioClientes = () => {

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
            baseURL: 'http://127.0.0.1:8000/api/registro/transaccion/',
            'headers': {
              'Authorization': localStorage.getItem('access_token')
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
            alert("Cliente creado exitosamente");
        }).catch((e) => {
            alert("Ocurrió un error.");
        });

        if(res.data.message === "Success"){
            navigate('/home');
        }

        console.log(res);
    };

    const onChangeTarjeta = async(e) => {
        setTarjeta(e);
        let res = "";
        await axios.create({
            baseURL: `http://127.0.0.1:8000/api/tarjetas/${e}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token')
            }
          }
        ).get('').then((r) => {
            res = r;
        });

        console.log(res.data);
        if(res.data.message !== '404' && e !== ''){
            setEditable(false);
        }
        else{
            setEditable(true);
        }
    }

    return (
        <div>
            <h1>Registrar Transacción</h1>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<>
                <label htmlFor="tarjeta">Tarjeta:</label>
                <input name="tarjeta" type="text" maxLength={13} value={tarjeta} onChange={(e) => onChangeTarjeta(e.target.value)} required />
                
                <label htmlFor="monto">Monto:</label>
                <input name="monto" type="number" step={0.01} min={0.01} value={monto} onChange={(e) => setMonto(e.target.value)} required disabled />

                <label htmlFor="descripcion">Descripción:</label>
                <input name="descripcion" type="text" maxLength={40} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required disabled />

                <label htmlFor="referencia">Referencia:</label>
                <input name="referencia" type="text" value={referencia} onChange={(e) => setReferencia(e.target.value)} pattern="\d+" required disabled />

                <label htmlFor="tipoPago">Tipo de Pago:</label>
                <select name="tipoPago" id="tipoPago" disabled="disabled">
                    <option value="1">Tarjeta de Débito</option>
                    <option value="2">Pago Móvil</option>
                    <option value="3">Tarjeta de Crédito</option>
                    <option value="4">Transferencia</option>
                </select>
                </>) :
                (<>
                <label htmlFor="tarjeta">Tarjeta:</label>
                <input name="tarjeta" type="text" maxLength={13} value={tarjeta} onChange={(e) => onChangeTarjeta(e.target.value)} pattern="\d+" required />
                
                <label htmlFor="monto">Monto:</label>
                <input name="monto" type="number" step={0.01} min={0.01} value={monto} onChange={(e) => setMonto(e.target.value)} required />

                <label htmlFor="descripcion">Descripción:</label>
                <input name="descripcion" type="text" maxLength={40} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

                <label htmlFor="referencia">Referencia:</label>
                <input name="referencia" type="text" value={referencia} onChange={(e) => setReferencia(e.target.value)} pattern="\d+" required />
                
                <label htmlFor="tipoPago">Tipo de Pago:</label>
                <select name="tipoPago" id="tipoPago" onSelect={(e) => setTipoPago(e.target.value)}>
                    <option value="1">Tarjeta de Débito</option>
                    <option value="2">Pago Móvil</option>
                    <option value="3">Tarjeta de Crédito</option>
                    <option value="4">Transferencia</option>
                </select>
                </>)
                }
                <button type='submit'>Enviar Formulario</button>
            </form>
        </div>
    );
};

export default FormularioClientes;