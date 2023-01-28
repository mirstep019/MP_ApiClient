import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TrainSearch() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('')

    useEffect(() => {
        const getData=()=> {
            axios.get('https://localhost:7271/api/Training')
            .then((response)=> {
                console.log(response);
                setData(response.data);
                setSearchData(response.data);
            })
            
        }
        getData();
    }, [])
    const filtering = (e) => {
        if (e.target.value === ''){
            setData(searchData)
        } else {
            const filterRes = searchData.filter(item => 
                item.trainName.toLowerCase().includes(e.target.value.toLowerCase()) || 
                item.formattedDate.toLowerCase().includes(e.target.value.toLowerCase()) 
                )
                if (filterRes.length > 0){
                    setData(filterRes);
                }
                else {
                    setData([])
                }

            
        }
        setFilterVal(e.target.value)
    }
    return (
        <div>
            <div className="searchbar">
                <input className="searchbar__input" type="search" placeholder="Search" value={filterVal} onInput={(e)=>filtering(e)} />
            </div>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Training Id</th>
                        <th>Training Name</th>
                        <th>Date</th>
                        <th>Finished</th>
                        <th>UserId</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            data.map(item => {
                                return(
                                    <tr key={item.trainId}>
                                        <td>{item.trainId}</td>
                                        <td>{item.trainName}</td>
                                        <td>{item.formattedDate}</td>
                                        <td>{item.isTrainingFinished.toString()}</td>
                                        <td>{item.userId}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    )
}



