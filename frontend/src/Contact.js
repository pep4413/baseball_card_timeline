import { useState } from "react";
import { useSpring, animated } from '@react-spring/web'

const ContactModal = (props) => {
    const [status, SetStatus] = useState("Send Message")
    const springs = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        SetStatus("Sending...")
        const { name, email, message } = e.target.elements
        let details = {
            name: name.value,
            email: email.value,
            message: message.value
        }
        let ndeets = JSON.stringify(details)
        let response = await fetch("https://baseball-timeline-backend.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: ndeets
        })
        SetStatus("Send Message")
        let result = await response.json()
        console.log(result.status)
        document.getElementById('contactForm').reset()
    }

        

    return ( 
        <animated.div className="contactModal" style={{...springs}}>
            <span id="closeForm" onClick={props.close}>&times;</span>
            <div className="formHeader">
                <h1>Contact Us</h1>
            </div>
            <form onSubmit={handleSubmit} id="contactForm" >
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                </div>
                <div id="textarea">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" cols="70" rows="10" required></textarea>
                </div>
                <div id="buttonDiv">
                    <button type="submit">{status}</button>
                </div>
            </form>
        </animated.div>
     );
}
 
export default ContactModal;