import { useState } from 'react'
import "./App.css"
import Form from '../components/Form';
import MemoryCard from '../components/MemoryCard';



export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
   // console.log(selectedCards)
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


    console.log(selectedCards)

    function turnCard(name, index) {
        const clickedCard = selectedCards.find((emoji) => emoji.index === index)
        //console.log("cc", clickedCard)
        //console.log(`The emoji ${name} at index ${index} was clicked!`)
        //console.log("Memory card clicked", e.target.textContent)
        // if(!clickedCard && selectedCards.length < 2){
        //      setSelectedCards(prevCard => [...prevCard, {clickedCard}])
        //     //setSelectedCards(clickedCard)
            
        // } else if(!clickedCard && selectedCards.length === 2){

        //     setSelectedCards({clickedCard})
             
        // } 

        if(selectedCards.length === 0 || selectedCards.length === 2){
                setSelectedCards({clickedCard})
             
            //setSelectedCards(clickedCard)
            
        } else if(!clickedCard && selectedCards.length === 1){
            setSelectedCards(prevCard => [...prevCard, {clickedCard}])
            //setSelectedCards({clickedCard})
             
        } 
    
    }
        function turnCard(name, index) {
        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
        
        if (!selectedCardEntry && selectedCards.length < 2) {
            setSelectedCards(prevSelectedCards => [...prevSelectedCards, { name, index }])
        } else if (!selectedCardEntry && selectedCards.length === 2) {
            setSelectedCards([{ name, index }])
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