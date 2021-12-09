import { Header } from "../../components/Header/Header";
import { ProductionRule } from "../../components/RegradeProdução/RegradeProdução";

export function SimuladorGR() {
    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="title">Simulador de Gramática Regular</h1>
                <div className="page-content">
                    <p>Insira sua gramática regular aqui. O símbolo de início já foi preenchido para você.</p>
                    <ul>
                        <li>
                            <p>O não-terminal esquerdo de cada campo deve ser preenchido.</p>
                        </li>
                        <li>
                            <p>[ε] - Um campo de texto vazio corresponde a épsilon.</p>
                        </li>
                        <li>
                            <p>A entrada diferencia maiúsculas de minúsculas.</p>
                        </li>
                    </ul>

                    <div className="grammar-container">
                        <ProductionRule />
                    </div>
                </div>
            </div>
        </div>
    )
}