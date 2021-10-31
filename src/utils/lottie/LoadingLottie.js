import React, { Component } from 'react'
import Lottie from 'react-lottie'
import starting from './starting.json'
//Control Lottie Animation when start loading website
export default class LoadingLottie extends Component {
    
    render(){
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: starting,
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
