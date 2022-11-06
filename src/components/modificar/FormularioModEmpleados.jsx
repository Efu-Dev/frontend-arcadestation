import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioModEmpleados = () => {

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direccion, setDireccion] = useState("");
    const [genero, setGenero] = useState('');
    const [cargo, setCargo] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [activo, setActivo] = useState(true);

    const [editable, setEditable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();

        setNombre((n) => n.trimEnd());
        setDireccion((dir) => dir.trimEnd())
        setEmail((e) => e.trimEnd());
        setTelefono((e) => e.trimEnd());
        
        if(nombre.split(" ").length !== 2){
            alert("El nombre debe seguir el siguiente formato: Nombre Apellido");
            return;
        }

        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/empleados/${cedula}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).put('',
        {
            cedula,
            nombre,
            direccion,
            genero,
            cargo,
            telefono,
            email,
            activo: activo ? 'S' : 'N'
        }).then((r) => {
            res = r;
        });

        if(res.data.message === "Success"){
            alert("Empleado creado exitosamente");
            navigate('/home');
        } else{
            alert("Ocurrió un error al modificar. Verifique que los campos del formulario sean correctos.");
        }

        console.log(res);
    };

    const onChangeCedula = async (e) => {
        setCedula(e.target.value.replace(/^\s+/, ""));
        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/empleados/${e.target.value.replace(/^\s+/, "")}`,
            'headers': {
              'Authorization': localStorage.getItem('access_token_as')
            }
          }
        ).get('',
        {}).then((r) => {
            res = r.data.datos;
        });

        if(res.cedula === undefined && e.target.value.replace(/^\s+/, "") !== ''){
            setNombre('');
            setDireccion('');
            setGenero('');
            setEmail('');
            setTelefono('');
            setCargo('');
            setEditable(true);
        }
        else{
            let res2 = undefined;
            await axios.create({
                baseURL: `https://arcadestation.pythonanywhere.com/api/personas/${e.target.value.replace(/^\s+/, "")}`,
                'headers': {
                  'Authorization': localStorage.getItem('access_token_as')
                }
              }
            ).get('',
            {}).then((r) => {
                res2 = r.data.datos;
            });

            setNombre(res2.nombre);
            setDireccion(res2.direccion);
            setGenero(res2.genero);
            setEmail(res.email);
            setTelefono(res.telefono);
            setCargo(res.cargo);
            setActivo(res.activo === 'S' ? true : false);
            setEditable(false);     
        }            
    }

    return (
        <div>
            <h1>Crear Empleado</h1>
            <p>Editable {(<span>{editable ? "True" : "False"}</span>)}</p>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<><label htmlFor="cedula">Cédula:</label>
                <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                <label htmlFor="nombre">Nombre y Apellido:</label>
                <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />

                <label htmlFor="direccion">Dirección:</label>
                <input name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} disabled />

                <label htmlFor="genero">Género (H/M):</label>
                <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value.replace(/^\s+/, ""))} pattern="[h|m|H|M]" required disabled />
                
                <label htmlFor="email">Email:</label>
                <input name="email" type="email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value.replace(/^\s+/, ""))} required disabled />

                <label htmlFor="telefono">Teléfono:</label>
                <input name="telefono" type="tel" maxLength={320} value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/^\s+/, ""))} required disabled />

                <label htmlFor="cargo" disabled>Cargo:</label>
                <select name="cargo" onChange={(e) => setCargo(e.target.value.replace(/^\s+/, ""))} value={cargo} id="cargo" required disabled>
                    <option value="Gerente">-----------</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Cajero">Cajero</option>
                </select>

                <label htmlFor="activo">Activo:</label>
                <input type="checkbox" name="activo" id="activo" disabled />
                </>) : (<>
                    <label htmlFor="cedula">Cédula:</label>
                    <input name="cedula" type="text" maxLength={8} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                    <label htmlFor="nombre">Nombre y Apellido:</label>
                    <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required  />

                    <label htmlFor="direccion">Dirección:</label>
                    <input name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))}  />

                    <label htmlFor="genero">Género (H/M):</label>
                    <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value.replace(/^\s+/, ""))} pattern="[h|m|H|M]" required  />
                    
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="text" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value.replace(/^\s+/, ""))} required  />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input name="telefono" type="tel" maxLength={320} value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/^\s+/, ""))} required  />

                    <label htmlFor="cargo" >Cargo:</label>
                    <select name="cargo" onChange={(e) => setCargo(e.target.value.replace(/^\s+/, ""))} value={cargo} id="cargo" required >
                        <option value="">-----------</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Cajero">Cajero</option>
                    </select>

                    <label htmlFor="activo">Activo:</label>
                    <input type="checkbox" name="activo" id="activo" checked={activo} onClick={(e) => setActivo(e.target.checked)} />           
                </>)}
                <button type='submit'>Enviar Formulario</button>
            </form>
        </div>
    );
};

export default FormularioModEmpleados;