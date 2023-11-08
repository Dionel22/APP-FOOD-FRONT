import React from 'react'
import style from './SearchBar.module.css'
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { filteredByDiets, getByName } from '../../Redux/Actions/action'

export default function SearchBar(props) {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
  
      const [filtro, setFiltro] = useState({
          title: "title",
        titles: "",
        api: "",
        diet: "diet",
        diets: ""
      });
  console.log("filtros", filtro);
      const handleName = (e) => {
          const { value } = e.target;
          setFiltro({
              ...filtro,
              titles: value,
          });
          //setPage(1);
      };
  
      //diet
      const handlesOrdenByDiets = (event) => {
          const { value } = event.target;
          setFiltro({
              ...filtro,
              diets: value
          });
          //setPage(1);
      };
  
  
      useEffect(() => {
          dispatch(filteredByDiets(filtro));
      }, [filtro, dispatch]);
  
      const handleReset = () => {
          dispatch(getAllBooks());
          setFiltro({
        title: "title",
        titles: "",
        api: "",
        diet: "diet",
        diets: ""
          });
          //setPage(1);
      };
  console.log("propss", props);
    const handlesSubmit = (event) => {
      event.preventDefault()
      dispatch(getByName(name))
      setName("")
      props.pagina(1)
    }
  
    return (
      <div className={style.div}>
        <input
          className={style.input}
          type="text"
          placeholder="search..."
          value={name.trim()}
          onChange={handleName}
        />
        <button className={style.boton} onClick={handlesSubmit}>Buscar</button>
  
  
  
          {/*ORDEN POR DIETA*/}
          <select className={style.select} defaultValue='msg' onChange={handlesOrdenByDiets}>
            <option value="msg" disabled>Type of Diets</option>
            <option value="gluten free">gluten free</option>
            <option value="dairy free">dairy free</option>
            <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="paleolithic">paleolithic</option>
            <option value="primal">primal</option>
            <option value="whole 30">whole 30</option>
            <option value="pescatarian">pescatarian</option>
            <option value="ketogenic">ketogenicl</option>
            <option value="fodmap friendly">fodmap friendly</option>
          </select>
  
   
          {/*RESETEA*/}
          <button className={style.select} onClick={handleReset}>Reset</button>
      </div>
    )
}
