import React from 'react'
import { motion } from "motion/react"
import Header from '../Components/Header.jsx'
import { useNavigate } from 'react-router-dom';
import { delay } from "motion/react"
const Home = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/app'); // Navigate to the App component route
  };
  return (
   <>
   <Header />
   <div className='relative w-[1527px] h-[783px]'>
    
    <img src="/bg.png" alt='Bg' className='absolute -z-5 w-full h-full object-fill'/>
    
    <div className="absolute inset-0  bg-black opacity-75 blur-[0.5px] -z-5 "></div>
   <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:4}} className="absolute text-[54px] top-45 left-25 font-bold text-white bg-transparent">Completed Watching The Movie</motion.h1>
    <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:4,delay:3}} className="absolute text-6xl top-70 left-40 font-bold text-white bg-transparent">Get Top 5 Same Movie Recommendation</motion.h1>
    <motion.button onClick={handleButtonClick} whileHover={{scale:1.05,transition:{duration:0.3,delay:0}}} whileTap={{scale:0.8,transition:{duration:0.2,delay:0}}} initial={{opacity:0}} animate={{opacity:1,scale:1}} transition={{duration:3,delay:5}} className="absolute w-[150px] h-[65px] bg-red-600 top-100 left-165 rounded-[20px] text-xl font-[Montserrat] font-bold text-white">View Now</motion.button>
   </div> 
   
   </>
  )
}

export default Home
