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
                    <p style={{color: '#008964', fontWeight:'ligher'}}>Brand </p>
                    <p style={{ fontWeight:'bold'}}>{props.makeName}</p>
                </div>
                <div className='item2'>
                    <p style={{color: '#008964', fontWeight:'ligher'}}> Model </p>
                    <p style={{ fontWeight:'bold'}}>{props.modelName}</p>
                </div>
                <div className='item3'>
                    <p style={{color: '#008964', fontWeight:'ligher'}}> Car ID </p>
                    <p style={{ fontWeight:'bold'}}>{props.modelName}</p>
                </div>
                    <div style={{color: '#00563f', fontWeight:'bold'}} className='item4'>
                    <p>DETAILS</p>
                    </div>
            </div>
        </div>
    )
}