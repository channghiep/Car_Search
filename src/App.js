import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom"
import './App.css'
import '@yaireo/ui-switch/src/switch.scss'
import "./styles.scss" // basic styles for this demo/

// import TagifyWithTemplates from "./TagifyWithTemplates"
import CrazyTags from "./CrazyTags"
// import MixedModeTagify from "./MixedModeTagify"

export default function App() {
  return (
       <Router>
         <div className="App">
          <header>
          <div className="header">
            Fin<span style={{color: '#008964', fontWeight:'ligher'}}>da</span>Car
          </div>

          </header>

          <Switch>
            {/* <Route exact path="/TagifyWithTemplates" component={TagifyWithTemplates} /> */}
            <Route exact path="/CrazyTags" component={CrazyTags} />
            {/* <Route exact path="/MixedModeTagify" component={MixedModeTagify} /> */}
            <Redirect exact from="/" to="/CrazyTags" />
          </Switch>
         </div>
      
    </Router>
   
  )
}