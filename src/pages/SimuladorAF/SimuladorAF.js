import { useState } from "react";
import Modal from 'react-modal';
import { Header } from "../../components/Header/Header";
import "./SimuladorAF.scss";
import "./ModalAddState.scss";
import "./ModalAddTransition.scss"



Modal.setAppElement('body')

export function SimuladorAF() {
    const [countState, setCountStates] = useState(1)
    const [states, setStates] = useState([]) //{ id: 1, name: "", start: false, final: false}

    const [countTransition, setCountTransitions] = useState(1)
    const [transitions, setTransitions] = useState([]) //{ id: 1, origin_state: "", input_char: "", dest_state: ""}


    //Add State
    const [modalAddStateIsOpen, setModalAddStateOpen] = useState(false)

    const handleAddStateModal = () => {
        setModalAddStateOpen(prev => !prev)
    }

    const addNewState = () => {
        let value = (document.getElementsByName("add-state-input")[0].value);
        
        if(value !== ""){
            setStates([...states, { id: countState , name: value, start: false, final: false}])
            setCountStates(countState + 1)

            handleAddStateModal()
        }
    }

    //Add Transition
    const [modalAddTransitionIsOpen, setModalAddTransitionOpen] = useState(false)

    const handleAddTransitionModal = () => {
        setModalAddTransitionOpen(prev => !prev)
    }

    const addNewTransition = () => {
        let value = (document.getElementsByName("add-state-input")[0].value);
        
        if(value !== ""){
            setStates([...states, { id: countState , name: value, start: false, final: false}])
            setCountStates(countState + 1)

            handleAddStateModal()
        }
    }

    //Info State
    
    //Tests
    const changeTestType = (event) => {
        let arrClass = event.target.classList;

        if(arrClass[2] !== "is-active"){
            event.target.classList.toggle("is-active");

            if(arrClass[0] === "single-test"){
                let multi = (document.getElementsByClassName("multi-test"))[0];
                multi.classList.toggle("is-active");


                let multi_box = (document.getElementsByClassName("multi-box"))[0];
                multi_box.style.display = "none";


                let single_box = (document.getElementsByClassName("single-box"))[0];
                single_box.style.display = "flex";


            }
            else{
                let single = (document.getElementsByClassName("single-test"))[0];
                single.classList.toggle("is-active");


                let single_box = (document.getElementsByClassName("single-box"))[0];
                single_box.style.display = "none";


                let multi_box = (document.getElementsByClassName("multi-box"))[0];
                multi_box.style.display = "block";
            }
        }

    }

    return (
        <div>
            <Header />
            <div className="container">

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalAddStateIsOpen}
                    onRequestClose={handleAddStateModal}
                    className="add-state-content"
                    overlayClassName="add-state-overlay"
                >
                    <div className="add-state-box">
                        <h2>Novo Estado</h2>
                        <p>Insira o nome do novo estado abaixo e confirme: </p>
                        <input type="text" name="add-state-input" maxLength={10} placeholder="Ex: q1" />
                        <div className="add-state-buttons">
                                <button className="add-state-button" onClick={addNewState}>Add</button>
                                <button className="cancel-state-button" onClick={handleAddStateModal}>Cancel</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalAddTransitionIsOpen}
                    onRequestClose={handleAddTransitionModal}
                    className="add-transition-content"
                    overlayClassName="add-transition-overlay"
                >
                    <div className="add-transition-box">
                        <h2>Nova Transição</h2>
                        <p>Insira o caractere da nova transição abaixo e confirme: </p>
                        <p>(Obs: deixe para vazio para caractere vazio)</p>
                        <input type="text" name="add-transition-input" maxLength={1} placeholder="Ex: a" />
                        <div className="select-box">
                            <div>
                                <h3>Origem:</h3>
                                <select></select>
                            </div>
                            <div>
                                <h3>Destino:</h3>
                                <select></select>
                            </div>
                        </div>
                        <div className="add-transition-buttons">
                                <button className="add-transition-button">Add</button>
                                <button className="cancel-transition-button" onClick={handleAddTransitionModal}>Cancel</button>
                        </div>
                    </div>
                </Modal>

                
                <h1 className="title">Simulador de Automatos</h1>
                <div className="page-content">
                    <div className="automaton-menu">
                        <button className="menu-button" onClick={handleAddStateModal}>Add State</button>
                        <button className="menu-button" onClick={handleAddTransitionModal}>Add Transition</button>
                        <button className="menu-button" >Remove</button>
                    </div>
                    <div id="automaton" className="automaton-box">
                    </div>

                      
                    <div className="select-test">
                        <p className="single-test select is-active" onClick={event => changeTestType(event)} >Single Test</p>
                        <p className="multi-test select" onClick={event => changeTestType(event)} >Multi Test</p>
                    </div>
                    <div className="test-box">
                        <div className="single-box">
                            <label id="automaton-label" htmlFor="automaton-input"> TEST STRING</label>
                            <input type="text" name="automaton-input" placeholder="insira sua string de teste aqui" />
                            <div className="single-buttons">
                                <button className="test-button">Test</button>
                                <button className="step-button">Step-by-step</button>
                            </div>
                        </div>
                        <div className="multi-box">
                            
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}