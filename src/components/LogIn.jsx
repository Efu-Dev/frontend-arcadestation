import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axios';
import './css/login.css';
import logo from './Img/logo.png';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
      <div class="container">
        <img src={logo} alt="" class="imagen" />

        <form class="box" onSubmit={logIn}>
            <div class="form">
                <h2>LOG IN</h2>
            <div class="inputBox">
                <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                <span>Username</span>
                <i></i>
            </div>
        
            <div class="inputBox">
                <input type="password" required id="pass" onChange={(e) => setPassword(e.target.value)} />
                <span>Password</span>
                <i></i>
            </div>
        
            <div class="links">
                <a href="/control/recuperacion_contrasena">Forgot password?</a>
            </div>

            <input type="checkbox" onClick={myFunction} class="check" /> <p class="passw">show password</p> 
        
            <input type="submit" value="Login"></input>
            </div>
        
           </form>
        </div>  
    )
};

export default LogIn;