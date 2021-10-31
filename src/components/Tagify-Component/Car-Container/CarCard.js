import React from 'react'
import './CarCard.css'

export default function CarCard(props){
    return(
        <div className="carCard">
            <div className="carImg">
                <img src='https://motorillustrated.com/wp-content/uploads/2020/09/2020-Toyota-4Runner-TRD-Off-Road-01.jpg'/>
            </div>
            <div style={{textShadow:'0 0 8px hsl(0deg 0% 100% / 33%)' }} className="carText">
                <div className='item1'>
                <span style={{color: '#008964', fontWeight:'ligher'}}>Brand </span><br/>
                <span style={{ fontWeight:'bold'}}>{props.makeName}</span>
                </div>
                <div className='item2'>
                <span style={{color: '#008964', fontWeight:'ligher'}}> Model </span><br/>
                <span style={{ fontWeight:'bold'}}>{props.modelName}</span>
                </div>
                <div className='item3'>
                {props.modelID}
                </div>
                <div style={{color: '#00563f', fontWeight:'bold'}} className='item4'>
                DETAILS
                </div>
            </div>
        </div>
    )
}