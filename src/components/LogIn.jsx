import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
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

        <form className={styles.box} onSubmit={logIn}>
            <div className={styles.form}>
                <h2>LOG IN</h2>
            <div className={styles.inputBox}>
                <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                <span>Username</span>
                <i></i>
            </div>
        
            <div className={styles.inputBox}>
                <input type="password" required id="pass" onChange={(e) => setPassword(e.target.value)} />
                <span>Password</span>
                <i></i>
            </div>
        
            <div className={styles.links}>
                <a href="/control/recuperacion_contrasena">Forgot password?</a>
            </div>

            <input type="checkbox" onClick={myFunction} className={styles.check} /> <p className="passw">show password</p> 
        
            <input type="submit" value="Login"></input>
            </div>
        
           </form>
        </div>  
    )
};

export default LogIn;