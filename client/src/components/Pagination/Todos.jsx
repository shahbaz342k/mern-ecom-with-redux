import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './style.css';
const apiurl = 'https://jsonplaceholder.typicode.com/todos';
const Todos = () => {

    const[todosData, setTodosData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit,setLimit] = useState(10);
    const [totalPage,setTotalPage] = useState(10);
    const [currentPage, setCurrentPage]= useState(1);
    const [pageList, setPageList] = useState();
    const [perPageShow, setPerPageShow] = useState(limit);
    const [visibleTodos, setVisibleTodos] = useState([]);

    const getTotalPage = (total,tlimit) =>{
        return Math.ceil(total/tlimit)
    } 
    const pagination = () => {
        let pl = Array.from({ length: totalPage }, (_, i) => i + 1);
        setPageList(pl);
    }

    // api call fn
    const apiCalling = async (url) => {
        const {data} = await axios.get(url);
        setTodosData(data);
        setLoading(false)
        setTotalPage( getTotalPage(data.length,limit) );
        
    }

    // calling api in component mount
    useEffect( () => {
        // console.log('api calling')
        apiCalling(apiurl);
        pagination();
        
    // console.log(visibleTodos)
    },[])

    useEffect( () => {
        // console.log('api calling')
        apiCalling(apiurl);
        pagination();
        setPerPageShow(limit);
        setCurrentPage(1);
        
    },[limit,loading,totalPage]);

    useEffect( () => {
        if( todosData ){
            // console.log(todosData)
            const lastIndexOfPage = currentPage * perPageShow; // 3*20 :60
          
            const firstIndexOfPage = lastIndexOfPage - perPageShow; // 60 - 20 : 40
            // console.log('l', lastIndexOfPage);
            // console.log('f', firstIndexOfPage);
            setVisibleTodos( todosData.slice(firstIndexOfPage, lastIndexOfPage) );
        }
    }, [totalPage, currentPage])

    const handleChangeLimit = (e) => {
        setLimit(e.target.value)
        // console.log(visibleTodos)
    }
    
  return (
    <div>
        
        <div>
            <h4>Select Page Limit</h4>
            <select onChange={(e) => handleChangeLimit(e)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            {/* {limit} */}
        </div>

        {loading?'loading...':
            visibleTodos.map( (item) => 
                    (
                        <div key={item.id}>
                            {item.title} {item.id}
                        </div>
                    )
            )
        }
        <span 
            onClick={() => setCurrentPage(
                currentPage > 1 ? currentPage-1: currentPage
            )}
            className='btn btn-secondary mx-3'>Prev</span>
        {loading?'': pageList.map((page) => (
            <span 
                onClick={ (e) => setCurrentPage(page) }
                className={
                    `${page === currentPage ? "active": "pagLink"}`
                }
            >
                {page != 1 ? ' | '+page : page}
            </span>
        ))}
        <span 
            onClick={() => setCurrentPage(
                currentPage < pageList.length ? currentPage+1: currentPage
            )}
            className='btn btn-primary mx-3'>Next</span>
    </div>
  )
}

export default Todos