import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import SignUp from "./user/signUp/SignUp.js";
import Login from "./user/login/LogIn.js";
import Navbaar from './components/Navbaar';
import Home from './components/Home';
import AddTask from "./components/Addtask";
import Edit from './components/Edit';
import Details from './components/Details';
import {Routes,Route} from "react-router-dom"




function App() {
  return (
   <>
    <Navbaar />
    <Routes>
      <Route  path='/'element={<Login/>}/>
      <Route  path="/home" element={<Home/>} />
      <Route  path='/signUp' element={<SignUp/>}/>
      <Route  path="/addTask" element={<AddTask/>} />
      <Route  path="/edit/:id" element={<Edit/>}/>
      <Route  path="/view/:id" element={<Details/>} />
    </Routes>
   
   </>
  );
}

export default App;






