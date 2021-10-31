import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom"
import './App.css'
//External style
import '@yaireo/ui-switch/src/switch.scss'
//External Library
import BurgerMenu from "./utils/BurgerMenu"
import TagifySearch from "./components/Tagify-Component/TagifySearch"
import LoadingLottie from './utils/lottie/LoadingLottie'

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer =  setTimeout(() => {
      setLoading(false)
    },4000)
    return () => clearTimeout(timer)
  },[])
  return (
    <div className="App">
      {loading ?
        <div class="preload-wrapper">
          <div class="preload-item">
            <LoadingLottie/> 
          </div>
        </div>
      :
        <Router>
          <header>
            <BurgerMenu/>
            <a style={{textDecoration:'none', color:'white'}} href="http://localhost:3000">
              <div className="header">
                Fin<span style={{color: '#008964', fontWeight:'ligher'}}>da</span>Car
              </div>
            </a>
          </header>
          <Switch>
            <Route exact path="/" component={TagifySearch} />
          </Switch>
        </Router>
      }
    </div>  
  )
}