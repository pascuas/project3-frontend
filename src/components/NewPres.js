import React, {useState, useEffect} from 'react'
import {createPres, getPresById} from '../services/api-helper'
import {createSect, findById} from '../services/section-api-helper'
import NewSection from './NewSection.js'
import '../css/newpres.css'
import {Link} from "react-router-dom"



function NewPres(){
    const[showForm, setShowForm] = useState(false)
    const[showStart, setShowStart] = useState(true)
    const[sections, setSections] = useState([])
    const [name, setName] = useState('')
    const[presID, setPresID] = useState()
    const [title, setTitle] = useState('')
    const [time, setTime] = useState()
    const [totalTime, setTotalTime] = useState(0)


    const nameChange = (e) => {
        setName(e.target.value)
    }
    const nameSubmit = async() => {
        const json = await createPres({"name": name})
        console.log("json", json)
        setPresID(json._id)
        setShowStart(false)
        setShowForm(true)
    }
    const titleChange = (e) => {
        setTitle(e.target.value)
    }
    const timeChange = (e) => {
        setTime(e.target.value)
    }

    const sectionSubmit = async() => {
        const json = await createSect(presID, {"title": title, "time": time})
        console.log("sections", json)
        setTotalTime(Number(time) + Number(totalTime))
        setTime('')
        setTitle('')
        getSections()
    }

    const getSections = async() => {
        const presentation = await getPresById(presID)
        console.log("presentation", presentation)
        setSections(presentation.sections)
    }

    const pointSubmit = async() => {
        const presentation = await getPresById(presID)
        setSections(presentation.sections)
    }

    const rendersections = sections.map((section, index)=> {
        if(sections.length>0){
        return(
            <NewSection section={section} pointSubmit={pointSubmit}/>
        )
        }
    })

    return(
        <div className="newPresMain">
        <h1>Create a New Project</h1>
        {showStart && 
        <div className="addProject">
            <label>Project Name: </label> <input className="name" type="text" value={name} onChange={nameChange}/>
            <button onClick={nameSubmit}>Submit</button>
        </div>
        }
        {showForm && 
        <div className="fullpage"> 
            <div className="includeTitle">
                <h4>{name}</h4>
                {rendersections}
            <div className="addSection">    
            <h4>Add A Section</h4>
            <input type="text"  value={title} onChange={titleChange}/>
            <input type="text" value={time} onChange={timeChange}/>
            <button onClick={sectionSubmit}>+</button>
            </div>
            <p className="time">Total time: {totalTime}</p>
            <Link to="/pres"><button>Done!</button></Link>
        </div>
        </div>
        }
        </div>

    )
}
export default NewPres