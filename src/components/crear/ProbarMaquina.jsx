import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ProbarMaquina = () => {

    const [maquinas, setMaquinas] = useState(false);
    const [maquina, setMaquina] = useState(false);
    const [tarjeta, setTarjeta] = useState('');
    const [puntaje, setPuntaje] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/maquinas/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            if(res.data.message === 'Success'){
                setMaquinas(res.data.datos);
                setMaquina(res.data.datos[0])
            }
            else
              alert(res.data.message);
          }).catch((e) => console.log(e));
    }, []);

    const probarMaquina = async (e) => {
        e.preventDefault();
        alert("EMPEZANDO...")
        let continuar = false;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/tarjetas/${tarjeta}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((res) => {
            if(res.data.message === 'Success')
                continuar = true;
            else
                alert(res.data.message);
            
            console.log("A");
        }).catch((e) => {return;});
        
        if(!continuar)
            return;

        console.log(continuar);

        await axios.create({
            'baseURL': `https://arcadestation.pythonanywhere.com/api/registro/actividad/${maquina.codigo}`,
            'headers': {
                'Authorization': localStorage.getItem('access_token_as')
            }
        }).post('', {
            tarjeta,
            puntaje,
        }).then((res) => {
            if(res.data.message === 'Success'){
                alert("Actividad registrada exitosamente.");
                navigate('/home')
            }else{
                alert(res.data.message);
            }          
        }).catch((e) => console.log(e));
    };

    const changeMaquina = async (e) => {
        let res = undefined;
        console.log(e);
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/maquinas/${e}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }).get().then((r) => {
            if(r.data.message === 'Success')
              setMaquina(r.data.datos);
            else
              alert(res.data.message);
          }).catch((e) => console.log(e));    
    };

    if(!maquinas)
        return (<h2>Cargando...</h2>)

    else
        return (<div>
            <h1>Probar Máquina</h1>
            <form onSubmit={e => probarMaquina(e)}>
                <label htmlFor="maquina">Máquina:</label>
                <select name="maquina" id="maquina" onChange={e => changeMaquina(e.target.value)} value={maquina.codigo}>
                    {
                        maquinas.filter((i) => i.activa === 'S').map((i) => (
                            <option value={i.codigo}>{i.nombre}</option>
                        ))
                    }
                </select>

                <label htmlFor="tarjeta">Precio:</label>
                <input name='precio' type="number" value={maquina.precio} disabled />

                <label htmlFor="tarjeta">Tarjeta:</label>
                <input type="text" pattern='\d+' onChange={e => setTarjeta(e.target.value.trimStart())} required />

                <label htmlFor="tarjeta">Puntaje:</label>
                <input name='puntaje' type="number" onChange={e => setPuntaje(e.target.value.trim())} value={puntaje} required />

                <button type="submit">Probar Máquina</button>
            </form>
            
        </div>)
}

export default ProbarMaquina;