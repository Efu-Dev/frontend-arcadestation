import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../axios';
import styles from './css/LogIn.module.css';
import logo from './Img/logo.png';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    console.log(styles);

    useEffect(() => {
      if(localStorage.getItem('access_token_as'))
        navigate('/home');
    });

    function myFunction() {
      var x = document.getElementById("pass");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }

    const logIn = async (e) => {
        e.preventDefault();
        let inicioSesion = false;

        setUsername((p) => p.trimEnd());

        const a = await axiosInstance.post('usuarios/jwt/create/', {
          username,
          password
        }).then(
          (res) => {
            if(res.data.error){
              alert(res.data.error);
              return;   
            }
            localStorage.setItem('access_token_as', res.data.access);
            localStorage.setItem('refresh_token_as', res.data.refresh);
            inicioSesion = true;
          }
        );

        console.log(a);
        if(localStorage.getItem('access_token_as') && inicioSesion)
          navigate('/home');
    };

    return (
      <div className={styles.container}>
        <img src={logo} alt="" className={styles.imagen} />

        <form className={`${styles.box} ${styles.formulario}`} onSubmit={logIn}>
            <div className={styles.form}>
                <h2>INICIAR SESIÓN</h2>
            <div className={styles.inputBox}>
                <input type="text" required onChange={(e) => setUsername(e.target.value.trim())} />
                <span>Usuario</span>
                <i></i>
            </div>
        
            <div className={styles.inputBox}>
                <input type="password" required id="pass" onChange={(e) => setPassword(e.target.value)} />
                <span>Contraseña</span>
                <i></i>
            </div>
        
            <div className={styles.links}>
                <Link to="/control/recuperacion_contrasena" style={{zIndex: 2}}>¿Olvidó su contraseña?</Link>
            </div>

            <input type="checkbox" onClick={myFunction} className={styles.check} /> <p className={`${styles.ver}`}>ver contraseña</p> 
        
            <input className='mt-4' type="submit" value="Entrar" ></input>
            </div>
        
           </form>
        </div>  
    )
};

export default LogIn;