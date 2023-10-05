import React from 'react'
import Popular from './Popular';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';


function Homepage() {

    const{handleSubmit,
        search,handleChange,
        getAiringAnime,getUpcomingAnime,
        rendered, setRendered} = useGlobalContext();

    const switchComponent = () => {
        return <Popular rendered = {rendered}/>
    }
    //add result count if want
    return (
        <HomepageStyled>
            <header>
                <div className='logo'>
                    <h1>
                        {rendered === 'popular'? 'Popular Anime' :
                        rendered==='airing'?'Airing Anime':rendered==='upcoming'?'Upcoming Anime':'Search Results'}
                    </h1>
                </div>
                <div className='search-container'>
                    <div className='filter-btn popular-filter'>
                        <button onClick={()=>{
                            setRendered('popular')
                        }}>Popular<i className='fa fa-fire'></i></button>
                    </div>
                    <form action='' className='search-form' onSubmit={handleSubmit}>
                        <div className='input-control'>
                            <input type = 'text' placeholder='Search Anime' value = {search} onChange={handleChange}></input>
                            <button type = 'submit' onClick={handleSubmit}>Search</button>
                        </div>



                    </form>
                    <div className='filter-btn airing-filter'>
                        <button onClick={()=>{
                            setRendered('airing')
                            getAiringAnime()
                        }}>Airing</button>
                    </div>
                    <div className='filter-btn upcomingr-filter'>
                        <button onClick={()=>{
                            setRendered('upcoming')
                            getUpcomingAnime()
                        }}>Upcoming</button>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </HomepageStyled>
    )
}

const HomepageStyled = styled.div`
    background-color: #EDEDED;
    header{
        padding: 2rem 5rem;
        width: 90%;
        margin: 0 5%;
        //margin-right: 5rem;
        transition: all .4s ease-in-out;
        align-items: center;
        resize: both;
    }
    @media screen and (max-width:1530px){
        wisth:95%;
    }
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
    }
    .search-container{
        
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 1rem;
        button{
            display: flex;
            align-items: centers;
            gap: .5rem;
            padding: .7rem 1.5rem;
            outline: none;
            border-radius: 30px;
            font-size: 1.2rem;
            background-color: #fff;
            cursor: pointer;
            transition: all .4s ease-in-out;
            font-family: inherit;
            border: 5px solid #e5e7eb;
        }
        form{
            position: relative;
            width: 100%;
            
            .input-control{
                position: relative;
                transition: all .4s ease-in-out;
            }
            .input-control input{
                width: 100%;
                padding: .7rem 1rem;
                //border: none;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                background-color: #fff;
                border: 5px solid #e5e7eb;
                transition: all .4s ease-in-out;
            }
            .input-control button{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

`

export default Homepage
