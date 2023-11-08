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
} from "../Actions/types"

const inicialState = {
    allFoods: [],
    allFoodsCopy: [],
    allFoodsCopyFilted: [],
    details: [],
    diets: []
}

const reduce = (state = inicialState, action) => {
    switch (action.type) {
        case All_FOOD:
            return {
                ...state,
                allFoods: action.payload,
                allFoodsCopy: action.payload,
                allFoodsCopyFilted: action.payload,
            }
        case RESET:
            return {
                ...state,
                allFoodsCopy: state.allFoods,
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                allFoods: action.payload
            }
        case GET_BY_ORDEN_ASC_O_DES:
            const sortedOrden = [...state.allFoods].sort((a, b) => {
                const comparison = a.title.localeCompare(b.title);
                return action.payload === "ascendentemente" ? comparison : -comparison;
            });
           //console.log("soert",sortedOrden)
            return {
                ...state,
                allFoods: sortedOrden,
                allFoodsCopyFilted: sortedOrden
            };
        case GET_BY_ORDEN_FOOD:
            const filteredFoods = [...state.allFoods].sort((a, b) => {
                const comparison = a.healthScore - b.healthScore;
                return action.payload === "bajo" ? comparison : -comparison;
            });
            //console.log("filtt", filteredFoods)
            return {
                ...state,
                allFoods: filteredFoods,
                allFoodsCopyFilted: filteredFoods
            }
        case GET_BY_ORDEN_API_DB:
            const filteredOrigin = action.payload === "All" ? state.allFoodsCopy : state.allFoodsCopy.filter((food) => {
                if (action.payload === "Api") {
                    return !isNaN(food.id) ? food.id : null
                }
                return isNaN(food.id) ? food.id : null
            })

            return {
                ...state,
                allFoods: filteredOrigin,
            }
        case GET_BY_FILTER_DIETS:
            const filteredDiets = [...state.allFoodsCopyFilted].filter((food) => food.diets?.some(diet => diet.name === action.payload))
            return {
                ...state,
                allFoods: filteredDiets
            }
            
        case GET_FILTER_BY_DIETS:
            return {
                ...state,
                allFoodsCopy: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                details: action.payload
            }
        case POST_FOOD:
            return {
                ...state
            }
        default:
            return state
    }
}

export default reduce;