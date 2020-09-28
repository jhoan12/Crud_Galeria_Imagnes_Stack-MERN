import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function EditarArticulo(props) {

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState('')

    useEffect(() => {
        obtenerArticulo()
    }, [])

    const obtenerArticulo = async () => {
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/articulo/obtenerArticuolo/' + id, {
            headers: { 'autorizacion': token }
        })

        setTitulo(respuesta.data.titulo)
        setDescripcion(respuesta.data.descripcion)
        setImagen(respuesta.data.imageUrl)
        
    }


    const acatualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')

        const actualizar = {
            titulo,
            descripcion,
            usuario: sessionStorage.getItem('idUsuario'),
            pertenece: props.match.params.id
        }
        const respuesta = await Axios.put('http://localhost:4000/articulo/actualizarArticulo/' + id, actualizar, {
            headers: { 'autorizacion': token }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Articulo Actualizado',
            showConfirmButton: false,
            timer: 1380
        })
        setTimeout(() => {
            window.location.href = "/galeria"
        }, 1400)

    }

    return (

        <div className="container-lg">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card bg-dark text-white mt-5">
                        <div className="container-lg text-center fa-6x">
                        <img src={imagen} className="card-img-top" alt={titulo} />
                        </div>
                        <div className="card-body">
                            <form onSubmit={acatualizar} >
                                <div className="form-group">
                                    <h3>Titulo</h3>
                                    <input type="texto" className="form-control mb-2" value={titulo} autoFocus onChange={e => setTitulo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Descripcion </h3>
                                    <textarea type="texto" className="form-control mb-2" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                                </div>
                                <button className="btn btn-dark btn-block" type="submit" >Actualizar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}