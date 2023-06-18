import SetName from "./SetName"

const Year = (props) => {
    let yearList = []
    let uniqueYears = []


    if (props.sets) {
        yearList = props.sets.map((set) => {return set.year})
    }

    uniqueYears = [...new Set(yearList)]

  
    

    return (
        <div>
            {uniqueYears.map((year, i) => 
                {let yearSets = props.sets.filter(set => set.year === year)
                    return (
                        <div key={`${year}`}>
                            <div className="yearDiv">
                                <h1>{year}</h1>                    
                            </div>
                            <SetName value={yearSets} allSets={props.sets}/>
                        </div>
                    )
                })
            }
        </div>
    );
}
 
export default Year;