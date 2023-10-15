import React from "react";
import './card.css'
import ensure from '../assets/ensure.png'
import {cards} from '../data/card'
const Card =() =>{

    return (  
        <div className="card-container">
        <button className="prev-button">P</button>
        {cards && cards.map((card,index)=>(
            <div className="card" key={index}>
                <div className="card-headers">
                    <img src={ensure}/>
                    <button className="button-on-image">{card.off}</button>
                </div>
                <div className="card-body">
                    <div className="card-title">
                    <p>{card.title}</p>
                    </div>
                    <div className="card-brand">
                        <label>Brand:</label><p>{card.brand}</p> 
                    </div>
                    <div className="card-price">
                        <label>MRP:</label><label className="mrp">{card.mrp}</label> 
                        <p>OFFER:</p><p>{card.offer}</p> 
                    </div>
                </div>
                <div className="card-footer-css">
                    <button className="card-add-to-cart">
                        ADD TO CARD
                    </button>
                    <button className="card-buy-now">
                        BUY NOW
                    </button>
                </div>
            </div>
        ))}
        <button className="prev-button">N</button>
        </div>  
    )
}

export default Card;