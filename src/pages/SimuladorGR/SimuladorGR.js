import { useState } from "react";
import { Header } from "../../components/Header/Header";
import "./SimuladorGR.scss"

export function SimuladorGR() {
    const [count, setCount] = useState(2)
    const [rules, setRules] = useState([{ id: 1, nonterminal: "S", terminal: "" },])
    const [strings, setStrings] = useState([])


    const handleStrings = event => {
        const lines = event.target.value.split('\n');
        setStrings(lines)
    }

    const handleAddRules = () => {
        setRules([...rules, { id: count, nonterminal: "", terminal: "" }])
        setCount(count + 1)
    }

    const handleRemoveFields = id => {
        const values = [...rules];
        values.splice(values.findIndex(value => value.id === id), 1);
        setRules(values);
    }

    const handleChangeInput = (id, event) => {
        const newInputFields = rules.map(i => {
            if (id === i.id) {
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
                <h1 className="title">Simulador de GR</h1>
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
                                    <input name="nonterminal" type="text" readOnly={rule.id === 1} value={rule.nonterminal} onChange={event => handleChangeInput(rule.id, event)} />
                                    <p className="arrow">➜</p>
                                    <input name="terminal" type="text" value={rule.terminal} onChange={event => handleChangeInput(rule.id, event)} placeholder="ε" />
                                </div>
                                <button className={`removeButton ${rule.id === 1 ? 'disableButton' : ''}`} disabled={rule.id === 1} onClick={() => handleRemoveFields(rule.id)}>-</button>
                            </div>
                        ))}
                        <button className="addButton" onClick={handleAddRules}>+ Add RULES</button>
                    </div>


                    <div className="test-container">
                        <h3>Testar</h3>
                        <div className="table-container">
                            <div className="textarea-input">
                                <span>
                                    Para testar a GR acima, insira as strings de teste aqui, uma por linha. Uma linha vazia corresponde à string vazia. Os resultados serão mostrados automaticamente.</span>
                                <textarea rows="15" cols="33" onChange={handleStrings}></textarea>
                            </div>
                            <div className="table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>String</th>
                                            <th>Correspondência</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {strings.map((string,index) =>(
                                            <tr  key={index}>
                                                <td>
                                                    {index}
                                                </td>
                                                <td>
                                                    {`"${string}"`}
                                                </td>
                                                <td>
                                                 
                                                </td>
                                            </tr>
                                        ))
                                            
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}