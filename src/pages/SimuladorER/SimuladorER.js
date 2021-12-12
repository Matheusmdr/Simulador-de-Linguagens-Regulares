import { useState } from "react";
import { Header } from "../../components/Header/Header";
import ScienceIcon from '@mui/icons-material/Science';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import "./SimuladorER.scss"


export function SimuladorER() {
    const [count, setCount] = useState(2)
    const [tests, setTests] = useState([{ id: 1, string: "" },])

    const handleAddTests = () => {
        setTests([...tests, { id: count, string: "" }])
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
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setTests(newInputFields);
    }


    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="title">Simulador de ER</h1>
                <div className="page-content">
                    <div className="RegEX">
                        <label htmlFor="regex-input"> REGULAR EXPRESSION </label>
                        <input type="text" name="regex-input" placeholder="insira sua expressão regular aqui" />
                    </div>
                    <div className="tests-title">
                        <ScienceIcon className="science-icon" />
                        <h2>Tests</h2>
                    </div>
                    <div className="tests-container">
                        {tests.map(test => (
                            <div className="string-container" key={test.id}>
                                <RemoveCircleOutlineIcon className={`remove-button ${test.id === 1 ? 'disable-button' : ''}`} disabled={test.id === 1} onClick={() => handleRemoveTests(test.id)}/>
                                <div  className={`box-string ${test.id === 1 ? 'fix-margin' : ''}`}>
                                    <label htmlFor="input-string">TEST STRING</label>
                                    <input type="text" name="input-string" value={test.string} onChange={event => handleChangeInput(test.id, event)} placeholder="insira sua string de teste aqui" />
                                </div>
                            </div>
                        ))}
                        <div className="box-button">
                            <button className="add-button" onClick={handleAddTests} >+ Add TEST</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}