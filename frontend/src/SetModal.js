import { useSpring, animated } from '@react-spring/web'


const SetModal = (props) => {
    const springs = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    })


    const hofRC = () => {
        if (props.uniqueSet.rcOfNote.length === 0) {
            return (<p>*There are no Hall of Fame rookie cards in this set</p>)
        } else {
            return (
                <div className="hofRC">
                    <h2>Hall of Fame Rookie Cards</h2>
                    <ul>
                        {props.uniqueSet.rcOfNote.map((rc) => {
                            return <li key={rc}>{rc}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }
    

    return (    
        <animated.div className="setModal" id="setModal" style={{...springs}}>
            <span id="close" onClick={props.closeClick}>&times;</span>
            <div className="modalHeader">
                <h1>{props.uniqueSet.year} {props.uniqueSet.name}</h1>
                
            </div>
            <img src={props.uniqueSet.imageSrc} alt="" className="modalImg" />
            <div className="modalContent">
                <p><strong>Manufacturer: </strong>{props.uniqueSet.manufacturer}</p>
                <p><strong>Total cards in set: </strong>{props.uniqueSet.setCount}</p>
                <p>{props.uniqueSet.content}</p>   
                {hofRC()} 
            </div>                    
        </animated.div>       
     );
}
 
export default SetModal;