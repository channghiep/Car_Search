import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './lf30_nhg4au0e.json'

class Loading extends Component {
    
    render(){

        const defaultOptions = {
            speed:"2.5",
            loop: true,
            autoplay: true,
            animationData: animationData,
            redererSetting: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return(
            <Lottie options={defaultOptions}
                height={300}
                width={300}
            />
        )
    }
}

export default Loading;