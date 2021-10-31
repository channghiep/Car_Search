import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './BurgerMenu.css';

export default function BurgerMenu(props) {
    const [open, setOpen] = useState(false)
    //Control body overflow
    function overFlow(op){
      const body = document.querySelector("body");
      if(!op){
        body.style.overflow = "hidden"
      }else{
        body.style.overflow = "auto"
      }
    }
    //---------------------------//
    //Burger Menu Controller
    function openMenuBar() {
        setOpen(!open)
        overFlow(open)
    }
    function openMenuBar1() {
        setOpen(!open)
        overFlow(open)
        props.setMenuItem('toyota')
    }
    function openMenuBar2() {
        setOpen(!open)
        overFlow(open)
        props.setMenuItem('honda')
    }
    function openMenuBar3() {
        setOpen(!open)
        overFlow(open)
        props.setMenuItem('bmw')
    }
    //---------------------------//
    
    return (
        <div className="toggle-btn">
            <button className={`${open ? "changed-btn" : " "}`} onClick={() => openMenuBar()}>
                <div className="toggle-btn__line"></div>
                <div className="toggle-btn__line"></div>
                <div className="toggle-btn__line"></div>
            </button>
            <nav className="side-drawer">
                <div className="side-drawer-items">
                    <ul>
                        <li style={{cursor:"pointer"}}><Link onClick= {openMenuBar1} to="/" >Toyota</Link></li>
                        <li style={{cursor:"pointer"}}><Link onClick= {openMenuBar2} to="/"><a  href="/">Honda</a></Link></li>
                        <li style={{cursor:"pointer"}}><Link onClick= {openMenuBar3} to="/"><a  href="/">BMW</a></Link></li>
                    </ul>
                </div>

            </nav>
        </div>
        
    )
}