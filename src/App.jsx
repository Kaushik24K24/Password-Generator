import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numtick, setnumtick] = useState(false);
  const [chartick, setchartick] = useState(false);
  const [password, setpassword] = useState("sssz");

  const passwordref = useRef(null);

  const passwordgenrtor = useCallback(()=>{
   let pass ="";
   let str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
   let char = '!@#$%^&*()_+';
   let num = '1234567890';

   if(numtick) str += num;
   if(chartick) str += char;

   for (let i = 0; i < length; i++) {
     let index = Math.floor(Math.random()*str.length + 1);
     pass += str.charAt(index);

    
   }
   setpassword(pass);

  },[length,numtick,chartick,setpassword])

  const copybtn = useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
  
  useEffect(()=>{
   passwordgenrtor()

  },[length,numtick,chartick,passwordgenrtor])

  return (
    <>
     <h1 className='text-center text-2xl pt-5 text-white'>Password Genrator</h1>
     <div className='w-full bg-gray-500 max-w-md shadow-lg rounded-lg py-3 my-8 px-4 mx-auto text-orange-500'>
      <div className='flex overflow-hidden mb-2 '>
        <input type="text" 
        value={password}
        className='outline-none rounded-s-lg w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordref} />
        <button className='bg-blue-500 rounded-e-lg text-white px-3 shrink-0'
        onClick={copybtn}
      >Copy</button>
      </div>
      <div className='flex gap-x-2 '>
        <div className='flex gap-x-1'>
          <input type="range"
          min={8}
          max={50}
          defaultValue={length}
          onChange={(e)=>{setlength(e.target.value)}} 
          className='cursor-pointer '/>
          <label >length({length})</label>
        </div>
         <div className='flex gap-x-1'>

        <input type="checkbox"
        defaultChecked={numtick}
        onChange={()=>setnumtick((prev)=>!prev)}
        className='cursor-pointer'
        />
         <label >Number</label>
        </div>
        <div className='flex gap-x-1'>

        <input type="checkbox"
        defaultChecked={chartick}
        onChange={()=>setchartick((prev)=>!prev)}
        className='cursor-pointer'
        />
         <label >Charcter</label>
        </div>
      </div>
        
     </div>
    </> 
  )
}

export default App
