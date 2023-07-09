import { useEffect, useState } from 'react'
import Year from './Year'


const Main = () => {
    const [sets, setSets] = useState(null)

    useEffect(() => {
      const fetchSets = async () => {
        const response = await fetch('https://baseball-timeline-backend.onrender.com/api')
          const json = await response.json()
          if (response.ok) {
            setSets(json)
          }
      }
  
      fetchSets()
           
    }, [])

    
       
    return ( 
        <div className='mainBody'>
            <Year sets={sets}/>
        </div>      
     );
}
 
export default Main;