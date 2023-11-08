import './App.css'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './View/LandingPage/LandingPage';
import Home from './View/Home/Home';
import Detail from './View/DetailPage/DetailPage';
import Form from './View/FormPage/FormPage';

function App() {

  return (
    <>
     <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route  path="/home" element={<Home/>}/>
      <Route  path="/detail/:id" element={<Detail/>}/>
      <Route  path="/create" element={<Form/>}/>
    </Routes>
    </>
  )
}

export default App
