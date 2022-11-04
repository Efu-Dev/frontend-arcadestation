import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioClientes = () => {

    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [precio, setPrecio] = useState("");
    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        let res = undefined;
        await axios.create({
            baseURL: 'http://127.0.0.1:8000/api/maquinas/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).post('',
        {
            codigo,
            nombre,
            precio
        }).then((r) => {
            res = r;
            alert("Máquina creada exitosamente");
        });

        if(res.data.message === "Success"){
            navigate('/home');
        }

        console.log(res);
    };

    const onChangeCodigo = async(e) => {
        setCodigo(e.target.value.replace(/^\s+/, ""));
        setSendable(true);
        let res = undefined;
        await axios.create({
            baseURL: `http://127.0.0.1:8000/api/maquinas/${e.target.value.replace(/^\s+/, "")}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        });

        if((res === undefined || res.codigo === undefined) && e.target.value.replace(/^\s+/, "") !== ''){ // Máquina no existe
            setEditable(false);
            setNombre('');
            setPrecio('');        
        }
        else if(e.target.value.replace(/^\s+/, "") === ''){
            setEditable(true);
            setNombre('');
            setPrecio('');
        }
        else{
            alert('La máquina ya está registrada');
            setNombre(res.nombre);
            setPrecio(res.precio);
            setEditable(true);
            setSendable(false);
        }
    }

    return (
        <div>
            <h1>Crear Máquina</h1>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<><label htmlFor="codigo">Código:</label>
                <input name="codigo" type="text" maxLength={8} value={codigo} onChange={(e) => onChangeCodigo(e)} pattern="[0-9]+" required />

                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />

                <label htmlFor="precio">Precio:</label>
                <input name="precio" type="number" min={0.01} max={99.99} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value.replace(/^\s+/, ""))} required disabled />

                 </>) :
                (<><label htmlFor="codigo">Código:</label>
                <input name="codigo" type="text" maxLength={8} value={codigo} onChange={(e) => onChangeCodigo(e)} pattern="[0-9]+" required />

                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required />

                <label htmlFor="precio">Precio:</label>
                <input name="precio" type="number" min={0.01} max={99.99} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value.replace(/^\s+/, ""))} required />
                </>)
                }
                {sendable ? (<button type='submit'>Enviar Formulario</button>) : <button type='submit' disabled>Enviar Formulario</button>}
            </form>
        </div>
    );
};

export default FormularioClientes;