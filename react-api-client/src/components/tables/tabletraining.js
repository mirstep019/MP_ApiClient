import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Providers/AppProvider";

export default function TrainSearch() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('');

    const navigate = useNavigate();

    const [store] = useContext(Context);


    const redirectToEntity = (item) => {
        navigate(`/training/${item.id}`);
    }

    useEffect(() => {
        const getData = () => {
            // Get the current trainer's ID from the authenticated user            
            axios.get(`https://localhost:7271/api/Trainers/${store.trainer.trainerId}/Users/Trainings`)
            .then((response) => {
            const modifiedData = response.data.map(item => ({...item, id: item.trainId}));
            setData(modifiedData);
            console.log(response);
            setSearchData(response.data);
          })
          .catch((error) => {
          console.log(error);
        });
      }
      getData();
    }, [store.trainer.trainerId])


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
                        <th>More</th>
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



