import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Home } from "./pages/Home";
import {SimuladorER} from "./pages/SimuladorER"
import {SimuladorGR} from "./pages/SimuladorGR"
import {SimuladorAF} from "./pages/SimuladorAF"
import './App.scss';

function App() {
  return (

  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/simulador-er" element={<SimuladorER />}/>
    <Route path="/simulador-gr" element={<SimuladorGR />}/>
    <Route path="/simulador-af" element={<SimuladorAF />}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
