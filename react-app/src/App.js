import './App.css';
import regPic from '../src/images/reg-pic.jpg'
import SignIn from './components/signin/signin';
import SignUp from './components/signup/signup';
import { useState } from 'react';


function App() {

  const [formState, setFormState] = useState('signUp')

  return (
    <div 
      className='
        p-6 w-3/4 absolute top-1/2 left-1/2 
        transform -translate-x-1/2 -translate-y-1/2 
        rounded-2xl flex sm : py-10 px-4'
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px'
        }}
      >

      {/* Left Section : form */}
      <div className='flex-1 flex items-center justify-center flex-col gap-4'>
        <h1 className='font-bold text-4xl'>Welcome</h1>

        {/* changing the components depend on formState value */}
        {
          formState === 'signUp' ?
          <SignUp setFormState = {setFormState}/> :
          <SignIn setFormState = {setFormState}/>
        }
      </div>

      {/* Left Section : image*/}
      <div className='flex-1 sm:hidden'>
        <img 
          src= {regPic} 
          className='rounded-2xl w-full h-full'
        />
      </div>


    </div>


  );
}

export default App;
