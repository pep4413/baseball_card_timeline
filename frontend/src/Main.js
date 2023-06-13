import { useEffect, useState } from 'react'


const Main = () => {
    const [sets, setSets] = useState(null)


    useEffect(() => {
      const fetchSets = async () => {
        const response = await fetch('/api')
          const json = await response.json()
          if (response.ok) {
            setSets(json)
          }
      }
  
      fetchSets()
    }, [])


    return ( 
        <div>
            {sets && sets.map((set) => (
                <div>
                    <img src={set.imageSrc}></img>
                    <h1>{set.year} {set.name}</h1>
                    <p>Manufacturer: {set.manufacturer}</p>
                    <p>Cards in set: {set.setCount}</p>
                    <p>{set.content}</p>
                </div>                
            ))}
            {/* Set Details Modal */}
        </div>      
     );
}
 
export default Main;