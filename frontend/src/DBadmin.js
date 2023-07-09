import { useState, useEffect } from "react";
import Login from "./Login";

const DBadmin = () => {
    const [ task, setTask ] = useState(null)
    const [ sets, setSets ] = useState(null)
    const [ setFilter, setSetFilter ] = useState([])
    const [ toggleDiv, setToggleDiv ] = useState(false)
    const [ errorDiv, setErrorDiv ] = useState(false)
    const [ errorMsg, setErrorMsg] = useState(null)
    const [ isAuthenticated, setIsAuthenticated] = useState(false)

    const fetchSets = async () => {
        const response = await fetch('https://baseball-timeline-backend.onrender.com/api')
          const json = await response.json()
          if (response.ok) {
            setSets(json)
          }
      }

    useEffect(() => {
      fetchSets()
    }, [])

    const typeClick = (e) => {
        setTask(e.target.id)
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        let thisForm = document.getElementById('addForm')
        const { setYear, setName, manu, setCount, image, hofRc, content } = e.target.elements
        let rcs = []
        rcs = hofRc.value.split(",").map(item => {return item.trim()})
        if (rcs[0] === "") {
            rcs = []
        }
        let details = {
            year: Number(setYear.value),
            name: setName.value,
            manufacturer: manu.value,
            setCount: Number(setCount.value),
            rcOfNote: rcs,
            imageSrc: image.value,
            content: content.value
        }
        let Jdeets = JSON.stringify(details)
        let response = await fetch("https://baseball-timeline-backend.onrender.com/dbadmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: Jdeets
        })
            .then(console.log("Set added"))
            .catch((err) => console.log(err))
        const result = await response.json()
        if (result.success) {
            console.log(result)
            thisForm.reset()
            setErrorDiv(false)
            setErrorMsg(null)
            fetchSets()
        } else {
            console.log(result)
            setErrorDiv(true)
            setErrorMsg(result.message)
        }        
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        let thisForm = document.getElementById('updateForm')
        const { setId, setYear, setName, manu, setCount, image, hofRc, content } = e.target.elements
        let thisId = setId.value
        let rcs = []
        rcs = hofRc.value.split(",").map(item => {return item.trim()})
        if (rcs[0] === "") {
            rcs = []
        }
        let details = {
            id: setId.value,
            year: Number(setYear.value),
            name: setName.value,
            manufacturer: manu.value,
            setCount: Number(setCount.value),
            rcOfNote: rcs,
            imageSrc: image.value,
            content: content.value
        }
        if (rcs.length === 0 ) {
            delete details.rcOfNote
        }
        for (let key in details) {
            if (details[key] === "" || details[key] === 0) {
                delete details[key]
            }
        }
        let Jdeets = JSON.stringify(details)
        let response = await fetch("https://baseball-timeline-backend.onrender.com/dba/"+ thisId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: Jdeets
        })
            .then(console.log("Set updated"))
            .catch((err) => console.log(err))
        const result = await response.json()
        if (result.success) {
            console.log(result)
            thisForm.reset()
            setErrorDiv(false)
            setErrorMsg(null)
            fetchSets()
        } else {
            console.log(result)
            setErrorDiv(true)
            setErrorMsg(result.message)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        let thisForm = document.getElementById('deleteForm')
        let id = e.target.setId.value
        let response = await fetch("https://baseball-timeline-backend.onrender.com/dba/"+ id, {
            method: "DELETE"
        })
        const result = await response.json()
        console.log(response.statusText)
        if (result) {
            console.log(result)
            thisForm.reset()
            setErrorDiv(false)
            setErrorMsg(null)
            setToggleDiv(false)
            fetchSets()
        } else {
            console.log(result)
            setErrorDiv(true)
            setErrorMsg(result.message)
        }
    }

    const handleFind = async (e) => {
        e.preventDefault()
        let year = Number(e.target.setYear.value)
        let filtered = sets.filter(set => set.year === year)
        setSetFilter(filtered)
        setToggleDiv(true)
        console.log(toggleDiv)
    }

    const addForm = (e) => {
        return (
            <form onSubmit={handleAdd} id="addForm">
                <label htmlFor="setYear">Set Year: </label>
                <input type="text" id="setYear" required/>

                <label htmlFor="setName">Set Name: </label>
                <input type="text" id="setName" required />

                <label htmlFor="manu">Manufacturer: </label>
                <input type="text" id="manu" required />

                <label htmlFor="setCount">Set Count: </label>
                <input type="number" id="setCount" required />

                <label htmlFor="image">Image Source: </label>
                <input type="text" id="image" required />

                <label htmlFor="hofRc">HOF Rookies: </label>
                <input type="text" id="hofRc" placeholder="Leave Blank if None"/>

                <label htmlFor="content">Content: </label>
                <textarea id="content" cols="30" rows="10" required></textarea>

                <button type="submit">Submit</button>

            </form>
        )
    }

    const findForm = () => {
        return (
            <form onSubmit={handleFind}>
                <label htmlFor="setYear">Set Year: </label>
                <input type="text" id="setYear" required/>

                <button type="submit">Submit</button>
            </form>
        )
    }

    const deleteForm = () => {
        return (
            <form onSubmit={handleDelete} id="deleteForm">
                <label htmlFor="setId">Set Id #: </label>
                <input type="text" id="setId" required/>

                <button type="submit">Delete</button>
            </form>
        )
    }

    const updateForm = () => {
        return (
            <form onSubmit={handleUpdate} id="updateForm">
                <label htmlFor="setId">Set Id #: </label>
                <input type="text" id="setId" required/>

                <label htmlFor="setYear">Set Year: </label>
                <input type="text" id="setYear" />

                <label htmlFor="setName">Set Name: </label>
                <input type="text" id="setName"  />

                <label htmlFor="manu">Manufacturer: </label>
                <input type="text" id="manu" />

                <label htmlFor="setCount">Set Count: </label>
                <input type="number" id="setCount" />

                <label htmlFor="image">Image Source: </label>
                <input type="text" id="image" />

                <label htmlFor="hofRc">HOF Rookies: </label>
                <input type="test" id="hofRc" placeholder="Leave Blank if None"/>

                <label htmlFor="content">Content: </label>
                <textarea id="content" cols="30" rows="10"></textarea>

                <button type="submit">Update</button>

            </form>
        )
    }

    const renderDiv = () => {
        if (task === 'addSet') {
            if (toggleDiv) {setToggleDiv(false)}
            return addForm()
        } else if (task === 'findSet') {
            return findForm()
        } else if (task === 'updateSet') {
            return updateForm()
        } else if (task === 'deleteSet') {
            return deleteForm()
        }
    }

    if (!isAuthenticated) {
        return (<Login setAuth={setIsAuthenticated}/>)
    } else {
        return ( 
            <div className="admin">
                <div id="dbButtonDiv">
                    <button onClick={typeClick} id='addSet'>Add Set</button>
                    <button onClick={typeClick} id="findSet">Find Set ID</button>
                    <button onClick={typeClick} id="updateSet">Update Set</button>
                    <button onClick={typeClick} id="deleteSet">Delete Set</button>
                </div>
                <div id="formDiv">
                    {renderDiv()}
                </div>
                { toggleDiv && setFilter.map(set => {
                    return (
                        <div id="infoDiv" key={set._id}>
                            <p key={set._id}>{set.year} {set.name} - ID: {set._id}</p>
                        </div>
                        )
                    })
                }
                { errorDiv && (
                    <div id="errorDiv">
                        <p>{errorMsg}</p>
                    </div>
                )}
            </div>
        );
    }
}
 
export default DBadmin;

