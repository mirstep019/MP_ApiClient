import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ExeSearch() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('')

    useEffect(() => {
        const getData=()=> {
            axios.get('https://localhost:7271/api/Exercise')
            .then((response)=> {
                console.log(response);
                setData(response.data);
                setSearchData(response.data);
            })
            
        }
        getData();
    }, [])
    const filtering = (e) => {
        if (e.target.value == ''){
            setData(searchData)
        } else {
            const filterRes = searchData.filter(item => 
                item.exeName.toLowerCase().includes(e.target.value.toLowerCase()) || 
                item.instructions.toLowerCase().includes(e.target.value.toLowerCase()) 
                )
                if (filterRes.length > 0){
                    setData(filterRes);
                }
                else {
                    setData([{"exeName":"No Data Found"}])
                }

            
        }
        setFilterVal(e.target.value)
    }
    return (
        <div>
            <div className="searchbar">
                <input type="search" className="searchbar__input" placeholder="Search" value={filterVal} onInput={(e)=>filtering(e)} />
            </div>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Exercise Name</th>
                        <th>Instructions</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            data.map(item => {
                                return(
                                    <tr key={item.exeId}>
                                        <td>{item.exeId}</td>
                                        <td>{item.exeName}</td>
                                        <td>{item.instructions}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>
        </div>
    )
}

