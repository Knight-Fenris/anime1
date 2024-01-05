import React, { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";

//reducer
const reducer = (state,action)=>{
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_POPULAR_ANIME:
            return {...state, popularAnime: action.payload, loading: false}
        case SEARCH:
            return {...state, searchResults: action.payload, loading: false}
        case GET_UPCOMING_ANIME:
            return {...state, upcomingAnime: action.payload, loading: false} 
        case GET_AIRING_ANIME:
            return {...state, airingAnime: action.payload, loading: false} 
        case GET_PICTURES:
            return {...state, pictures: action.payload, loading: false} 
        default:
            return state;
    }
    
}

export const GlobalContextProvider = ({children}) =>{
    const initialState = {
        popularAnime : [],
        upcomingAnime : [],
        airingAnime : [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search,setSearch] = React.useState('')

    const [rendered,setRendered] = React.useState('popular');

    const handleChange = (e) =>{
        setSearch(e.target.value);
        if(e.target.value===''){
            state.isSearch = false;
        }
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(search){
            state.isSearch = true;
            searchAnime(search);
        }
        else{
            state.isSearch = false;
            alert('Please Enter a Search item');
        }
        setRendered('search');
        
    }
    
    //fetch pop anime
    const getPopularAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await  response.json();
        dispatch({type: GET_POPULAR_ANIME, payload: data.data})
    }

    //upcoming anime

    const getUpcomingAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await  response.json();
        dispatch({type: GET_UPCOMING_ANIME, payload: data.data})
    }

    //airing anime

    const getAiringAnime = async()=>{
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await  response.json();
        dispatch({type: GET_AIRING_ANIME, payload: data.data})
    }

    //search`
    const searchAnime = async(anime)=>{
        dispatch({type:LOADING})
        const response = await fetch(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc`)
        const data = await response.json();
        dispatch({type:SEARCH, payload: data.data})
    }

    //get char pics
    const getAnimePictures = async(id) =>{
        dispatch({type:LOADING})
        const response = await fetch(`${baseUrl}/characters/${id}/pictures`)
        const data = await response.json();
        dispatch({type:GET_PICTURES, payload: data.data})
    }


    React.useEffect(()=>{
        getPopularAnime();
        //getAiringAnime();
    }, [])

    return(
        <GlobalContext.Provider value = {{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getAiringAnime,
            getPopularAnime,
            getUpcomingAnime,
            getAnimePictures,
            rendered,
            setRendered,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}