import { useState } from "react";
import { Header } from "../../components/Header/Header";
import "./SimuladorGR.scss"

export function SimuladorGR() {
    const [count,setCount] = useState(1)
    const [rules, setRules] = useState([{ id: 1, nonterminal: "S", terminal: ""},])

    const handleAddRules = () => {
        setCount(count+1)
        setRules([...rules, { id: count, nonterminal: "", terminal: "" }])
    }

    const handleRemoveFields = id => {
        const values  = [...rules];
        values.splice(values.findIndex(value => value.id === id), 1);
        setRules(values);
    }

    const handleChangeInput = (id, event) => {
        const newInputFields = rules.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setRules(newInputFields);
      }
    
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
                        {rules.map(rule => (
                            <div className="production-container" key={rule.id}>
                                <div className="production-rule">
                                    <input name="nonterminal" type="text" value={rule.nonterminal}  onChange={event => handleChangeInput(rule.id, event)} />
                                    <p className="arrow">➜</p>
                                    <input name="terminal" type="text"  value={rule.terminal} onChange={event => handleChangeInput(rule.id, event)}/>
                                </div>
                                <button className="addButton" disabled={rule.id === 1} onClick={() => handleRemoveFields(rule.id)}>-</button>
                                <button className="addButton" onClick={handleAddRules}>+</button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}