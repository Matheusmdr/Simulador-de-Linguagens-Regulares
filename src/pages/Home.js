import {Link} from 'react-router-dom'
import "../styles/Home.scss"

export function Home() {

    return(
        <div className="container">
             <h1 className="title">Simulador de Linguagens Regulares</h1>
             <span>Selecione uma opção:</span>
             <Link to="/simulador-er">Simulador de Expressões Regulares</Link>
             <Link to="/simulador-gr">Simulador de Gramática Regular</Link>
             <Link to="/simulador-af">Simulador de Automatos</Link>



           
        </div>
    )
    
  }