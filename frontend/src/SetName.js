import { useState } from 'react'
import SetModal from './SetModal'

const Set = (props) => {

    const [ uniqueSet, setUniqueSet] = useState(null)
    const [ showModal, setShowModal ] = useState(false)
    let app = document.getElementById('app')
    
    const setClick = (e) => {
        const uniqueId = e.currentTarget.getAttribute("id")
        let x = props.allSets.filter((set) => set._id === uniqueId)[0]
        setUniqueSet(x)
        setShowModal(true)
        document.body.style.overflowY = "hidden"
    }

    const showMe = () => {
        if (uniqueSet && showModal) {
            return (
                <SetModal uniqueSet={uniqueSet} />
            )     
        }
    }

    window.onclick = (e) => {
        if (e.target === app && showModal) {
            setShowModal(false)
            document.body.style.overflowY = "auto"
        }
    }

    
   

    return ( 
        <div>
            {props.value.map((set) => (
                <div className="setDiv" key={`${set.year}${set.name}`} id={`${set._id}`} onClick={setClick}>
                    <h1>{set.year} {set.name}</h1>
                    <img className="setThumb" src={set.imageSrc} alt="" />
                </div>
            ))}
            {showMe()}            
        </div>
     );
}
 
export default Set;