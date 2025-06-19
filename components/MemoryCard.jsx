import React from "react"
import {decodeEntity} from 'html-entities';

export default function MemoryCard({ handleClick, emojisData }) {



   
    const emojiEl = emojisData.map((emoji, index) =>
        <li key={index} className="card-item">
            <button
                className="btn btn--emoji"
                onClick={()=>handleClick(emoji.name, index)}
            >
                {decodeEntity(emoji.htmlCode[0])}
            </button>
        </li>
    )
    
    return <ul className="card-container">{emojiEl}</ul>
}