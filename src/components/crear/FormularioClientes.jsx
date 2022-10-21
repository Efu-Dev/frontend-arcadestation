import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioClientes = () => {

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direccion, setDireccion] = useState("");
    const [genero, setGenero] = useState('');
    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        console.log("a");
        let res = undefined;
        await axios.create({
            baseURL: 'http://127.0.0.1:8000/api/clientes/',
            'headers': {
              'Authorization': localStorage.getItem('access_token')
            }
          }
        ).post('',
        {
            cedula,
            nombre,
            direccion,
            genero
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

    const onChangeCedula = async (e) => {
        setCedula(e.target.value);
        setSendable(true);
        let res = undefined;
        await axios.create({
            baseURL: `http://127.0.0.1:8000/api/personas/${e.target.value}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        }).catch((e) => {
            alert("Ocurrió un error.");
        });

        if(res.nombre === undefined && e.target.value !== ''){
            setNombre('');
            setDireccion('');
            setGenero('');
            setEditable(false);
        }
        else{
            if(e.target.value !== ''){
                setNombre(res.nombre);
                setDireccion(res.direccion);
                setGenero(res.genero);
                await axios.create({
                    baseURL: `http://127.0.0.1:8000/api/clientes/${e.target.value}`,
                    'headers': {
                      'Authorization': localStorage.getItem('access_token')
                    }
                  }
                ).get('',
                {}).then((r) => {
                    res = r.data.datos;
                });
                console.log(res);
                if(Object.keys(res).length > 0){
                    setSendable(false);
                    alert("El cliente ya está registrado en el sistema");
                }
            }
            setEditable(true); 
        }
    }

    return (
        <div>
            <h1>Crear Cliente</h1>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value)} required disabled />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value)} disabled />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value)} pattern="[h|m|H|M]" required disabled />
                </>) :
                (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value)} />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value)} pattern="[h|m|H|M]" required />
                </>)
                }
                {sendable ? (<button type='submit'>Enviar Formulario</button>) : <button type='submit' disabled>Enviar Formulario</button>}
            </form>
        </div>
    );
};

export default FormularioClientes;