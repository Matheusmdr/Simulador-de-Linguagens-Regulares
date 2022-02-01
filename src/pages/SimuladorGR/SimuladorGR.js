import { useState } from "react";
import { Header } from "../../components/Header/Header";
import "./SimuladorGR.scss"

export function SimuladorGR() {
    const [count, setCount] = useState(2)
    const [rules, setRules] = useState([{ id: 1, nonterminal: "S", terminal: "ε" },])
    const [strings, setStrings] = useState([])
    let aux = true

    const handleStrings = event => {
        const lines = event.target.value.split('\n');
        setStrings(lines)
    }

    const handleAddRules = () => {
        setRules([...rules, { id: count, nonterminal: "", terminal: "ε" }])
        setCount(count + 1)
    }

    const handleRemoveFields = id => {
        const values = [...rules];
        values.splice(values.findIndex(value => value.id === id), 1)
        setRules(values)
    }

    const handleChangeNtInput = (id, event) => {
        const isAlpha = (ch) => {
            return typeof ch === "string" && ch.length === 1
                && ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z"));
        }

        const newInputFields = rules.map(i => {
            if (id === i.id) {
                if (typeof event.target.value === 'undefined') {
                    i[event.target.name] = ''
                }
                else {
                    i[event.target.name] = isAlpha(event.target.value.toUpperCase()) ? event.target.value.toUpperCase() : ""
                }
            }
            return i;
        })

        setRules(newInputFields)
    }


    const handleChangeInput = (id, event) => {
        const isAlphaNumeric = (str) => {
            var letterNumber = /^[0-9a-zA-Z]+$/;
            if ((str.match(letterNumber)) || str === "ε") {
                return true
            }
            else {
                return false
            }
        }
        const newInputFields = rules.map(i => {
            if (id === i.id) {
                if (typeof event.target.value === 'undefined') {
                    i[event.target.name] = ''
                }
                else {
                    i[event.target.name] = isAlphaNumeric(event.target.value) ? event.target.value : ""
                }
            }
            return i;
        })

        setRules(newInputFields)
    }


    const handleGrammar = () => {
        const grammar = rules
        const grammarArray = []
        let terminal = []
        let terminalList = []
        let nonterminal = []

        for (let i = 0; i < grammar.length; i++) {
            nonterminal.push(grammar[i].nonterminal)
        }

        nonterminal = [...new Set(nonterminal)]

        for (let i = 0; i < nonterminal.length; i++) {
            terminal = []
            for (let j = 0; j < grammar.length; j++) {
                if (nonterminal[i] === grammar[j].nonterminal) {
                    terminal.push(grammar[j].terminal)
                }
            }
            terminalList.push(terminal)
        }

        for (let i = 0; i < nonterminal.length; i++) {
            grammarArray.push({ id: i + 1, nonterminal: nonterminal[i], terminal: terminalList[i] })
        }

        return grammarArray
    }


    const grammarValidate = string => {
        if (aux) {
            const validator = []

            const grammar = handleGrammar()


            grammar.forEach(input => {
                input.terminal.forEach(rule => {
                    if (rule.length > 1) {
                        if (!(rule.replace(/[^A-Z]/g, '').length > 1)) {
                            for (let i = 0; i < rule.length; i++) {
                                if (rule[i] === rule[i].toUpperCase() && i === rule.length - 1) {
                                    validator.push('D')
                                    break
                                }
                                if (rule[i] === rule[i].toUpperCase() && i === 0) {
                                    validator.push('E')
                                    break
                                }
                            }
                        }
                    }
                })
            })

            if (validator.filter(validateField => validateField === 'D').length === validator.length) {
                for (let rule of grammar[0].terminal) {
                    if (validate(grammar, rule, string, 'D')) {
                        return true
                    }

                }
            }

            else if (validator.filter(validateField => validateField === 'E').length === validator.length) {
                for (let rule of grammar[0].terminal) {
                    if (validate(grammar, rule, string, 'E')) {
                        return true
                    }
                }
            }

            else {
                return false
            }
        }
    }

    const validate = (grammar, rule, string, type) => {
        let proxRule = null
        if (type === 'D') {
            if (rule.length - 1 > string.length) return false

            proxRule = rule[rule.length - 1]

            if (proxRule === 'ε' && (rule.slice(0, rule.length - 1) === string && rule.slice(0, rule.length - 1).length === string.length)) return true

            if (typeof proxRule !== 'undefined') {
                if (proxRule === proxRule.toLowerCase()) return rule === string
            }

            if (rule.length > 1 && rule.slice(0, rule.length - 1) !== string.slice(0, rule.length - 1)) return false
        }

        else {
            if (rule.length - 1 > string.length) return false

            proxRule = rule[0]

            if (proxRule === 'ε' && (rule.slice(1, rule.length) === string && rule.slice(1, rule.length).length === string.length)) return true

            if (typeof proxRule !== 'undefined') {
                if (proxRule === proxRule.toLowerCase()) return rule === string
            }

            if (rule.length > 1 && rule.slice(1, rule.length) !== string.slice(string.length - (rule.length - 1), string.length)) return false
        }

        const rules = grammar.find(row => row.nonterminal === proxRule)
        if (!rules) return false

        for (let r of rules.terminal) {
          
            if (validate(grammar, rule.replace(proxRule, r), string, type)) {
                return true
            }
        }
    }

    const handleValidator = (terminal, nonterminal) => {
        if (terminal === nonterminal) {
            aux = false
        }
    }
    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="title">Simulador de GR</h1>
                <div className="page-content">
                    <p>Insira sua gramática regular aqui(GLUD ou GLUE). O símbolo de início já foi preenchido para você.</p>
                    <ul>
                        <li>
                            <p>O não-terminal esquerdo de cada campo deve ser preenchido.</p>
                        </li>
                        <li>
                            <p>Para campo de texto vazio utilize épsilon: ε.</p>
                        </li>
                    </ul>

                    <div className="grammar-container">
                        {rules.map(rule => (
                            <div className="production-container" key={rule.id}>
                                <div className="production-rule">
                                    <input name="nonterminal" type="text" readOnly={rule.id === 1} value={rule.nonterminal} onChange={event => handleChangeNtInput(rule.id, event)} maxLength={1} />
                                    <p className="arrow">➜</p>
                                    <input name="terminal" type="text" value={rule.terminal} onChange={event => handleChangeInput(rule.id, event)} placeholder="ε" maxLength={2} />
                                </div>
                                <div className={`error-sintax ${rule.terminal === rule.nonterminal ? 'block' : 'inactive'}`} >Erro de Sintaxe</div>
                                {handleValidator(rule.terminal, rule.nonterminal)}
                                <button className={`removeButton ${rule.id === 1 ? 'disableButton' : ''}`} disabled={rule.id === 1} onClick={() => handleRemoveFields(rule.id)}>-</button>
                            </div>
                        ))}
                        <button className="addButton" onClick={handleAddRules}>+ Adicionar Regra</button>
                    </div>

                    <div className="test-container">
                        <h3>Testar</h3>
                        <div className="table-container">
                            <div className="textarea-input">
                                <span>
                                    Para testar a GR acima, insira as strings de teste aqui, uma por linha. Uma linha vazia corresponde à string vazia. Os resultados serão mostrados automaticamente.</span>
                                <textarea rows="15" cols="33" disabled={!aux} onChange={handleStrings}></textarea>
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
                                        {strings.map((string, index) => (
                                            <tr key={index} className={grammarValidate(string) ? 'accepted' : 'rejected'}>

                                                <td>
                                                    {index}
                                                </td>
                                                <td>
                                                    {`"${string}"`}
                                                </td>
                                                <td>
                                                    {grammarValidate(string) ? "sim" : "não"}
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