import React from 'react'
import style from './NavBar.module.css'
import SearchBar from "../SearchBar/SearchBar";
import { Link } from 'react-router-dom';

export default function NavBar({pagina}) {
    return (
        <div className={style.div}>
          <Link to="/">
            <img
              className={style.image}
              src="https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png"
              alt="henry"
            />
          </Link>
    
          <Link to="/home">
            <button className={style.boton}>Home</button>
          </Link>
    
          <Link to="/create">
            <button className={style.boton}>Create</button>
          </Link>
          <SearchBar pagina={pagina}/>
        </div>
      )
}
