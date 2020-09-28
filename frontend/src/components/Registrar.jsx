import React, { useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'

export default function Registrar() {

    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [nombre, setNombre] = useState('')

    const registro = async (e) => {
        e.preventDefault()
        const usuario = { correo, contrasena, nombre }
        const respuesta = await Axios.post('http://localhost:4000/usuarios/crearCuenta', usuario)
        const mensaje = respuesta.data.mensaje
        if (mensaje !== 'Bienvenido') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensaje,

            })
        } else {

            const token = respuesta.data.token
            const nombre = respuesta.data.nombre
            const idUsuario = respuesta.data.id
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('nombre', nombre)
            sessionStorage.setItem('idUsuario', idUsuario)
            window.location.href = "/galeria"

        }

    }

    return (
        <div className="container-lg">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card bg-dark text-white mt-5">
                        <div className="container-lg text-center fa-6x">
                            <i className="fas fa-user-plus"></i>
                        </div>
                        <div className="card-header text-center">
                            <h4>Crear Cuenta</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={registro} >
                                <div className="form-group">
                                    <h3> Nombre </h3>
                                    <input type="text" className="form-control" autoFocus required onChange={e => setNombre(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Correo </h3>
                                    <input type="email" className="form-control" required onChange={e => setCorreo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Contraseña </h3>
                                    <input type="password" className="form-control" required onChange={e => setContrasena(e.target.value)} />
                                </div>
                                <input type="submit" className="btn btn-dark btn-block" value="Crear" />
                                <Link className="btn btn-primary btn-sm btn-block" to="/">¿YA tienes Cuenta?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}