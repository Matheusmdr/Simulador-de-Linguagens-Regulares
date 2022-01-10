import { useState } from "react";
import { Header } from "../../components/Header/Header";
import ScienceIcon from '@mui/icons-material/Science';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import "./SimuladorER.scss"


export function SimuladorER() {
    const [count, setCount] = useState(2)
    const [tests, setTests] = useState([{ id: 1, string: "", accepted: ""},])

    const handleChangeRegex = () => {
        let newInputFields;
        let regex_input = document.getElementsByName("regex-input")[0];
        let regex_label = document.getElementById("regex-label");

        if(validate("") === "error"){
            regex_input.style.background = "red";
            regex_label.innerHTML = "EXPRESSÃO REGULAR <span class='error-msg'>(Erro de síntaxe)</span> ";

            newInputFields = tests.map(i => {
                i['accepted'] = "";
                
                return i;
            })
        }
        else{
            regex_input.style.background = "#434854";
            regex_label.innerHTML = "EXPRESSÃO REGULAR";

            newInputFields = tests.map(i => {
                i['accepted'] = validate(i.string);
                
                return i;
            })
        }

        setTests(newInputFields);
        console.log(tests)
    }

    const handleAddTests = () => {
        let validation = validate("");;
        setTests([...tests, { id: count, string: "", accepted: ((validation === "error") ? "" : validation) }])
        setCount(count + 1)
    }

    const handleRemoveTests = id => {
        const values = [...tests];
        values.splice(values.findIndex(value => value.id === id), 1);
        setTests(values);
    }

    const handleChangeInput = (id, event) => {
        const newInputFields = tests.map(i => {
            if (id === i.id) {
                let value = event.target.value;
                let validation = validate(value);
                i[event.target.name] = value;
                if(validation === "error"){
                    i['accepted'] = "";
                }
                else{
                    i['accepted'] = validation;
                }
            }
            return i;
        })
        
        setTests(newInputFields);
        console.log(tests)
    }

    const validate = value => {
        try{
            let regex_input = (document.getElementsByName("regex-input")[0]).value;
            let regex = new RegExp(regex_input);
            return (regex_input === "") ? "" : (regex.test(value) ? "true"  : "false");
        }
        catch(e){
            return "error";
        }
        
    }

    return (
        <div> 
            <Header />
            <div className="container">
                <h1 className="title">Simulador de ER</h1>
                <div className="page-content">
                    <div className="RegEX">
                        <label id="regex-label" htmlFor="regex-input"> EXPRESSÃO REGULAR</label>
                        <input type="text" name="regex-input" onChange={handleChangeRegex} placeholder="insira sua expressão regular aqui" />
                    </div>
                    <div className="tests-title">
                        <ScienceIcon className="science-icon" />
                        <h2>Testes</h2>
                    </div>
                    <div className="tests-container">
                        {tests.map(test => (
                            <div className="string-container" key={test.id}>
                                <RemoveCircleOutlineIcon className={`remove-button ${test.id === 1 ? 'disable-button' : ''}`} disabled={test.id === 1} onClick={() => handleRemoveTests(test.id)}/>
                                <div  className={`box-string ${test.id === 1 ? 'fix-margin' : ''}`}>
                                    <label htmlFor="string">STRING DE TESTE</label>
                                    <input type="text" name="string" className={`${test.accepted === '' ? 'none' : (test.accepted === "true" ? 'accepted' : 'rejected')}`} value={test.string} onChange={event => handleChangeInput(test.id, event)} placeholder="insira sua string de teste aqui" />
                                </div>
                            </div>
                        ))}
                        <div className="box-button">
                            <button className="add-button" onClick={handleAddTests} >+ Adicionar Teste</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}