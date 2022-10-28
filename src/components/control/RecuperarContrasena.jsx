import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {axiosInstance} from '../../axios.js';

const RecuperarContrasena = () => {

  const [cedula, setCedula] = useState('');
  const navigate = useNavigate();

  const enviarPeticion = async (e) => {
    e.preventDefault();

    await axiosInstance.post('usuarios/recuperar/', {
        cedula
      }).then(
        (res) => {
          if(res.data.error){
            alert(res.data.error);
            window.location.reload();
            null.x = 0;     
          }
          localStorage.removeItem('access_token_as');
          navigate('/');
        }
      );
    };

  return (
    <form onSubmit={(e) => enviarPeticion(e)}>
      <h1>Cambiar Contraseña</h1>
      <input onChange={(e) => setCedula(e.target.value.replace(/^\s+/, ""))} type="text" name="cedula" placeholder='Ingrese su cédula' pattern='\d+' maxLength={8} />
      <button type="submit">Recuperar Contraseña</button>
    </form>
  )
}

export default RecuperarContrasena;