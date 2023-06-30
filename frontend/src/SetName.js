import { useState } from 'react'
import SetModal from './SetModal'

const Set = (props) => {

    const [ uniqueSet, setUniqueSet] = useState(null)
    const [ showModal, setShowModal ] = useState(false)
    const shadow = document.getElementById('shadow')

    
    const setClick = (e) => {
        const uniqueId = e.currentTarget.getAttribute("id")
        let x = props.allSets.filter((set) => set._id === uniqueId)[0]
        setUniqueSet(x)
        setShowModal(true)
        document.body.style.overflowY = "hidden"
        shadow.style.visibility = "visible"
    }

    const showMe = () => {
        if (uniqueSet && showModal) {
            return (
                <SetModal uniqueSet={uniqueSet} closeClick={closeClick}/>
            )     
        }
    }

    window.addEventListener('click', (e) => {
        if (e.target === shadow && showModal) {
            setShowModal(false)
            document.body.style.overflowY = "auto"
            shadow.style.visibility = "hidden"
        }
    })

    const closeClick = (e) => {
        if (e.target === document.getElementById('close')) {
            setShowModal(false)
            document.body.style.overflowY = "auto"
            shadow.style.visibility = "hidden"
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