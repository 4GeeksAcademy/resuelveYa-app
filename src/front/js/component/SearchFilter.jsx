import React, { useContext, useEffect } from 'react'
import './styles/jumbotron.css'
import { useState } from 'react'
import { Context } from '../store/appContext'

export const SearchFilter = () => {
    const {actions} = useContext(Context)
    const [postsData, setPostData] = useState([])
    const [searchTitleOrName, setSearchTitleOrName] = useState('')
    const [location, setLocation] = useState('')

    const getPosts = async () => {
        const posts = await actions.getPostsProviders()
        console.log(posts)
        setPostData(posts)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(searchTitleOrName, location)
        // actions.setListServices(filterByTitleAndName)
    }

    const handleChangeTitleAndName = (e) => {
        setSearchTitleOrName(e.target.value)
        console.log(e.target.value)
    }
    
    const filterByTitleAndName = postsData.filter((postProvider) => {
        const title = postProvider.title ? postProvider.title.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "") : "";
        const username = postProvider.username ? postProvider.username.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "") : "";
        const searchQuery = searchTitleOrName.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
        return title.includes(searchQuery) || username.includes(searchQuery);
    });

    // const filterByLocation = filterByTitleAndName.filter(postLocation => postLocation.location.toLowerCase().include(location))
    
    useEffect(() => {
        actions.setListServices(filterByTitleAndName)
    }, [searchTitleOrName, location])
    
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <form onSubmit={handleSubmit} className='form-filters-services w-75 w-lg-50 mx-auto p-3 py-5 mb-5'>
            <h1>Bienvenido a ResuelveYa!</h1>
            <h3>Ecuentra tu solucion aqui...! 🐼</h3>
            <div className='container bg-white rounded p-2 container d-flex gap-2'>
                <div className='d-flex align-items-center input-1'>
                    <i className="fa-solid fs-3 fa-magnifying-glass"></i>
                    <input className='' id='titleOrName' type="text" placeholder='Que estas buscando...?' onChange={handleChangeTitleAndName} autoComplete='off'/>
                </div>
                <div className='d-flex align-items-center input-2'>
                    <i className="fa-solid fs-3 fa-location-dot bg-white"></i>
                    <input type="text" id='location' placeholder='Donde...?' onChange={(e) => setLocation(e.target.value)} maxLength={20} autoComplete='off'/>
                </div>
            </div>
            <div>
                <button className='button-search-filters p-2 fs-4 mt-3'>Buscar</button>
            </div>
        </form>
    )
}