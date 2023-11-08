import React from 'react'
import style from './FormPage.module.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createFood, getAllDiets } from "../../Redux/Actions/action";
import validation from "./validation";
import NavBar from '../../Components/NavBar/NavBar';

export default function FormPage() {
    const dispatch = useDispatch()
    const allDiets = useSelector((state) => state.diets)
    const [input, setInput] = useState({
      title: "",
      image: "",
      summary: "",
      healthScore: "",
      steps: [],
      diets: []
    })
    const [inputSteps, setInputSteps] = useState({});
    const [error, setError] = useState({})
  
    useEffect(() => {
      dispatch(getAllDiets())
    }, [dispatch]);
  
    const handleInput = (e) => {
      const { name, value } = e.target;
      setInput({
        ...input,
        [name]: value,
      });
      setError(validation({
        ...input,
        [name]: value
      }));
    }
    const handleSteps = (e) => {
      const { name, value } = e.target;
      setInputSteps({
        ...inputSteps,
        [name]: value
      })
    }
  
    const handleButton = (e) => {
      e.preventDefault()
      if (inputSteps.number && inputSteps.step) {
        setInput({
          ...input,
          steps: [...input.steps, inputSteps]
        })
        setError(validation({
          ...input,
          steps: [...input.steps, inputSteps]
        }))
        setInputSteps({})
      } else {
        inputSteps.number ? alert("falta completar la descripcion del Paso") : alert("falta completar el Numero del Paso");
  
      }
    }
  
  
  
    const handleCheckboxChange = (value) => {
      if (input.diets.includes(value)) {
        const filtered = input.diets.filter((val) => val !== value)
        setInput({
          ...input,
          diets: filtered
        });
        setError(validation({
          ...input,
          diets: filtered
        }))
      } else {
        setInput({
          ...input,
          diets: [...input.diets, value]
        });
        setError(validation({
          ...input,
          diets: [...input.diets, value]
        }))
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (Object.keys(error).length === 0) {
        alert("FOOD creado con éxito!!");
        dispatch(createFood(input));
        setInput({
          title: "",
          image: "",
          summary: "",
          healthScore: "",
          steps: [],
          diets: []
        });
        setInputSteps({});
      } else {
        alert("Debes completar toda la información requerida!!");
      }
    };
  
    return (
      <>
      <NavBar/>
        <div className={style.div}>
          <form >
            <h2 className={style.create}>CREATE BY FOOD</h2>
            <img className={style.cuchillo} src="https://cdn-icons-png.flaticon.com/512/47/47458.png" alt="cuchillo" />
            <img className={style.tenedor} src="https://images.vexels.com/media/users/3/211791/isolated/preview/c03169a8744f4a8dad16bbb1c2c90d99-tenedor-de-cocina.png" alt="tenedor" />
            <img className={style.gorro} src="https://i.pinimg.com/originals/f7/9a/66/f79a66c1ffc68a1b4492d98b7288d671.png" alt="tenedor" />
            <div className={style.input_field_title}>
              <input
                required
                type="text"
                name="title"
                value={input.title}
                className={style.inputTitle}
                onChange={handleInput} />
              <label className={input.title ? style.titleTop : style.labelTitle}>Title</label>
              {error.title && <p className={style.pTitle}>{error.title}</p>}
            </div>
  
            <div className={style.input_field_summary}>
              <textarea
                name="summary"
                value={input.summary}
                className={style.inputSummary}
                onChange={handleInput}></textarea>
              <label className={input.summary ? style.summaryTop : style.labelSummary}>Summary</label>
              {error.summary && <p className={style.pSummary}>{error.summary}</p>}
            </div>
  
            <div className={style.input_field_healthScore}>
              <input
                type="number"
                name="healthScore"
                min="0"
                max="100"
                value={input.healthScore}
                className={style.inputHealthScore}
                onChange={handleInput} />
              <label className={input.healthScore ? style.HealthScoreTop : style.labelHealthScore}>Health Score</label>
              {error.healthScore && <p className={style.pHealthScore}>{error.healthScore}</p>}
            </div>
  
            <div className={style.input_field_Image}>
              <input
                type="text"
                name="image"
                className={style.inputImage}
                value={input.image}
                onChange={handleInput} />
              <label className={input.image ? style.ImageTop : style.labelImage}>Image url</label>
              {error.image && <p className={style.pImage}>{error.image}</p>}
            </div>
  
            <div className={style.input_field_Steps_Number}>
              <input
                type="number"
                name="number"
                min="1"
                max="10"
                className={style.inputStepsNumber}
                value={inputSteps.number ? inputSteps.number : 0}
                onChange={handleSteps} />
              <label className={style.StepsNumberTop}>Number</label>
            </div>
  
            <div className={style.input_field_Steps}>
              <input
                type="text"
                name="step"
                value={inputSteps.step ? inputSteps.step : ""}
                className={style.inputSteps}
                onChange={handleSteps} />
              <label className={style.StepsTop}>Steps</label>
            </div>
            {error.steps ? <p className={style.pSteps} >{error.steps}</p> : null}
  
            <button className={style.boton_steps} onClick={handleButton}>listo</button>
  
            {/*DIETS*/}
            <div className={style.input_field_Diets}>
  
              <div className={style.boton_delete_Diets}>
                {allDiets?.map((diet, i) => (
                  <div key={i} className={style.boton_diets}>
                    <label className={style.label_diets}>{diet.name} </label>
                    <input
                      type="checkbox"
                      value={diet.name}
                      checked={input.diets.includes(diet.name)}
                      onChange={() => handleCheckboxChange(diet.name)}
                    />
  
                  </div>
                ))}
              </div>
              <label className={style.labelDiets}>Diets</label>
              {error.diets && <p className={style.pDiets}>{error.diets}</p>}
  
            </div>
            <button onClick={handleSubmit} className={style.create_Boton} >Create</button>
          </form>
  
        </div>
        {/*STEPS*/}
        <label className={style.labelDeleteSteps}>Steps to Steps</label>
        <div className={style.boton_delete_steps}>
          {input.steps?.map((e, a) => {
            return <span key={a} className={style.steps}>{e.number}°: {e.step}</span>
          })}
        </div>
      </>
    )
}
