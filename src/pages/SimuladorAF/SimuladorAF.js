import { useState } from "react";
import { Header } from "../../components/Header/Header";
import "./SimuladorAF.scss"


export function SimuladorAF() {
    const [countState, setCountStates] = useState(1)
    const [states, setStates] = useState([]) //{ id: 1, name: "", start: false, final: false}

    const [countTransition, setCountTransitions] = useState(1)
    const [transitions, setTransitions] = useState([]) //{ id: 1, origin_state: "", input_char: "", dest_state: ""}



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
                <h1 className="title">Simulador de Automatos</h1>
                <div className="page-content">
                    <div className="automaton-menu">
                        <button className="menu-button" >Add State</button>
                        <button className="menu-button" >Add Transition</button>
                        <button className="menu-button" >Remove</button>
                    </div>
                    <div className="automaton-box"></div>
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