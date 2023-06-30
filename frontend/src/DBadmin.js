import { useState, useEffect } from "react";

const DBadmin = () => {
    const [ task, setTask ] = useState(null)
    const [ sets, setSets ] = useState(null)
    const [ setFilter, setSetFilter ] = useState([])
    const [ toggleDiv, setToggleDiv ] = useState(false)

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
        let response = await fetch("/dbadmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: Jdeets
        })
            .then(console.log("Set added"))
            .catch((err) => console.log(err))
        const result = await response.json()
        console.log(result)
        thisForm.reset()
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        let id = e.target.setId.value
        let response = await fetch("/dba/"+ id, {
            method: "DELETE"
        })
        console.log(response.statusText)
        
    }

    const handleFind = async (e) => {
        e.preventDefault()
        let year = Number(e.target.setYear.value)
        let filtered = sets.filter(set => set.year === year)
        setSetFilter(filtered)
        setToggleDiv(true)
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
            <form onSubmit={handleDelete}>
                <label htmlFor="setId">Set Id #: </label>
                <input type="text" id="setId" required/>

                <button type="submit">Submit</button>
            </form>
        )
    }

    const updateForm = () => {
        return (
            <form onSubmit={handleUpdate}>
                <label htmlFor="setId">Set Id #: </label>
                <input type="text" id="setId" required/>

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
                <input type="test" id="hofRc" value={[]} placeholder="Leave Blank if None"/>

                <label htmlFor="content">Content: </label>
                <textarea id="content" cols="30" rows="10" required></textarea>

                <label htmlFor="auth">Auth Key: </label>
                <input type="password" id="auth" required />

                <button type="submit">Submit</button>

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

    return ( 
        <div className="admin">
            <div>
                <button onClick={typeClick} id='addSet'>Add Set</button>
                <button onClick={typeClick} id="findSet">Find Set ID</button>
                <button onClick={typeClick} id="updateSet">Update Set</button>
                <button onClick={typeClick} id="deleteSet">Delete Set</button>
            </div>
            {renderDiv()}
            { toggleDiv && setFilter.map(set => {
                return (
                    <p key={set._id}>{set.year} {set.name} - ID: {set._id}</p>
                    )
                })
            }
        </div>
     );
}
 
export default DBadmin;

