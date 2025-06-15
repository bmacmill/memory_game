import { useState } from 'react'
import "./App.css"
import Form from '../components/Form';
import MemoryCard from '../components/MemoryCard';



export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    
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
            console.log(data)

            setIsGameOn(true)
           // console.log(dataSample)
            //findImage(data)
            setEmojisData(getRandomImages(data))
            
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

    function getRandomImages(array){
       
        const arr = getRandomIndices(array)
        const newDataArray = []
    
        arr.forEach(el=>{
            newDataArray.push(array[el])
        })
      
        return newDataArray 
    }
    
    function turnCard() {
        console.log("Memory card clicked")
    }
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} emojisData={emojisData}/>}
        </main>
    )
}