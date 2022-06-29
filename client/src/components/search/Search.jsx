import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const baseAPIURL = process.env.REACT_APP_API_URL;



const Search = () => {
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [erorr, setErorr] = useState(false);


    const showResp = (e) => {
        e.preventDefault()
        // console.log('search btn click')
        if( searchText ){

        
        setIsShow(true);
        searchApi()
        }
    } 
    const searchApi  = async () =>{
        setErorr(false);
        setData([]) 
        // console.log('seatch text', searchText)
        if( searchText ){
            const searchApiUrl = `${baseAPIURL}/products/find/${searchText}`;
            try {
                const {data} =  await axios.get(searchApiUrl);
                // console.log(data);
                setData(data.result) 
            } catch (err) {
                console.log(err.response.statusText);
                setErorr(err.response.statusText)
            }
        }
        
       
    }
    const onChangeHandler = (e) =>{
        setIsShow(false);
        e.preventDefault();
        setSearchText(e.target.value);
    }

    const removeAll = () => {
        setIsShow(false);
        setSearchText('');
        setData('')

    }

  return (
    <div className='searchBox'>
        <form onSubmit={(e)=> showResp(e)}>
            <input type='text' className='searchInput' placeholder='Search here...' onChange={(e) => onChangeHandler(e) }/>
            <button className='searchBtn'><FontAwesomeIcon icon={faSearch} /></button>
        </form>
        {isShow && 
        <div className='serchRes'>
            {data ? data.map( (item) => (
                <div className='prodList border-btm' key={item._id}>
                    <Link to={`/product/${item.slug}`} state={{id:item._id}} onClick={(e) => removeAll(e) } className="prodListLink anchorTag">
                        <img src={item.image} alt="" className='prodImg'/>
                        <p>{item.title}</p>
                    </Link>
                </div>
            ) ) : '' }
            { erorr ? <div className='prodList border-btm'><p className='textErr'>{erorr}</p></div> : '' }
        </div>
        }
    </div>
  )
}

export default Search