const Footer = (props) => {

        
    return ( 
        <div className="footer">
            <div className="innerFooter">
                <p>@Perkins 2023</p>
                <div id="contact" onClick={() => {
                    if (props.showForm === true) {
                        props.setShow(false)
                    } else {
                        props.setShow(true)
                    }
                    }}><p>Contact</p></div>
            </div>
        </div>
     );
}
 
export default Footer;