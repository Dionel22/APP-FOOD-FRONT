import React from 'react'
import style from './LandingPage.module.css'
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className={style.div}>
    <h2 className={style.h2}>PI Food</h2>
    <h2 className={style.bien}>Bienvenidos</h2>
    <p className={style.p}>Aqui Puedes encontrar Más De 100 recetas <br /> y 10 Tipos De Dietas</p>

    <Link to="/home" className={style.link}><button className={style.boton}>HOME</button></Link>
  </div>
  )
}
