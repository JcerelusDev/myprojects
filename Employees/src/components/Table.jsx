/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Search from './Search'
import Sorting from "./Sorting";

export default function Table() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('')
    const [sortby, setSortby] = useState("None")
    const [renderTable, setRenderTable] = useState([])


    const filteredValue = ["name", "position", "maritalStatus", "email", "salary", "age"]

    const getData = async () => {
        try {
            const response = await fetch("src/Api/api.json");
            if (!response.ok) {
                throw new Error("there's a network issue ")
            }
            const jsonData = await response.json()
            setData(jsonData)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        if (data.employees != undefined) {
            return setRenderTable(data.employees)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.employees])

    useEffect(() => {
        let sortedData = data.employees
        if (sortedData !== undefined) {
            setRenderTable(sortedData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderTable])

    renderTable.sort((a, b) => {

        if (sortby == "Name") {
            return (a.name > b.name) ? 1 : -1
        }
        else if (sortby == "Age") {
            return (parseInt(a.age) > parseInt(b.age)) ? 1 : -1
        }
        else if (sortby == "Salary") {
            return (parseInt(a.salary) > parseInt(b.salary)) ? 1 : -1
        }

    })



    const handleSearch = (e) => {
        const query = e.target.value;
        (query.length > 1) ? setQuery(query) : setQuery("")
    }

    //loading state
    if (loading) {
        return <div>Loading...</div>
    }

    //error handler if there's any
    if (error) {
        return <div>Error {error.message}</div>
    }

    return (
        <>
            < Search search={handleSearch} />
            <Sorting sort={setSortby} />
            <div className="tb-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Telephone</th>
                            <th>Age</th>
                            <th>Marital Status</th>
                            <th>Salaries</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable.filter((employee) => {
                            let result = filteredValue.some((key) => employee[key].toLowerCase().includes(query.toLocaleLowerCase()))
                            return result
                        })
                            .map((item, id) => (
                                < tr key={id} className="tbrow" >
                                    <td>{id}</td>
                                    <td>{item.name} </td>
                                    <td>{item.email}</td>
                                    <td>{item.telephone}</td>
                                    <td>{item.age}</td>
                                    <td>{item.maritalStatus}</td>
                                    <td>${item.salary}</td>
                                    <td>{item.position}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}
