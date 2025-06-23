import React from 'react'
import {Textarea} from '../components/ui/textarea'
import {Button} from '../components/ui/button'
import {useState} from 'react'
import {URL} from '../constants'
import Answer from '../components/answers'
import '../App.css'

const FirstPage = () => {
  const [question, setQuestion]=useState('')
  const [result,setResult]=useState(undefined)

  const payload = {
    "contents": [{
    "parts": [{"text": question + "Explain the code and keep it short but detailed"}]
      }]
   }

  const payload1 = {
    "contents": [{
    "parts": [{"text": question + "Debug the code and give the corrected code"}]
      }]
   }

  const payload2 = {
    "contents": [{
    "parts": [{"text": question + "Optimize the code"}]
      }]
   }

  const payload3 = {
    "contents": [{
    "parts": [{"text": question + "Give a hint to solve this problem and keep it brief"}]
      }]
   }

  const Hint= async ()=>{
    let response = await fetch(URL,{
    method:"POST",
    body:JSON.stringify(payload3)
    })
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString=dataString.split("* ")
    dataString=dataString.map((item)=>item.trim())

    setResult(dataString )
}

  const askQuestion= async ()=>{
    let response = await fetch(URL,{
    method:"POST",
    body:JSON.stringify(payload)
    })
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString=dataString.split("* ")
    dataString=dataString.map((item)=>item.trim())

    setResult(dataString )
}
 
   const Debug= async ()=>{
    let response = await fetch(URL,{
    method:"POST",
    body:JSON.stringify(payload1)
    })
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString=dataString.split("* ")
    dataString=dataString.map((item)=>item.trim())

    setResult(dataString )
}
   
   const Optimize= async ()=>{
    let response = await fetch(URL,{
    method:"POST",
    body:JSON.stringify(payload2)
    })
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString=dataString.split("* ")
    dataString=dataString.map((item)=>item.trim())

    setResult(dataString )
}

  return (
    <div className='flex justify-center'>
    <div className='text-white overflow-scroll container h-110 '>
        <ul>
        {
            result && result.map((item,index)=>(
                <li key={index}><Answer ans={item} /></li>
            ))
        }
        </ul>
    </div>
    <div className='flex flex-col gap-2 fixed bottom-5 w-full '>
    <Textarea 
  value={question} 
  onChange={(event) => setQuestion(event.target.value)}
  className="text-white resize-none overflow-y-scroll h-20 p-2 rounded"
  placeholder="Type your code here..."
/>

    <div className='flex justify-center gap-x-4'>
    <Button onClick={Hint} className='right-2 bg-green-600 hover:bg-green-700' >Hint</Button>
    <Button onClick={askQuestion} className='right-2 bg-green-600 hover:bg-green-700' >Explain</Button>
    <Button onClick={Debug} className='right-2 bg-green-600 hover:bg-green-700' >Debug</Button>
    <Button onClick={Optimize} className='right-2 bg-green-600 hover:bg-green-700' >Optimize</Button>
    </div>
    </div>
    </div>
  )
}

export default FirstPage