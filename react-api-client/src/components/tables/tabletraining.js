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
        navigate(`/Trainers/${store.trainer.trainerId}/Trainings/${item.trainId}`);
    }

    const deleteTrain = (id) => {
        axios.delete(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Training/${id}`)
        .then((response) => {
            if (Array.isArray(response.data)) { // check if response.data is an array
                // Refresh the data
                const modifiedData = response.data.map(item => ({...item, id: item.trainId}));
                setData(modifiedData);
                setSearchData(modifiedData);
            } else {
                setData([]);
                setSearchData([]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        const getData = () => {
            // Get the current trainer's ID from the authenticated user            
            axios.get(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Users/Trainings`)
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
                        <th></th>
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
                                        <td>{item.isTrainFinished.toString()}</td>
                                        <td>{item.userId}</td>
                                        <td><button className="add-btn2" onClick={() => redirectToEntity(item)}>Update</button></td>
                                        <td><button className="delete-btn" onClick={() => deleteTrain(item.trainId)}></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    )
}



