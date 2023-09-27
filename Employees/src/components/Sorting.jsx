/* eslint-disable react/prop-types */
import { useRef, useState } from "react"


export default function Sorting({ sort }) {
    const [selectedOption, setSelectedOption] = useState("")
    const sortRef = useRef(null)
    const handleSelection = (option) => {
        setSelectedOption(option)
        sort(option)
        sortRef.current.style.display = "none"
        return option

    }

    const sortVisible = () => {
        (sortRef.current.style.display == "none") ?
            sortRef.current.style.display = "block" :
            sortRef.current.style.display = "none"

    }

    return (
        <div className="sort-container">
            <span onClick={sortVisible}>Sort By {selectedOption} &nbsp;&#8659;</span>
            <div ref={sortRef} className="choices"><br />
                <span className="toggle" onClick={() => handleSelection("Name")} > Name</span><br /><br />
                <span className="toggle" onClick={() => handleSelection("Age")} >Age</span><br /><br />
                <span className="toggle" onClick={() => handleSelection("Salary")}>Salary</span><br /><br />

            </div>
        </div >
    )
}
