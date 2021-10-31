import React from 'react'
import './CarCard.css'


export default function CarCard(props){
    function addDefaultImage(e){
        e.target.src = '/default.png'
    }
    return(
        <div className="carCard">
            <div className="carImg">
                <img onError={addDefaultImage} src={`/${props.makeName.toLowerCase()}.jpg`}/>
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
                    <span style={{color: '#008964', fontWeight:'ligher'}}> Car ID </span><br/>
                    <span style={{ fontWeight:'bold'}}>{props.modelID}</span>                
                </div>
                <div style={{color: '#00563f', fontWeight:'bold'}} className='item4'>
                    DETAILS
                </div>
            </div>
        </div>
    )
}