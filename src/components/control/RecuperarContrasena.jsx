import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {axiosInstance} from '../../axios.js';
import styles from '../css/LogIn.module.css';
import logo from '../Img/logo.png';

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
    <div class={styles.container}>
        <img src={logo} alt="" class={styles.imagen} />

        <div class={styles.box}>
            <form class={styles.form} onSubmit={(e) => enviarPeticion(e)}>
              <h2>¿OLVIDÓ CONTRASEÑA?</h2>
              <i className='text-center'>Por favor introduzca su cédula. Recibirá un correo con su nueva contraseña.</i>
              <div class={styles.inputBox}>
                  <input onInput={e => {e.target.setCustomValidity('')}} onInvalid={e => e.target.setCustomValidity('Este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} type="text" required onChange={(e) => setCedula(e.target.value.replace(/^\s+/, "").replace(/^\0+/, ""))} name="cedula" placeholder='Ingrese su cédula' pattern='\d+' maxLength={9} />
                  <span>Cédula</span>
                  <i></i>
              </div>
        
            <input className='mt-5' type="submit" value="Send"  />
            </form>
        
           </div>
    </div>
  );
}

export default RecuperarContrasena;