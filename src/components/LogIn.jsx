import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axios';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const LogIn = async (e) => {
        e.preventDefault();
        let inicioSesion = false

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
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            inicioSesion = true;
            alert("Ha iniciado sesión exitosamente");
          }
        );

        console.log(a);
        if(localStorage.getItem('access_token') && inicioSesion)
          navigate('/home');
    };

    return (
      <div>
        <h1>LOGIN</h1>
          <form method="post" onSubmit={(e) => LogIn(e)}>
              <input type="text" name="username" id="username" placeholder='usuario' onChange={(e) => setUsername(e.target.value)} />
              <input type="password" name="password" id="password" placeholder='contraseña' onChange={(e) => setPassword(e.target.value)} />
              <input type="submit" value="submit" />
          </form>
      </div>
    )
}

export default LogIn