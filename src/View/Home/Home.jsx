import React from 'react'
import style from './Home.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import Paginado from "../../Components/Paginado/Paginado";
import { getAllFoods, getReset } from "../../Redux/Actions/action";
import NavBar from '../../Components/NavBar/NavBar';

export default function Home() {
    const dispatch = useDispatch()
    const allFoods = useSelector((state) => state.allFoodsCopy)
    const [pagina, setPagina] = useState(1)
    const currentPagina = 9;
    const nextPagina = pagina * currentPagina;
    const lastPagina = nextPagina - currentPagina;
    console.log("allFoods", allFoods)
    const allFoodsPag = allFoods.msg ? allFoods : allFoods.slice(lastPagina, nextPagina);
  
  
    const handlesPag = (value) => {
      setPagina(value)
    }
    const handlesPagNext = (value) => {
      setPagina(value)
    }
    const handlesPagSearch = (value) => {
      setPagina(value)
    }
  
    useEffect(() => {
      dispatch(getAllFoods())
    }, [dispatch])
  
  
  
    return (
      <>
        <div>
  
          <NavBar pagina={handlesPagSearch}/>
  
  
          <Paginado
            currentPagina={currentPagina}
            allFoods={allFoods.length}
            handlesPag={handlesPag}
            handlesPagNext={handlesPagNext}
            pagina={pagina}
          />
  
          <Cards allFoods={allFoodsPag} />
        </div>
      </>
    )
}
