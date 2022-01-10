import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-modal';
import { Graphviz } from 'graphviz-react';
import { Header } from "../../components/Header/Header";
import "./SimuladorAF.scss";
import "./ModalState.scss";
import "./ModalTransition.scss"
import "./ModalClickNode.scss"



Modal.setAppElement('body')

export function SimuladorAF() {
    const [graphString, setGraphString] = useState(`digraph{}`)
    const [startCheck, setStartCheck] = useState(false)
    const [finalCheck, setFinalCheck] = useState(false)
    const [clickedNode, setClickedNode] = useState("")
    const [countState, setCountStates] = useState(1)
    const [states, setStates] = useState([]) //{ id: 1, name: "", start: false, final: false}

    const [countTransition, setCountTransitions] = useState(1)
    const [transitions, setTransitions] = useState([]) //{ id: 1, origin_state: "", input_char: "", dest_state: ""}


    //Add State
    const [modalAddStateIsOpen, setModalAddStateOpen] = useState(false)

    const handleAddStateModal = () => {
        setModalAddStateOpen(prev => !prev)
    }

    useEffect(() => {
        const handleGraphvizString = () => {
            let transitionsArray = transitions

            let statesArray = states

            let string = `digraph{`
            let color = "#61DAFB"
            for (let i = 0; i < statesArray.length; i++) {
                string += statesArray[i].name + `[shape=${statesArray[i].final? 'doublecircle' : 'circle'} style=filled  fillcolor="${statesArray[i].start? color : ''}"];`
            }
            for (let j = 0; j < transitionsArray.length; j++) {
                string += transitionsArray[j].origin_state + "->" + transitionsArray[j].dest_state + `[label=${transitionsArray[j].input_char}]`
            }
            string += `bgcolor=transparent}`
            setGraphString(string)
        }


        handleGraphvizString();
    });

    const [modalClickNodeIsOpen, setClickNodeIsOpen] = useState(false)

    const handleClickNodeModal = () => {
        setClickNodeIsOpen(prev => !prev)
    }

    const handleClickNode = (e) => {
        let node = e.target.textContent
        let aux = false
        if (node.length > 0 && typeof node !== "undefined") {
            aux = true
            setClickedNode(node)
            for(let i = 0; i < states.length; i++){
                if(states[i].name === node){
                    setStartCheck(states[i].start)
                    setFinalCheck(states[i].final)
                }
            }
            setClickNodeIsOpen(aux)
        }
    }

    useEffect(() => {
        let nodes = document.querySelectorAll(".graph .node")
        nodes.forEach(node => {
            node.addEventListener('dblclick', (event) => handleClickNode(event))
        })

        return () => {
            nodes.forEach(node => {
                node.removeEventListener('dblclick', (event) => handleClickNode(event))
            })
        };
    });

    const addNewState = () => {
        let value = (document.getElementsByName("add-state-input")[0].value);
        if (value !== "") {
            let aux = true
            for (let i = 0; i < states.length; i++) {
                if (states[i].name === value) {
                    aux = false
                }
            }
            if (aux) {
                let statesArray = ([...states, { id: countState, name: value, start: false, final: false }])
                setStates(statesArray)
                setCountStates(countState + 1)
            }
            handleAddStateModal()
        }
    }
    //Add Transition
    const [modalAddTransitionIsOpen, setModalAddTransitionOpen] = useState(false)

    const handleAddTransitionModal = () => {
        setModalAddTransitionOpen(prev => !prev)
    }

    const addNewTransition = () => {
        let value = (document.getElementsByName("add-transition-input")[0].value);
        let start = (document.querySelector("#add-start-transition-input")).value;

        let final = (document.querySelector("#add-final-transition-input")).value;
        if (value !== "") {
            let transitionsArray = ([...transitions, { id: countTransition, origin_state: start, input_char: value, dest_state: final }])
            let aux = []
            for (let i = 0; i < transitionsArray.length; i++) {
                aux.push({ origin_state: transitionsArray[i].origin_state, input_char: transitionsArray[i].input_char, dest_state: transitionsArray[i].dest_state })
            }
            aux = aux.filter(function (a) {
                return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
            }, Object.create(null))

            transitionsArray = []
            for (let i = 0; i < aux.length; i++) {
                let id = i + 1
                transitionsArray.push({ id: id, origin_state: aux[i].origin_state, input_char: aux[i].input_char, dest_state: aux[i].dest_state })
            }

            setTransitions(transitionsArray)
            setCountTransitions(countTransition + 1)
            handleAddTransitionModal()
        }
    }

    const removeState = () => {
        let stateId = parseInt((document.querySelector("#remove-state-input").value))
        let values = []
        let stateName = ""
        for (let i = 0; i < states.length; i++) {
            if (states[i].id !== stateId) {
                values.push(states[i])
            }
            if (states[i].id === stateId) {
                stateName = states[i].name
            }
        }
        setStates(values)
        values = []

        for (let i = 0; i < transitions.length; i++) {
            if (transitions[i].dest_state !== stateName && transitions[i].origin_state !== stateName) {
                values.push(transitions[i])
            }
        }
        setTransitions(values)
        handleRemoveStateModal()

    }

    const removeTransition = () => {
        let transitionId = parseInt((document.querySelector("#remove-transition-input").value))
        let values = []
        for (let i = 0; i < transitions.length; i++) {
            if (transitions[i].id !== transitionId) {
                values.push(transitions[i])
            }
        }
        setTransitions(values)
        handleRemoveTransitionModal()
    }
    //Info State

    //Tests
    const changeTestType = (event) => {
        let arrClass = event.target.classList;

        if (arrClass[2] !== "is-active") {
            event.target.classList.toggle("is-active");

            if (arrClass[0] === "single-test") {
                let multi = (document.getElementsByClassName("multi-test"))[0];
                multi.classList.toggle("is-active");

                let multi_box = (document.getElementsByClassName("multi-box"))[0];
                multi_box.style.display = "none";

                let single_box = (document.getElementsByClassName("single-box"))[0];
                single_box.style.display = "flex";

            }
            else {
                let single = (document.getElementsByClassName("single-test"))[0];
                single.classList.toggle("is-active");

                let single_box = (document.getElementsByClassName("single-box"))[0];
                single_box.style.display = "none";

                let multi_box = (document.getElementsByClassName("multi-box"))[0];
                multi_box.style.display = "block";
            }
        }
    }

    const [modalRemoveTransitionIsOpen, setModalRemoveTransitionIsOpen] = useState(false)

    const handleRemoveTransitionModal = () => {
        setModalRemoveTransitionIsOpen(prev => !prev)
    }

    const [modalRemoveStateIsOpen, setRemoveStateIsOpen] = useState(false)

    const handleRemoveStateModal = () => {
        setRemoveStateIsOpen(prev => !prev)
    }

    const handleClickedNodeChanges = () =>{
        let startCheckbox = document.querySelector("#start-checkbox").checked
        let finalCheckbox = document.querySelector("#final-checkbox").checked
        let values = []

        if(startCheckbox){
            for(let i = 0; i < states.length; i++){
                if(states[i].name === clickedNode){
                    values.push({ id: states[i].id, name: states[i].name, start: startCheckbox, final: finalCheckbox })
                }
                else{
                    values.push({ id: states[i].id, name: states[i].name, start: false, final: states[i].final })
                }
            }

        }
        
        else{
            for(let i = 0; i < states.length; i++){
                if(states[i].name === clickedNode){
                    values.push({ id: states[i].id, name: states[i].name, start: states[i].start, final: finalCheckbox })
                }
                else{
                    values.push({ id: states[i].id, name: states[i].name, start: states[i].start, final: states[i].final })
                }
            }
        }
        setStates(values)
        setClickNodeIsOpen(false)
    }

    return (
        <div>
            <Header />
            <div className="container">

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalClickNodeIsOpen}
                    onRequestClose={handleClickNodeModal}
                    className="click-node-content"
                    overlayClassName="click-node-overlay"
                >
                    <div className="click-node-box">
                        <h2>Estado selecionado: {clickedNode}</h2>
                        <div className="checkbox-box">
                            <div className="checkbox-container">
                                <input type="checkbox" name="start" id="start-checkbox" defaultChecked={startCheck} />
                                <label htmlFor="start">Estado inicial</label>
                            </div>
                            <div className="checkbox-container">
                                <input type="checkbox" name="final" id="final-checkbox"  defaultChecked={finalCheck}/>
                                <label htmlFor="final">Estado final</label>
                            </div>
                        </div>


                        <div className="click-node-buttons">
                            <button className="click-node-button" onClick={handleClickedNodeChanges} >Confirmar</button>
                            <button className="cancel-node-button" onClick={handleClickNodeModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

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
                            <button className="add-state-button" onClick={addNewState}>Adicionar</button>
                            <button className="cancel-state-button" onClick={handleAddStateModal}>Cancelar</button>
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
                                <select id="add-start-transition-input">
                                    {states.map(state => (
                                        <option key={state.name} value={state.name}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <h3>Destino:</h3>
                                <select id="add-final-transition-input">
                                    {states.map((state, index) => (
                                        <option key={state.name} value={state.name}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="add-transition-buttons">
                            <button className="add-transition-button" onClick={addNewTransition}>Adicionar</button>
                            <button className="cancel-transition-button" onClick={handleAddTransitionModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalRemoveStateIsOpen}
                    onRequestClose={handleRemoveStateModal}
                    className="remove-state-content"
                    overlayClassName="remove-state-overlay"
                >
                    <div className="remove-state-box">
                        <h2>Remover Estado</h2>
                        <p>Selecione o Estado que deseja remover:</p>
                        <div className="select-box">
                            <div>
                                <select id="remove-state-input">
                                    {states.map((state, index) => (
                                        <option key={state.id} value={state.id}>{state.name}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className="remove-state-buttons">
                            <button className="remove-state-button" onClick={removeState}>Remover</button>
                            <button className="cancel-state-button" onClick={handleRemoveStateModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalRemoveTransitionIsOpen}
                    onRequestClose={handleRemoveTransitionModal}
                    className="remove-transition-content"
                    overlayClassName="remove-transition-overlay"
                >
                    <div className="remove-transition-box">
                        <h2>Remover Transição</h2>
                        <p>Selecione a Transição que deseja remover:</p>
                        <div className="select-box">
                            <div>
                                <select id="remove-transition-input">

                                    {transitions.map((transition, index) => (
                                        <option key={transition.id} value={transition.id}>{transition.origin_state + "->" + transition.dest_state + `[label: ${transition.input_char}]`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="remove-transition-buttons">
                            <button className="remove-transition-button" onClick={removeTransition}>Remover</button>
                            <button className="cancel-transition-button" onClick={handleRemoveTransitionModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

                <h1 className="title">Simulador de Autômatos</h1>
                <div className="page-content">
                    <div className="automaton-menu">
                        <button className="menu-button" onClick={handleAddStateModal}>Adicionar Estado</button>
                        <button className="menu-button" onClick={handleAddTransitionModal} disabled={states.length < 1} >Adicionar Transição</button>
                        <button className="menu-button" disabled={states.length < 1} onClick={handleRemoveStateModal}>Remover Estado</button>
                        <button className="menu-button" disabled={transitions.length < 1} onClick={handleRemoveTransitionModal}>Remover Transição</button>
                    </div>
                    <div id="automaton" className="automaton-box">
                        <Graphviz options={{ fit: true, scale: 1, zoom: false }} dot={graphString} />
                    </div>


                    <div className="select-test">
                        <p className="single-test select is-active" onClick={event => changeTestType(event)} >Single Test</p>
                        <p className="multi-test select" onClick={event => changeTestType(event)} >Multi Test</p>
                    </div>
                    <div className="test-box">
                        <div className="single-box">
                            <label id="automaton-label" htmlFor="automaton-input"> TESTAR STRING</label>
                            <input type="text" name="automaton-input" placeholder="insira sua string de teste aqui" />
                            <div className="single-buttons">
                                <button className="test-button">Testar</button>
                                {/*<button className="step-button">Step-by-step</button>*/}
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