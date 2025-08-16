import React from 'react'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <motion.div initial={{y:-80}} animate={{y:0}} transition={{delay:0.5, duration:1}}className='bg-transparent w-full h-full'>
        <div>
          <a href="/" target="" rel="">
            <img 
              src="/ChatGPT Image Aug 2, 2025, 09_02_29 PM.png" 
              className="w-[250px] h-[50px] absolute top-5 left-5 drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]"
            />
          </a>
        </div>
      </motion.div>
    </>
  )
}

export default Header