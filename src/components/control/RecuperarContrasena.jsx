import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {axiosInstance} from '../../axios.js';

const RecuperarContrasena = () => {

  const [cedula, setCedula] = useState('');
  const navigate = useNavigate();

  const enviarPeticion = async (e) => {
    e.preventDefault();
    let salir = false;

    await axiosInstance.get(`api/empleados/${cedula}`, {}).then((res) => {
      console.log(res)
      if(res.data.message !== 'Success'){
        alert("No hay empleados registrados con esta cédula.");
        salir = true;
      }
    });

    if(salir)
      return;

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