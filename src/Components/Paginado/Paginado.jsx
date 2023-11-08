import React from 'react'
import style from './Paginado.module.css'

export default function Paginado({ pagina, allFoods, currentPagina, handlesPag }) {
    let pageNumberArray = [];
    let currentPageNumber = pagina;
    const division = Math.ceil(allFoods / currentPagina)
    for (let i = 1; i <= division; i++) {
      pageNumberArray.push(i)
    }
  
    const handlesButton = (value) => {
      handlesPag(value)
    }
  
    const handlesButtonNext = () => {
      if (currentPageNumber < division) {
        currentPageNumber++;
        handlesPag(currentPageNumber);
      }
    }
    const handlesButtonPrev = () => {
      if (currentPageNumber > 1) {
        currentPageNumber--;
        handlesPag(currentPageNumber);
      }
    }
  
    return (
      <div >
        <button className={style.boton} onClick={handlesButtonPrev}>Prev</button>
        {pageNumberArray?.map((e, i) => {
          return <button
            key={i}
            className={e === currentPageNumber ? style.boton : style.ahora}
            onClick={() => handlesButton(e)}>{e}</button>
        })}
        <button className={style.boton} onClick={handlesButtonNext}>Next</button>
      </div>
    )
}
