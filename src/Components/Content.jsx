import React, { useState, useRef, useEffect } from 'react'
import moviesData from '../movies.json' 
import {motion} from "motion/react"
const Content = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)
   const [posterUrl, setPosterUrl] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  // Example movie suggestions
  const suggestions = moviesData.map(movie => movie.title);
  
  const [Title, setTitle] = useState(suggestions[0])
  const filteredSuggestions = suggestions.filter(movie =>
    movie.toLowerCase().includes(searchQuery.toLowerCase())
  )
 
// Fetch movie poster when Title changes
  useEffect(() => {
    async function fetchPoster() {
      // Step 1: Get movie ID
      const searchRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=19b14193a2190d4e4e34415ee90f6fbc&query=${encodeURIComponent(Title)}`
      );
      const searchData = await searchRes.json();

      if (searchData.results.length === 0) return;

      const movieId = searchData.results[0].id;

      // Step 2: Get poster path using movie ID
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=19b14193a2190d4e4e34415ee90f6fbc`
      );
      const detailsData = await detailsRes.json();

      if (detailsData.poster_path) {
        setPosterUrl(`https://image.tmdb.org/t/p/w500${detailsData.poster_path}`);
      }
    }

    fetchPoster();
  }, [Title]);
useEffect(() => {
  async function fetchInitialRecommendations() {
    const movieToSearch = "Avatar"; // Default movie

    try {
      const res = await fetch(`https://movierecommender-backend-ea5m.onrender.com/recommend?movie=${encodeURIComponent(movieToSearch)}`);
      const data = await res.json();

      if (data.recommendations) {
        console.log("Initial API Response:", data);
        setTitle(movieToSearch);
        setRecommendations(data.recommendations);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error fetching initial recommendations:", err);
    }
  }

  fetchInitialRecommendations();
}, []);
  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className='bg-transparent w-[550px] h-[104px] absolute top-27 left-9'>
        <motion.h1 key={Title} initial={{opacity:0,scale:0.8,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{duration:0.2,ease:"linear"}} className='text-7xl text-white font-["Montserrat"] font-extrabold'>
          {Title}
        </motion.h1>
        
        {/* Search Bar */}
        <div className="relative mt-13" ref={containerRef}>
          <input
            ref={inputRef}
            type="text"
            placeholder='Search for a movie...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowDropdown(true)
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-[600px] h-[60px] px-4 py-2 rounded-full bg-red-200/20 text-white/90 border border-red-200/15
                       placeholder-white/90 focus:outline-none focus:ring-red-300/15 backdrop-blur-[100px] text-xl"
          />
          {/* Dropdown BELOW input */}
          {showDropdown && searchQuery && (
            <div className="absolute w-[590px] left-0 top-[60px] bg-white/10 backdrop-blur-md
                            rounded-tr-xl rounded-tl-xl rounded-bl-xl rounded-br-xl max-h-60 overflow-auto z-10">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(suggestion)
                    setShowDropdown(false)
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          <motion.button
          whileHover={{scale: 1.12}}
            whileTap={{scale: 0.5}}
            
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }}
          
            className='mt-6 ml-4 w-[150px] h-[60px] bg-white rounded-tl-[9px] rounded-br-[9px] rounded-tr-[9px] rounded-bl-[9px] text-xl text-black font-sans font-bold hover:bg-red-500 hover:text-white transition'
            onClick={
            async () => {
  const movieToSearch = searchQuery || suggestions[0];

  try {
    const res = await fetch(`https://movierecommender-backend-ea5m.onrender.com/recommend?movie=${encodeURIComponent(movieToSearch)}`);
    const data = await res.json();

    if (data.recommendations) {
  console.log("API Response:", data); // Debug
  setTitle(movieToSearch);
  setRecommendations(data.recommendations);
}
 else {
      console.error(data.error);
    }
  } catch (err) {
    console.error("Error fetching recommendations:", err);
  }
}}
          >
            Recommend
          </motion.button>
        </div>
      </div>
      {/*for image of the movie*/}
    <motion.div key={posterUrl} initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:1}} className=' relative left-[327px] -z-15 bg-auto h-[783px] w-[1200px] rounded-[10px] overflow-hidden'>
      <img
        src={posterUrl}
        alt="Movie Poster"
        className='absolute w-full h-full object-fill rounded-[10px]'
      />
</motion.div>
  {/* Recommendations Section */}
 <div className='fixed bottom-5 bg-transparent h-[220px] w-full'>
      <motion.h1 initial={{x:-500}} animate={{x:0}} transition={{duration:1}} className='text-xl text-white font-sans font-bold ml-18'>
        Top 5 Recommendation
      </motion.h1>
        <motion.div initial={{y:100}} animate={{y:0}} transition={{duration:1}} className='flex flex-row bottom-5 w-[1380px] h-[160px] bg-[#131313a7] backdrop-blur-3xl rounded-[30px] mt-3 ml-18 border-[0.5px] border-[#cb5454]'>
  {recommendations.map((rec) => (
  <motion.div whileHover={{scale:1.08}} key={rec.poster_url} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.5}} className="t">
    <a href={`https://www.google.com/search?q=${rec.title}`}><img src={rec.poster_url} alt={rec.title} className="w-[120px] h-[135px] rounded-[12px] mt-3 ml-32 border-[0.2px] border-white/10" />
    <h1  className="relative bottom-28 left-25 font-[Noto+Sans+Symbols] font-black text-[95px] text-[#000000cc] blur-[0.5px]"
        style={{
          WebkitTextStroke: "1px white",}}>{rec.number}</h1></a>
  </motion.div>
))}
</motion.div>

      </div>
  </>
  )
}

export default Content
