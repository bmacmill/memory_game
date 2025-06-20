import { useState } from 'react'
import "./App.css"
import Form from '../components/Form';
import MemoryCard from '../components/MemoryCard';



export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    console.log(selectedCards)
    async function startGame(e) {
        e.preventDefault()
        try {
            const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
            if(!response.ok){
              throw new Error("Api is not working")
            }
            const data = await response.json()
            // const rand = Math.floor(Math.random() * 102)  
            
            
            //const dataSample = data.slice(0, 5)
            // console.log(data)

            setIsGameOn(true)
          // console.log(dataSample)
           const randomIndices = getRandomCards(data)
           console.log("rando", randomIndices)
           const shuffledArray = shuffle(randomIndices)
          console.log(shuffledArray)
            setEmojisData(shuffledArray)
            
        } catch(err){
          console.error(err)
        }
        
    }


    function getRandomIndices(array){
        const emojisArray = []
       
        for(let i = 0; i < 5; i++){
            const rand = Math.floor(Math.random() * array.length) 
            if(!emojisArray.includes(rand)){
                emojisArray.push(rand)
            } else {
                i--
            }
        }
        return emojisArray
    }

    function getRandomCards(array){
       
        const arr = getRandomIndices(array)
        const newDataArray = []
    
        arr.forEach(el=>{
            newDataArray.push(array[el])
        })
      
        return newDataArray 
    }
       // fischer yates shuffle... straight copy paste
    function shuffle(arr) {
        const doubledData = [...arr, ...arr]
        let i = doubledData.length, j, temp;
        while(--i > 0){
            j = Math.floor(Math.random()*(i+1));
            temp = doubledData[j];
            doubledData[j] = doubledData[i];
            doubledData[i] = temp;
        }
        return doubledData
    }

    
    //const sortedArr = shuffle(emojisData)


    function turnCard(name, index) {
        const clickedCard = [{name, index}]
        //console.log(`The emoji ${name} at index ${index} was clicked!`)
        //console.log("Memory card clicked", e.target.textContent)
        if(selectedCards.length === 0){
            setSelectedCards(clickedCard)
        } else if(selectedCards.some((card)=> card.index != index) && selectedCards.length === 1){
            setSelectedCards(prevCard => [...prevCard, clickedCard])
        } else  {
            return
        }
        
      
    }
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} emojisData={emojisData}/>}
        </main>
    )
}