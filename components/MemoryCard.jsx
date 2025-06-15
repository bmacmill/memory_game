import React from "react"
import {decodeEntity} from 'html-entities';

export default function MemoryCard({ handleClick, emojisData }) {
    const emojiArray = ['🐶', '🐷', '🐙', '🐛', '🐵', '🐶', '🐷', '🐙', '🐛', '🐵']
    function shuffle(arr) {
        let i = arr.length, j, temp;
        while(--i > 0){
            j = Math.floor(Math.random()*(i+1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr
        }

    const doubledData = [...emojisData, ...emojisData]
    const sortedArr = shuffle(doubledData)
    const emojiEl = sortedArr.map((emoji, index) =>
        <li key={index} className="card-item">
            <button
                className="btn btn--emoji"
                onClick={handleClick}
            >
                {decodeEntity(emoji.htmlCode[0])}
            </button>
        </li>
    )
    
    return <ul className="card-container">{emojiEl}</ul>
}