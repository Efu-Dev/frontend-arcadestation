import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CambiarContraseña = () => {

    const [contrasena, setContrasena] = useState('');
    const [contrasenaRepetir, setContrasenaRepetir] = useState('');
    const navigate = useNavigate();

    const cambiarContraseña = (e) => {
        e.preventDefault();
        setContrasena((contrasena) => contrasena.replace(/^\s+/, ""));
        setContrasenaRepetir((contrasena) => contrasena.replace(/^\s+/, ""));
        if(contrasena !== '' && contrasena === contrasenaRepetir){
            axios.create({
                baseURL: 'http://127.0.0.1:8000/usuarios/cambiar/',
                'headers': {
                  'Authorization': localStorage.getItem('access_token_as')
                }
              }).post('', {contrasena}).then((res) => {
                if(res.data.message === 'Success'){
                    alert("Contraseña cambiada exitosamente");
                    navigate('/home');
                }
              }).catch((e) => console.log(e));
        } else{
            alert("Las contraseñas no coinciden");
            setContrasena('');
            setContrasenaRepetir('');
        }
    }

    return (
        <div>
            <h1>Cambiar Contraseña</h1>
            <form onSubmit={(e) => cambiarContraseña(e)}>
                <label>Nueva Contraseña:</label>
                <input type="password" required onChange={(e) => setContrasena(e.target.value.replace(/^\s+/, ""))} />

                <label>Repetir Nueva Contraseña:</label>
                <input type="password" required onChange={(e) => setContrasenaRepetir(e.target.value.replace(/^\s+/, ""))} />

                <button type="submit">Cambiar</button>
            </form>
        </div>
    )
}

export default CambiarContraseña