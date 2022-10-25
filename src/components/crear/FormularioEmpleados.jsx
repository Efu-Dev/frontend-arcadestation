import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioEmpleados = () => {

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direccion, setDireccion] = useState("");
    const [genero, setGenero] = useState('');
    const [cargo, setCargo] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();
        let res = undefined;
        await axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/empleados/',
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).post('',
        {
            cedula,
            nombre,
            direccion,
            genero,
            cargo,
            telefono,
            email
        }).then((r) => {
            res = r;
            alert("Empleado creado exitosamente");
        }).catch((e) => {
            alert("Ocurrió un error.");
        });

        if(res.data.message === "Success"){
            navigate('/home');
        }

        console.log(res);
    };

    const onChangeCedula = async (e) => {
        setCedula(e.target.value);
        setSendable(true);
        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/personas/${e.target.value}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        }).catch((e) => {
            alert("Ocurrió un error.");
        });

        if(res.nombre === undefined && e.target.value !== ''){
            setNombre('');
            setDireccion('');
            setGenero('');
            setEmail('');
            setTelefono('');
            setCargo('');
            setEditable(false);
        }
        else{
            if(e.target.value !== ''){
                setNombre(res.nombre);
                setDireccion(res.direccion);
                setGenero(res.genero);
                await axios.create({
                    baseURL: `https://arcadestation.pythonanywhere.com/api/empleados/${e.target.value}`,
                    'headers': {
                      'Authorization': localStorage.getItem('access_token_as')
                    }
                  }
                ).get('',
                {}).then((r) => {
                    res = r.data.datos;
                });
                console.log(res);
                if(Object.keys(res).length !== 0){
                    setSendable(false);
                    alert("El empleado ya está registrado en el sistema");
                    setEmail(res.email);
                    setTelefono(res.telefono);
                    setCargo(res.cargo);
                }
            }
            setEditable(true); 
        }
    }

    return (
        <div>
            <h1>Crear Empleado</h1>
            <p>Editable {(<span>{editable ? "True" : "False"}</span>)}</p>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value)} required disabled />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value)} disabled />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value)} pattern="[h|m|H|M]" required disabled />
                
                {sendable ? (<>
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input name="telefono" type="tel" maxLength={320} value={telefono} onChange={(e) => setTelefono(e.target.value)} required />

                    <label htmlFor="cargo" disabled>Cargo:</label>
                    <select name="cargo" onChange={(e) => setCargo(e.target.value)} value={cargo} id="cargo" required>
                        <option value="Gerente">-----------</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Cajero">Cajero</option>
                    </select>                
                </>) : (<>
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="text" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} required disabled />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input name="telefono" type="tel" maxLength={320} value={telefono} onChange={(e) => setTelefono(e.target.value)} required disabled />

                    <label htmlFor="cargo" disabled>Cargo:</label>
                    <select name="cargo" onChange={(e) => setCargo(e.target.value)} value={cargo} id="cargo" required disabled>
                        <option value="">-----------</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Cajero">Cajero</option>
                    </select>              
                </>)}
                
                </>) :
                (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value)} />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value)} pattern="[h|m|H|M]" required />
                
                {sendable ? (<>
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="text" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input name="telefono" type="tel" maxLength={320} value={telefono} onChange={(e) => setTelefono(e.target.value)} required />

                    <label htmlFor="cargo" disabled>Cargo:</label>
                    <select name="cargo" onChange={(e) => setCargo(e.target.value)} value={cargo} id="cargo" required>
                        <option value="Gerente">-----------</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Cajero">Cajero</option>
                    </select>                
                </>) : (<>
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="text" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} required disabled />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input name="telefono" type="tel" maxLength={320} value={telefono} onChange={(e) => setTelefono(e.target.value)} required disabled />

                    <label htmlFor="cargo" disabled>Cargo:</label>
                    <select name="cargo" onChange={(e) => setCargo(e.target.value)} value={cargo} id="cargo" required disabled>
                        <option value="Gerente">-----------</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Cajero">Cajero</option>
                    </select>              
                </>)}                
                </>)
                }
                {sendable ? (<button type='submit'>Enviar Formulario</button>) : <button type='submit' disabled>Enviar Formulario</button>}
            </form>
        </div>
    );
};

export default FormularioEmpleados;