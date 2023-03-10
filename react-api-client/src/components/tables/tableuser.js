import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router";
import { Context } from "../Providers/AppProvider";

export default function UserSearch() {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    const [store] = useContext(Context);

    useEffect(() => {
        const getData = () => {
            // Get the current trainer's ID from the authenticated user            
            axios.get(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Users`)
            .then((response) => {
            console.log(response);
            setData(response.data);
            setSearchData(response.data);
          })
          .catch((error) => {
          console.log(error);
        });
      }
      getData();
    }, [store.trainer.trainerId])
    
    const filtering = (e) => {
        if (!searchData) return;
        if (e.target.value === '') {
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
    const navigate = useNavigate();
    const redirectToEntity = (item) => {
      navigate(`/Trainers/${store.trainer.trainerId}/Users/${item.userId}`);
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
                        <th>More</th>
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
                                        <td><button className="add-btn2" onClick={() => redirectToEntity(item)}>Update</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    )
}
