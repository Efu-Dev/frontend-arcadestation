import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioModClientes = () => {

    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [precio, setPrecio] = useState("");
    const [activo, setActivo] = useState(false);
    const [editable, setEditable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        let res = undefined;
        await axios.create({
            baseURL: `http://127.0.0.1:8000/api/maquinas/${codigo}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).put('',
        {
            codigo,
            nombre,
            precio,
            activa: activo ? 'S' : 'N'
        }).then((r) => {
            res = r;
        }).catch((e) => {
            alert("Ocurrió un error.");
        });

        if(res.data.message === "Success"){
            alert("Máquina editada exitosamente");
            navigate('/home');
        } else{
            alert('La máquina no existe.');
        }

        console.log(res);
    };

    const onChangeCodigo = async(e) => {
        setCodigo(e.target.value);
        let res = undefined;
        await axios.create({
            baseURL: `http://127.0.0.1:8000/api/maquinas/${e.target.value}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        });

        if(res.codigo === undefined && e.target.value !== ''){ // Máquina no existe
            setEditable(true);  
            setNombre('');
            setPrecio('');          
        }
        else if(e.target.value === ''){
            setEditable(true);
            setNombre('');
            setPrecio('');
        }
        else{
            setNombre(res.nombre);
            setPrecio(res.precio);
            console.log(res.activa);
            setActivo(res.activa === 'S' ? true : false);
            setEditable(false);
        }
    }

    return (
        <div>
            <h1>Crear Máquina</h1>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<><label htmlFor="codigo">Código:</label>
                <input name="codigo" type="text" maxLength={8} value={codigo} onChange={(e) => onChangeCodigo(e)} pattern="[0-9]+" required />

                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value)} required disabled />

                <label htmlFor="precio">Precio:</label>
                <input name="precio" type="number" min={0.01} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value)} required disabled />

                <label htmlFor="activo">Activo:</label>
                <input type="checkbox" name="activa" id="activa" onChange={(e) => setActivo(e.target.checked ? 'S' : 'N')} disabled />
                 </>) :
                (<><label htmlFor="codigo">Código:</label>
                <input name="codigo" type="text" maxLength={8} value={codigo} onChange={(e) => onChangeCodigo(e)} pattern="[0-9]+" required />

                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                <label htmlFor="precio">Precio:</label>
                <input name="precio" type="number" min={0.01} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                
                <label htmlFor="activo">Activo:</label>
                <input type="checkbox" checked={activo} name="activa" id="activa" onClick={(e) => {setActivo(!activo)}} />
                </>)
                }
                <button type='submit'>Enviar Formulario</button>
            </form>
        </div>
    );
};

export default FormularioModClientes;