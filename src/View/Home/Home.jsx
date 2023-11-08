import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../../Components/Cards/Cards';
import Paginado from '../../Components/Paginado/Paginado';
import { getAllFoods } from '../../Redux/Actions/action';
import NavBar from '../../Components/NavBar/NavBar';

export default function Home() {
  const dispatch = useDispatch();
  const allFoods = useSelector((state) => state.allFoodsCopy);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga

  const currentPagina = 9;
  const nextPagina = pagina * currentPagina;
  const lastPagina = nextPagina - currentPagina;

  const allFoodsPag = allFoods.msg ? allFoods : allFoods.slice(lastPagina, nextPagina);

  const handlesPag = (value) => {
    setPagina(value);
  };

  const handlesPagNext = (value) => {
    setPagina(value);
  };

  const handlesPagSearch = (value) => {
    setPagina(value);
  };

  useEffect(() => {
    // Al inicio de la carga, establece el estado de carga en true
    setLoading(true);

    dispatch(getAllFoods()).then(() => {
      // Una vez que se obtengan los datos, establece el estado de carga en false
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <>
      <div>
        <NavBar pagina={handlesPagSearch} />

        <Paginado
          currentPagina={currentPagina}
          allFoods={allFoods.length}
          handlesPag={handlesPag}
          handlesPagNext={handlesPagNext}
          pagina={pagina}
        />
        <br />

        {loading ? ( // Si loading es true, muestra un indicador de carga
           <div className={style.loader}>
           <div className={style.circularLoader}></div>
           <div className={style.loaderText}>Foods</div>
         </div>
        ) : (
          <Cards allFoods={allFoodsPag} />
        )}

        <Paginado
          currentPagina={currentPagina}
          allFoods={allFoods.length}
          handlesPag={handlesPag}
          handlesPagNext={handlesPagNext}
          pagina={pagina}
        />
      </div>
    </>
  );
}
