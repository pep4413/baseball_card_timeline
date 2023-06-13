const Set = (props) => {

    return ( 
        <div>
            {props.value.map((set) => (
                <div className="setDiv">
                    <h1>{set.year} {set.name}</h1>
                    <img className="" src={set.imageSrc} alt="" />
                </div>
            ))}
        </div>
     );
}
 
export default Set;