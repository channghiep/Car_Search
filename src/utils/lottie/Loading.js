import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './loading.json'

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
            <div>
                <Lottie options={defaultOptions}
                    height={400}
                    width={400}
                />
            </div>
        )
    }
}

export default Loading;