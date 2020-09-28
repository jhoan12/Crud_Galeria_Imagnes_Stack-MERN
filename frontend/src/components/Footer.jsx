import React from 'react'
import '../index.css'
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <div className=" bg-dark mt-3 footer">
            <div className="container-lg">
                <div className="col-12 text-center">
                    <h3 >Hecho por: <Link to="#">Axel</Link> </h3>
                </div>
            </div>
        </div>
    )
}
