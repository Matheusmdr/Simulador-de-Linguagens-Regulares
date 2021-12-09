import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Home } from "./pages/Home/Home";
import {SimuladorER} from "./pages/SimuladorER/SimuladorER"
import {SimuladorGR} from "./pages/SimuladorGR/SimuladorGR"
import {SimuladorAF} from "./pages/SimuladorAF/SimuladorAF"

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
