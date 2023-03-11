import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Providers/AppProvider";

export default function ExeSearch() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    const navigate = useNavigate();

    const [store] = useContext(Context);

    const redirectToEntity = (item) => {
        navigate(`/Trainers/${store.trainer.trainerId}/Exercises/${item.exeId}`);
      }


    useEffect(() => {
        const getData=()=> {
            axios.get(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Exercises`)
            .then((response) => {
            const modifiedData = response.data.map(item => ({...item, id: item.exeId}));
            setData(modifiedData);
            setSearchData(modifiedData);
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
                        <th>More</th>
                        <th></th>
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
                                        <td><button className="add-btn2" onClick={() => redirectToEntity(item)}>Update</button></td>
                                        <td><button className="delete-btn"/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>
        </div>
    )
}

