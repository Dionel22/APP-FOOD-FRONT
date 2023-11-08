import React from "react";
import style from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filteredByDiets, getAllFoods, getReset } from "../../Redux/Actions/action";

export default function SearchBar(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [filtro, setFiltro] = useState({
    title: "title",
    titles: "",
    api: "",
    diet: "diet",
    diets: "",
    asc: "asc",
    ascs: "",
  });

  //console.log("props", props);
  const handleName = (e) => {
    const { value } = e.target;
    setName(value);
    props.pagina(1);
  };

  //diet
  const handlesOrdenByDiets = (event) => {
    const { value } = event.target;
    setFiltro({
        title: "title", // Restablece el filtro de títulos
        titles: "",     // Limpia el campo de búsqueda de títulos
        diet: "diet",   // Mantén el filtro de dieta como está
        diets: value,   // Establece la dieta seleccionada
        asc: "asc",
        ascs: filtro.ascs,
      });
    props.pagina(1);
  };

  const handlesOrdenByAseAndDec = (event) => {
    const { value } = event.target;
    setFiltro({
      ...filtro,
      ascs: value,
    });
    props.pagina(1);
  };

  useEffect(() => {
        dispatch(filteredByDiets(filtro));
  }, [filtro, dispatch]);

  const handleReset = () => {
    dispatch(getReset());
    setFiltro({
      title: "title",
      titles: "",
      api: "",
      diet: "diet",
      diets: "",
      asc: "asc",
      ascs: "",
    });
    props.pagina(1);
  };

  const handlesSubmit = (event) => {
    event.preventDefault();
    setFiltro({
      ...filtro,
      titles: name.trim(),
    });
    setName("");
    props.pagina(1);
  };

  return (
    <div className={style.div}>
      <input
        className={style.input}
        type="text"
        placeholder="search..."
        value={name}
        onChange={handleName}
      />
      <button className={style.boton} onClick={handlesSubmit}>
        Buscar
      </button>

      {/*ORDEN POR ASC Y DEC*/}
      <select
        className={style.Alphabetic}
        value={filtro.ascs}
        onChange={handlesOrdenByAseAndDec}
      >
        <option value="" disabled>
          Alphabetic
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      {/*ORDEN POR DIETA*/}
      <select
        className={style.select}
        value={filtro.diets}
        onChange={handlesOrdenByDiets}
      >
        <option value="" disabled>
          Type of Diets
        </option>
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
      <button className={style.reset} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
