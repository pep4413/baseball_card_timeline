import { useSpring, animated } from '@react-spring/web'

const Shadow = () => {
    const springs = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    })

    return ( 
        <animated.div className="shadow" id="shadow" style={{...springs}}></animated.div>
     );
}
 
export default Shadow;