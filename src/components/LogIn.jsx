import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axios';
import './css/login.css';
import logo from './Img/logo.png';
import otro from './Img/SwitchControl.png';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if(localStorage.getItem('access_token_as'))
        navigate('/home');
    });    

    const LogIn = async () => {
        let inicioSesion = false;

        const a = await axiosInstance.post('usuarios/jwt/create/', {
          username,
          password
        }).then(
          (res) => {
            if(res.data.error){
              alert(res.data.error);
              window.location.reload();
              null.x = 0;     
            }
            localStorage.setItem('access_token_as', res.data.access);
            localStorage.setItem('refresh_token_as', res.data.refresh);
            inicioSesion = true;
            alert("Ha iniciado sesión exitosamente");
          }
        );

        console.log(a);
        if(localStorage.getItem('access_token_as') && inicioSesion)
          navigate('/home');
    };

    return (
      <main className="main-container">
			<div className="rows">
				<div className="cols-1">
					<div className="p-absolute">
						<img src={otro} id='logo-switch' alt="Switch" /><br/>
					</div>
					<img src={logo} id="logo"  alt="logo"/>
				</div>
				<div className="cols-2">			
					<div className="login">
						<div className="Username">
							<h1>Username</h1>
							<input type="text" className="login-form" onChange={(e) => setUsername(e.target.value)} /> 
						</div>
						<div className="Password">
							<h1>Password</h1>
							<input type="password" className="login-form" onChange={(e) => setPassword(e.target.value)} />
						</div>
						<button className="boton" onClick={LogIn}>LOG IN</button> 
					</div>
				</div>
			</div>
		</main>      
    )
}

export default LogIn