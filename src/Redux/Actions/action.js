import axios from "axios"
import {
  All_FOOD,
  GET_BY_FILTER_DIETS,
  GET_BY_NAME,
  GET_BY_ORDEN_API_DB,
  GET_BY_ORDEN_ASC_O_DES,
  GET_BY_ORDEN_FOOD,
  GET_DETAIL,
  GET_DIETS,
  GET_FILTER_BY_DIETS,
  POST_FOOD,
  RESET
} from "./types"

//Trae todo los Food
export const getAllFoods = () => {
  return async (dispatch) => {
    try {
      const response = (await axios.get('https://app-foods.onrender.com/recipe')).data;
      //const response = (await axios.get('http://localhost:3001/recipe')).data;
      //console.log('aa', response);
      return dispatch({
        type: All_FOOD,
        payload: response,
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error al obtener los alimentos:', error.message);
      // Podrías despachar una acción para manejar el error en tu estado global si lo deseas
      return dispatch({
        type: All_FOOD,
        payload: { msg: `Error al obtener los alimentos: ${error.status}` },
      });
    }
  };
};

//rewset
export const getReset = () => {
  return (dispatch) => {
    return dispatch({
      type: RESET,
    });

  };
};
//Trae todo los Diets
export const getAllDiets = () => {
  return async (dispatch) => {
    try {
      //const response = (await axios.get(`http://localhost:3001/diet`)).data
      const response = (await axios.get(`https://app-foods.onrender.com/diet`)).data
    return dispatch({
      type: GET_DIETS,
      payload: response
    })
    } catch (error) {
      alert(error.message)
      console.log(error)
    }
    
  }
}

//Trae solo por nombre
export const getByName = (name) => {
  return async (dispatch) => {
    // console.log("hshs")
    //const response = (await axios.get(`http://localhost:3001/recipe?name=${name}`)).data
    const response = (await axios.get(`https://app-foods.onrender.com/recipe?name=${name}`)).data
    // console.log("<xc", response)
    return dispatch({
      type: GET_BY_NAME,
      payload: response
    })
  }
}

//Ordena por Asc y Dec
export const ordenAseByDec = (value) => {
  return async (dispatch) => {
    // console.log("hshs")
    return dispatch({
      type: GET_BY_ORDEN_ASC_O_DES,
      payload: value
    })
  }
}

//Ordena por comida
export const ordenFood = (value) => {
  return async (dispatch) => {
    return dispatch({
      type: GET_BY_ORDEN_FOOD,
      payload: value
    })
  }
}

//Ordena por comida
export const ordenByApiAndDb = (value) => {
  return async (dispatch) => {
    return dispatch({
      type: GET_BY_ORDEN_API_DB,
      payload: value
    })
  }
}

//Ordena por Diets
export const ordenByDiets = (value) => {
  return async (dispatch) => {
    return dispatch({
      type: GET_BY_FILTER_DIETS,
      payload: value
    })
  }
}

//fitros de dieta y si es api o db
export const filteredByDiets = (body) => {
  return async (dispatch) => {
    //console.log("body filter", body);
    try {
      let params = {};

			if (body.title) {
				params.titles = encodeURIComponent(body.titles);
			}

			if (body.diet) {
				params.diets = encodeURIComponent(body.diets);
			}

			if (body.asc) {
				params.ascs = encodeURIComponent(body.ascs);
			}

      const queryString = Object.entries(params)
				.map(([key, value]) => `${key}=${value}`)
				.join("&");

                if(body.titles !== "" || body.diets !== "" || body.ascs){

                    //const response = await axios.get(`http://localhost:3001/filter?${queryString}`);
                    const response = await axios.get(`https://app-foods.onrender.com/filter?${queryString}`);
                    //console.log("filtror", response.data);
                    return dispatch({
                      type: GET_FILTER_BY_DIETS,
                      payload: response.data
                    })
                }
    } catch (error) {
      alert(error.message)
      console.log("error",error)
    }
  }
}

//traer por id
export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`https://app-foods.onrender.com/recipe/${id}`)).data
      //const response = (await axios.get(`http://localhost:3001/recipe/${id}`)).data
      console.log("de",response)
      return dispatch({
        type: GET_DETAIL,
        payload: response
      })

    } catch (error) {
      return dispatch({
        type: GET_DETAIL,
        payload: { msg: error.message }
      })
    }
  }
}
export const getDesmonta = () => {
  return async (dispatch) => {
    const response = {};
    return dispatch({
      type: GET_DETAIL,
      payload: response
    })
  }
}

//crea food
export const createFood = (body) => {
  return async (dispatch) => {
    //await axios.post(`http://localhost:3001/recipe`, body)
    await axios.post(`https://app-foods.onrender.com/recipe`, body)
    //console.log("de",response)
    return dispatch({
      type: POST_FOOD,
    })
  }
}