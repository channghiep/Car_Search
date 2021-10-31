import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './BurgerMenu.css';

export default function BurgerMenu() {
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
                        <li><Link onClick= {openMenuBar} to="/"><a href="/">Toyota</a></Link></li>
                        <li><Link onClick= {openMenuBar} to="/"><a href="/">Honda</a></Link></li>
                        <li><Link onClick= {openMenuBar} to="/"><a href="/">BMW</a></Link></li>
                    </ul>
                </div>

            </nav>
        </div>
        
    )
}