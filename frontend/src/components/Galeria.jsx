import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Galeria(props) {

    const [datos, setDatos] = useState([])
    const [iconos, setIconos] = useState([])

    const [nombre, setNombre] = useState('')
    const [icono, setIcono] = useState('')
    const [pertenece, setPertenece] = useState('')

    useEffect(() => {
        obtenerGaleria()
    }, [])

    const obtenerGaleria = async () => {
        const idArticulo = props.match.params.id
        const token = sessionStorage.getItem('token')

        const respuesta = await Axios.get('http://localhost:4000/galeria/galeriaAriticulo/' + idArticulo, {
            headers: { 'autorizacion': token }
        })
        setDatos(respuesta.data)

        const id = sessionStorage.getItem('idUsuario')
        const respuestaIconos = await Axios.get('http://localhost:4000/iconos/obtenerIconosUsuario/' + id, {
            headers: { 'autorizacion': token }
        })
        setIconos(respuestaIconos.data)
    }

    const eliminarImagen = async (idImagen) => {
        const token = sessionStorage.getItem('token')

        const filtradosIconios = iconos.filter(icono => icono.pertenece === idImagen)
        let I = 0
        while (I < filtradosIconios.length) {
            const id = filtradosIconios[I]._id
            await Axios.delete('http://localhost:4000/iconos/eliminarIcono/' + id, {
                headers: { 'autorizacion': token }
            })
            I++
        }
        const respuesta = await Axios.delete('http://localhost:4000/galeria/eliminarImagen/' + idImagen, {
            headers: { 'autorizacion': token }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada',
            text: respuesta.data.mensaje,
            showConfirmButton: false,
            timer: 1450
        })
        setTimeout(() => {
            obtenerGaleria()
        }, 1500)

    }

    const buscar = async (titulo) => {
        if (titulo === '') {
            return obtenerGaleria()
        }
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/galeria/buscarImagen/' + titulo, {
            headers: { 'autorizacion': token }
        })
        const id = sessionStorage.getItem('idUsuario')
        const filtrados = respuesta.data.filter(imagen => imagen.usuario === id)
        setDatos(filtrados)
    }

    const guardarIcono = async (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem('token')
        const idUsuario = sessionStorage.getItem('idUsuario')

        const nuevo = {
            nombre,
            icono,
            pertenece,
            usuario: idUsuario
        }
        await Axios.post('http://localhost:4000/iconos/agregarIcono', nuevo, {
            headers: { 'autorizacion': token }
        })
        setTimeout(() => {
            window.location.href=`/galeriaArticulo/${props.match.params.id}`
        }, 900)

    }

    const eliminarIcono = async (id) => {
        const token = sessionStorage.getItem('token')
        await Axios.delete('http://localhost:4000/iconos/eliminarIcono/' + id, {
            headers: { 'autorizacion': token }
        })
        setTimeout(() => {
            obtenerGaleria()
        }, 200)
    }

    return (
        <div className="container-lg">
            <div className="row">
                <div className="container-lg mt-4">
                    <div className="row mx-auto">
                        <div className="col-12 col-sm-6 text-center ">
                            <h1 className=" mt-2"><i className="fas fa-camera-retro"></i> GALERIA </h1>
                            <br />
                        </div>

                        <div className="col-12 col-sm-6 mt-3">
                            <div className="input-group">
                                <input type="search" onChange={e => buscar(e.target.value)} className="form-control mr-sm-1" placeholder="Buscar..." aria-label="search" />
                                <button className="btn btn-dark"><i className="fas fa-search"></i></button>

                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="col-12">
                    <Link className="btn btn-dark btn-block" to={"/agregarImagen/"+props.match.params.id}>Agregar Imagen <i className="fas fa-camera-retro"></i></Link>
                </div>
                <div className="card-columns mx-auto  mt-5" >
                    {
                        datos.map((dato) => (
                            <div className="card" key={dato._id}>
                                <img src={dato.imageUrl} className="card-img-top" alt={dato.titulo} />
                                <div className="card-body">
                                    <h5 className="card-title">{dato.titulo}</h5>
                                    <p className="card-text">{dato.descripcion}</p>
                                    <hr />

                                    <div className=" text-center">
                                        
                                        <div className=" row text-center d-flex justify-content-between">
                                            {
                                                iconos.map((icono) => (
                                                    icono.pertenece === dato._id ?
                                                        <div key={icono._id} className=" col-6">
                                                            <h2><i className={icono.icono}></i></h2>
                                                            <h4>{icono.nombre}</h4>
                                                            <Link to="#" className="btn m-1 btn-danger" onClick={() => eliminarIcono(icono._id)} > <i className="far fa-trash-alt"></i></Link>
                                                            <hr />
                                                        </div> : null
                                                ))
                                            }
                                        </div>

                                    </div>
                                    <Link to="#" className="btn btn-dark btn-block mb-2" data-toggle="modal" data-target="#addIcono" onClick={() => setPertenece(dato._id)} > <i className="fas fa-plus"></i> Agregar Icono </Link>
                                    <hr />
                                    <Link to="#" className="btn btn-danger btn-block" onClick={() => eliminarImagen(dato._id)} > Eliminar <i className="far fa-trash-alt"></i></Link>
                                </div>
                            </div>
                        ))
                    }

                    <div className="modal fade bg-secondary" id="addIcono">
                        <div className="modal-dialog  modal-lg">
                            <div className="modal-content ">
                                <div className="modal-header bg-dark text-white">
                                    <h5 className="modal-title">Agregar Icono</h5>
                                    <button className="close" data-dismiss="modal"> <span>&times;</span> </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={guardarIcono} >
                                        <div className="form-group">
                                            <label>Nombre Icono</label>
                                            <input type="text" autoFocus onChange={e => setNombre(e.target.value)} className="form-control" placeholder="Nombre Icono" required />

                                        </div>
                                        <div className="form-group">
                                            <label>Icono</label>
                                            <input type="texto" onChange={e => setIcono(e.target.value)} className="form-control mb-2" placeholder="Icono" />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-dark btn-block" type="submit" > Agregar </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
