import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow]=useState(false)
  const [charAllow, setCharAllow]=useState(false)
  const [password, setpassword]=useState("")

  //password generator
const passwordgen=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numAllow) str+="0123456789"
  if(charAllow) str+="!@#$%^&*"
  for(let i=1; i<=length; i++){
    let char= Math.floor(Math.random()*str.length +1)
    pass+= str.charAt(char)
  }
  setpassword(pass)
  copybtn.current.textContent="copy"
}, [length, numAllow, charAllow,setpassword])
// re renders if any dependencies are changed
useEffect(()=>{
  passwordgen()
},
   [length, charAllow, numAllow, setpassword])
// reference or interlink
let passRef= useRef(null)
let copybtn= useRef(null)
const copytoclip= useCallback(()=>{
  passRef.current?.select()
  passRef.current?.setSelectionRange(0,50)
  copybtn.current.textContent="copied"
  window.navigator.clipboard.writeText(password)}
,[password])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-5 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='justify-center flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='w-full p-3 outline-none'
          style={{backgroundColor:"white"}}
          type='text'
          value={password}
          placeholder='set your password'
          readOnly
          ref={passRef}
          />
          <button
          className='outline-none text-white px-3 py-0.5 shrink-0 cursor-pointer hover:scale-110'
          style={{backgroundColor:"blue"}}
          onClick={copytoclip}
          ><p ref={copybtn}>copy</p></button>
        </div>
        <div className='flex flex-row text-sm gap-4'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          className='cursor-pointer'
          value={length}
          min={8}
          max={50}
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-1'>
          <input type="checkbox"
          className='cursor-pointer'
          id="numinp"
          defaultChecked={numAllow}
          onChange={()=>{
            setNumAllow((prev)=>!prev)}}
           />
           <label htmlFor='numimp'>Numbers</label>
        </div>
        <div className='flex items-center gap-1'>
          <input type="checkbox"
          className='cursor-pointer'
          id='charinp'
          defaultChecked={charAllow}
          onChange={()=>{
            setCharAllow((prev)=>!prev)}} 
          />
          <label htmlFor="charinp">Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
