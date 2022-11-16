import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import download from 'downloadjs';

import '../css/form_clientes_gerente.css';
import img4 from '../Img/logo_ek1.png';

const FormularioClientesCajero = () => {

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direccion, setDireccion] = useState("");
    const [genero, setGenero] = useState('');
    const [editable, setEditable] = useState(true);
    const [sendable, setSendable] = useState(true);

    const navigate = useNavigate();

    const checkCreacion = async (e) => {
        e.preventDefault();

        setNombre((n) => n.trimEnd());
        setDireccion((dir) => dir.trimEnd())

        if (nombre.split(" ").length !== 2) {
            alert("El nombre debe seguir el siguiente formato: Nombre Apellido");
            return;
        }

        let res = undefined;
        await axios.create({
            baseURL: 'https://arcadestation.pythonanywhere.com/api/clientes/',
            'headers': {
                'Authorization': localStorage.getItem('access_token_as')
            }
        }
        ).post('',
            {
                cedula,
                nombre,
                direccion,
                genero
            }).then((r) => {
                res = r;
                console.log(res.data.numero);
                axios.create({
                    baseURL: `https://arcadestation.pythonanywhere.com/reportes/generar/tarjeta/${res.data.numero}`,
                    'headers': {
                        'Authorization': localStorage.getItem('access_token_as')
                    }
                }).get().then((res) => {
                    const content = res.headers['content-type'];
                    download(res.data, 'TARJETA.pdf', content)
                }).catch((e) => console.log(e));
                alert("Cliente creado exitosamente.");
            });

        if (res.data.message === "Success") {
            navigate('/home');
        }

        console.log(res);
    };

    const onChangeCedula = async (e) => {
        setCedula(e.target.value.replace(/\s+/, "").replace(/^0+/, ""));
        setSendable(true);
        let res = undefined;
        await axios.create({
            baseURL: `https://arcadestation.pythonanywhere.com/api/personas/${e.target.value.replace(/\s+/, "").replace(/^0+/, "")}`,
            'headers': {
                'Authorization': localStorage.getItem('access_token_as')
            }
        }
        ).get('',
            {}).then((r) => {
                res = r.data.datos;
            });

        if(res.nombre === undefined && e.target.value.replace(/^\s+/, "") !== ''){
            setNombre('');
            setDireccion('');
            setGenero('');
            setEditable(false);
        }
        else{
            if(e.target.value.replace(/^\s+/, "") !== ''){
                setNombre(res.nombre);
                setDireccion(res.direccion);
                setGenero(res.genero);
                await axios.create({
                    baseURL: `https://arcadestation.pythonanywhere.com/api/clientes/${e.target.value.replace(/\s+/, "").replace(/^0+/, "")}`,
                    'headers': {
                        'Authorization': localStorage.getItem('access_token_as')
                    }
                }
                ).get('',
                    {}).then((r) => {
                        res = r.data.datos;
                    });
                console.log(res);
                if (Object.keys(res).length > 0) {
                    setSendable(false);
                    alert("El cliente ya está registrado en el sistema");
                }
            }
            setEditable(true);
        }
    }

    return (
        <main class="main-container">

            <input type="checkbox" name="" id="check" />
            <input className='input-gerente' type="checkbox" name="" id="check" />
            <div class="div-gerente menu">
                <label for="check">
                    <span class="span-gerente fas fa-times" id="times"></span>
                    <span class="span-gerente far fa-circle-user" id="bars"></span>
                </label>
                <div class="div-gerente head">menú</div> <br /> <br /> <br /> <br />
                <li><a href="#"><i class="fas fa-users"></i> Manual de Ayuda de Usuario</a></li>
                <li><Link to="/cajero/contrasena"><i class="fas fa-gear"></i> Cambiar Contraseña</Link></li>
                <li><Link to="/cajero/maquina"><i class="fas fa-info"></i> Probar Máquina</Link></li>
            </div>

            <div class="div-gerente barra_de_navegacion">
                <div class="div-gerente Crear">
                    <button type="button" class="btn btn-white dropdown-toggle" id="Crear" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true">
                        Crear
                    </button>
                    <div class="div-gerente dropdown-menu">
                        <li><Link to="/cajero/clientes" class="dropdown-item">Crear Cliente</Link></li>
                        <li><Link to="/cajero/transaccion" class="dropdown-item">Crear Recarga</Link></li>
                    </div>
                </div>

                <div class="div-gerente Consultar">
                    <button type="button" class="btn btn-white dropdown-toggle" id="Consultar" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true">
                        Consultar
                    </button>
                    <div class="div-gerente dropdown-menu">

                        <li><Link to="/cajero/tarjeta" class="dropdown-item">Consultar tarjeta</Link></li>
                    </div>
                </div>

                <img src={img4} class="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />


                <form class="div-gerente rectangulo" onSubmit={(e) => checkCreacion(e)}>

                    <div class="div-gerente" id="ingrese_cedula__ek1G">
                        Ingrese Cédula:
                        <input placeholder='Ejemplo: 123456789' onInput={e => e.target.setCustomValidity('')} onInvalid={e => e.target.setCustomValidity('Este campo debe estar lleno y seguir un formato de únicamente dígitos numéricos. Ejemplo: 123456789.')} class="cedula" name="cedula" type="text" maxLength={9} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" required />
                    </div>

                    {editable ? (
                        <>

                            <h1>Agregar Cliente</h1>
                            <div class="div-gerente" id="nombre_ek1G">
                                Nombre y Apellido:

                            <input class="nombre" name="nombre" type="text" maxLength={50} pattern="[a-zA-ZáéíóúÁÉÍÓÚ]+\s[a-zA-ZáéíóúÁÉÍÓÚ]+" value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />
                            </div>

                            <div class="div-gerente" id="direccion_ek1G">
                                Dirección:
                                <textarea class="direccion" name="direccion" type="text" required disabled maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))}  />
                            </div>

                            <div class="div-gerente cuadradoe">
                                    <div class="div-gerente" id="genero">
                                        Género:
                                    </div>
                                    <form method="get" id="sexo" onChange={(e) => setGenero(e.target.value)} disabled>
                                        <input name="intereses" type="radio" value={'H'} defaultChecked={true} checked={genero === 'H' || genero !== 'M'} />H
                                        <input name="intereses" type="radio" value={'M'} checked={genero === 'M'} />M
                                    </form>
                            </div>                         
                        </>
                    ) : (
                        <>
                            <h1>Agregar Cliente</h1>
                            <div class="div-gerente" id="nombre_ek1G">
                                Nombre y Apellido:

                            <input class="nombre" name="nombre" type="text" maxLength={50} pattern="[a-zA-ZáéíóúÁÉÍÓÚ]+\s[a-zA-ZáéíóúÁÉÍÓÚ]+" value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required />
                            </div>

                            <div class="div-gerente" id="direccion_ek1G">
                                Dirección:
                                <textarea class="direccion" name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))}  />
                            </div>

                            <div class="div-gerente cuadradoe">
                                <div class="div-gerente" id="genero">
                                    Género:
                                </div>
                                <form method="get" id="sexo" onChange={(e) => setGenero(e.target.value)} disabled>
                                    <input name="intereses" type="radio" value={'H'} defaultChecked={true} checked={genero === 'H' || genero !== 'M'} />H
                                    <input name="intereses" type="radio" value={'M'} checked={genero === 'M'} />M
                                </form>
                            </div>
                        </>
                    )}

                    {sendable ? (
                        <div class="Crear2">
                            <button class="Crearb" type='submit'> Crear </button>
                        </div>
                    ) : (
                        <div class="Crear2">
                            <button class="Crearb" type='submit' disabled> Crear </button>
                        </div>
                    )}

                </form>
            </div>
        </main>
    );

    return (
        <div>
            <h1>Crear Cliente</h1>
            <form onSubmit={(e) => checkCreacion(e)}>
                {editable ? (<><label htmlFor="cedula">Cédula:</label>
                    <input name="cedula" type="text" maxLength={9} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                    <label htmlFor="nombre">Nombre y Apellido:</label>
                    <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required disabled />

                    <label htmlFor="direccion">Dirección:</label>
                    <input name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} disabled />

                    <label htmlFor="genero">Género (H/M):</label>
                    <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value.replace(/^\s+/, ""))} pattern="[h|m|H|M]" required disabled />
                </>) :
                    (<><label htmlFor="cedula">Cédula:</label>
                        <input name="cedula" type="text" maxLength={9} value={cedula} onChange={(e) => onChangeCedula(e)} pattern="[0-9]+" />

                        <label htmlFor="nombre">Nombre y Apellido:</label>
                        <input name="nombre" type="text" maxLength={40} value={nombre} onChange={(e) => setNombre(e.target.value.replace(/^\s+/, ""))} required />

                        <label htmlFor="direccion">Dirección:</label>
                        <input name="direccion" type="text" required maxLength={40} value={direccion} onChange={(e) => setDireccion(e.target.value.replace(/^\s+/, ""))} />

                        <label htmlFor="genero">Género (H/M):</label>
                        <input name="genero" type="text" maxLength={1} value={genero} onChange={(e) => setGenero(e.target.value.replace(/^\s+/, ""))} pattern="[h|m|H|M]" required />
                    </>)
                }
                {sendable ? (<button type='submit'>Enviar Formulario</button>) : <button type='submit' disabled>Enviar Formulario</button>}
            </form>

        </div>
    );
};

export default FormularioClientesCajero;