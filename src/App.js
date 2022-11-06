import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch/NoMatch";


function App() {
   return (
      <Routes>
         <Route index element={ <Home/> }/>
         <Route path="*" element={ <NoMatch/> }/>
      </Routes>
   )
}


export default App
