import { applyMiddleware, createStore } from "redux"
import  thunk  from "redux-thunk"
import rootReduce from "../Reduce/reduce"

const store = createStore(
    rootReduce, 
//El middleware thunk permite que los creadores de acciones devuelvan funciones en lugar de objetos, lo que permite acciones asíncronas y acciones que despachan múltiples acciones.
    applyMiddleware(thunk)
)

export default store;