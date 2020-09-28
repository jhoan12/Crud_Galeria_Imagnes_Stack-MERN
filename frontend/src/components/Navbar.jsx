import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Navbar() {

    const [menu, setMenu] = useState(false)
    const [eliminarGalerias, setEliminarGalerias] = useState([])
    const [eliminarArticulos, setEliminarArticulos] = useState([])
    const [eliminarIconos, setEliminarIconos] = useState([])


    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setMenu(true)
        }
        obtenerDatos()
    }, [])


    const salir = () => {
        sessionStorage.clear()
        window.location.href = "/"
    }
    const obtenerDatos = async () => {
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const respuestaGaleria = await Axios.get('http://localhost:4000/galeria/galeriaUsuario/' + id, {
            headers: { 'autorizacion': token }
        })
        
        setEliminarGalerias(respuestaGaleria.data)

        const respuestaArticulos = await Axios.get('http://localhost:4000/articulo/articulosUsuario/' + id, {
            headers: { 'autorizacion': token }
        })
        
        setEliminarArticulos(respuestaArticulos.data)
        const respuestaIconos = await Axios.get('http://localhost:4000/iconos/obtenerIconosUsuario/' + id, {
            headers: { 'autorizacion': token }
        })
        
        setEliminarIconos(respuestaIconos.data)
    }

    const eliminar = async () => {
        let G = 0
        while (G < eliminarGalerias.length) {
            const token = sessionStorage.getItem('token')
            const id = eliminarGalerias[G]._id
             await Axios.delete('http://localhost:4000/galeria/eliminarImagen/' + id, {
                headers: { 'autorizacion': token }
            })
            G++
        }

        let A = 0
        while (A < eliminarArticulos.length) {
            const token = sessionStorage.getItem('token')
            const id = eliminarArticulos[A]._id
             await Axios.delete('http://localhost:4000/articulo/eliminarArticulo/' + id, {
                headers: { 'autorizacion': token }
            })
            A++
        }

        let I = 0
        while (I < eliminarIconos.length) {
            const token = sessionStorage.getItem('token')
            const id = eliminarIconos[I]._id
             await Axios.delete('http://localhost:4000/iconos/eliminarIcono/' + id, {
                headers: { 'autorizacion': token }
            })
            I++
        }

        const id = sessionStorage.getItem('idUsuario')
        const respuesta = await Axios.delete('http://localhost:4000/usuarios/eliminarCuenta/' + id)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada',
            text: respuesta.data.mensaje,
            showConfirmButton: false,
            timer: 1450
        })
        setTimeout(() => {
            sessionStorage.clear()
            window.location.href = "/"
        }, 1500)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-lg ">
                <Link className="navbar-brand mx-auto" to="#">Galeria</Link>
                {
                    menu ? <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> : null
                }

                {
                    menu ? <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/galeria"> Imagenes <i className="far fa-images"></i> </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/agregarArticulo"> Subir Imagen <i className="fas fa-upload"></i> </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Salir <i className="fas fa-sign-out-alt"></i> </Link>
                                <div className="dropdown-menu bg-secondary " aria-labelledby="navbarDropdown">
                                    <Link className=" dropdown-item" to="/" onClick={salir}> Salir <i className="fas fa-sign-out-alt"></i> </Link>
                                    <Link className=" dropdown-item" to="/" onClick={eliminar} > Borrar Cuenta <i className="fas fa-trash-alt"></i> </Link>
                                </div>

                            </li>
                        </ul>
                    </div> : null
                }
            </div>
        </nav>
    )
}