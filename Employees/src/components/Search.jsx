/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react"

export default function Search(props) {
    //handle search functionality access search function from table
    const { search } = props
    const inputReft = useRef(null)

    useEffect(() => {
        inputReft.current.focus()
    }, [])
    return (
        <div className="searchBox">
            <input onChange={search} ref={inputReft} className="search"
                type="text" placeholder="Fetching Employees" />
        </div>
    )
}
