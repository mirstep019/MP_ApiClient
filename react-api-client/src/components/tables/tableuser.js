import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserSearch() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('')

    useEffect(() => {
        const getData=()=> {
            axios.get('https://localhost:7271/api/User')
            .then((response)=> {
                console.log(response);
                setData(response.data);
                setSearchData(response.data);
            })
            
        }
        getData();
    }, [])
    const filtering = (e) => {
        if (!searchData) return;
        if (e.target.value == '') {
          setData(searchData)
        } else {
          const filterRes = searchData.filter((item) => 
            item.userName.toLowerCase().includes(e.target.value.toLowerCase())
          )
          if (filterRes.length > 0) {
            setData(filterRes);
          } else {
            setData([])
          }
        }
        setFilterVal(e.target.value)
    }

    const userData = data.map(item => {
        return {
          userId: item.userId,
          userName: item.userName,
          numTrainings: item.trainings.length
        };
      });

    
    return (
        <div>
            <div className="searchbar">
                <input className="searchbar__input" type="search" placeholder="Search" value={filterVal} onInput={(e)=>filtering(e)} />
            </div>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Username</th>
                        <th>Trainings Count</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            userData.map(item => {
                                return(
                                    <tr key={item.userId}>
                                        <td>{item.userId}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.numTrainings}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    )
}



