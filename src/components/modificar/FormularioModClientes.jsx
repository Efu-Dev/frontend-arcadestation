import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioModClientes = () => {

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direccion, setDireccion] = useState("");
    const [genero, setGenero] = useState('');
    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        setNombre((n) => n.trimEnd());
        setDireccion((dir) => dir.trimEnd())

        if(nombre.split(" ").length !== 2){
            alert("El nombre debe seguir el siguiente formato: Nombre Apellido");
            return;
        }

        let res = undefined;
        await axios.create({
            baseURL: `http://127.0.0.1:8000/api/clientes/${cedula}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('').then((r) => {
            res = r;            
        });
        console.log(res);

        if(res.data.datos.cedula)
            await axios.create({
                baseURL: `http://127.0.0.1:8000/api/personas/${cedula}`,
                'headers': {
                'Authorization': localStorage.getItem('access_token_as')
                }
            }
            ).put('',
            {
                cedula,
                nombre,
                direccion,
                genero
            }).then((r) => {
                res = r;            
            });

        if(res.data.message === "Success"){
            alert("Cliente modificado exitosamente");
            navigate('/home');
        } else{
            alert("Datos inválidos. Verifique que todos los campos estén llenos.");
        }

        console.log(res);
    };

    const onChangeCedula = async (e) => {
        setCedula(e.target.value.replace(/^\s+/, ""));
        let res = undefined;
        await axios.create({
            baseURL: `http://127.0.0.1:8000/api/clientes/${e.target.value.replace(/^\s+/, "")}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        });

        if(res.cedula === undefined && e.target.value.replace(/^\s+/, "") !== ''){
            setNombre('');
            setDireccion('');
            setGenero('');
            setEditable(true);
        }
        else{
            await axios.create({
                baseURL: `http://127.0.0.1:8000/api/personas/${e.target.value.replace(/^\s+/, "")}`,
                'headers': {
                  'Authorization': localStorage.getItem('access_token_as')
                }
              }
            ).get('',
            {}).then((r) => {
                res = r.data.datos;
            });
            console.log(res)    
            setNombre(res.nombre);
            setDireccion(res.direccion);
            setGenero(res.genero);
            setEditable(false); 
        }
    }

    return (
        <div>
            <h1>Crear Cliente</h1>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre y Apellido:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} disabled />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value.replace(/^\s+/, ""))} pattern="[h|m|H|M]" required disabled />
                </>) :
                (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre y Apellido:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value.replace(/^\s+/, ""))} pattern="[h|m|H|M]" required />
                </>)
                }
                {sendable ? (<button type='submit'>Enviar Formulario</button>) : <button type='submit' disabled>Enviar Formulario</button>}
            </form>
        </div>
    );
};

export default FormularioModClientes;