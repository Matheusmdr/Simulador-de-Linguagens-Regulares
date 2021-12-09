import { useState } from "react";
import { Link } from "react-router-dom"
import "../Header/Header.scss"

export function Header() {
    const [sidebar, setSidebar] = useState(false);
    const handleSidebar = () => setSidebar(!sidebar);

    return (
        <header>
            <div className={sidebar ? 'hamburguer-menu opened' : 'hamburguer-menu'} onClick={handleSidebar}>
                <div className="lines-container">
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul>
                    <li>
                        <Link to="/simulador-er">Simulador de Expressões Regulares</Link>
                    </li>
                    <li>
                        <Link to="/simulador-gr">Simulador de Gramática Regular</Link>
                    </li>
                    <li>
                        <Link to="/simulador-af">Simulador de Autômatos</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}