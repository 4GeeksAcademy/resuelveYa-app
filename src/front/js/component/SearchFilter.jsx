import React, { useContext, useEffect } from 'react'
import './styles/jumbotron.css'
import { useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const SearchFilter = ({ title, subTitle }) => {
    const { actions, store } = useContext(Context)
    const navigate = useNavigate()
    const [postsData, setPostData] = useState([])
    const [searchTitleOrName, setSearchTitleOrName] = useState('')
    const [locationProv, setLocation] = useState('')
    const location = useLocation()

    const getPosts = async () => {
        const posts = await actions.getReviews()
        setPostData(posts)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/cardPostsList')
    }

    const handleChangeTitleAndName = (e) => {
        setSearchTitleOrName(e.target.value)
        console.log(e.target.value)
    }

    const filterByTitleAndName = postsData.filter((postProvider) => {
        const title = postProvider.post.title ? postProvider.post.title.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "") : "";
        const username = postProvider.post.user_name ? postProvider.post.user_name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "") : "";
        
        
        const serviceType = postProvider.post.service_type ? postProvider.post.service_type.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "") : "";
    
        const searchQuery = searchTitleOrName.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
        return title.includes(searchQuery) || username.includes(searchQuery) || serviceType.includes(searchQuery);
    });

    const filterByLocation = filterByTitleAndName.filter((postProvider => postProvider.post.location.toLowerCase().includes(locationProv.toLowerCase())))

    useEffect(() => {
        actions.setReviews(filterByLocation)
    }, [searchTitleOrName, locationProv])

    useEffect(() => {
        // Si la ruta actual es '/ruta-especifica'
        if (location.pathname === '/') {
            // Ejecuta la lógica que desees
            console.log('Estamos en el home');
            getPosts()
          // Coloca aquí lo que necesitas que suceda
        }
      }, [location]);

    return (
        <form onSubmit={handleSubmit} className='w-75 mx-auto p-3 py-5 mb-5' style={{ maxWidth: '700px' }}>
            <h2 className='text-center text-color fw-bold'>{title}</h2>
            <h4 className='text-center text-color'>{subTitle}</h4>
            <div className='container-jumbotron bg-white rounded-5 p-2 container d-flex gap-2'>
                <div className='d-flex align-items-center input-1'>
                    <i className="fa-solid fs-4 fa-magnifying-glass pe-2" style={{ color: "rgb(208 201 201)" }}></i>
                    <input className='' id='titleOrName' type="text" placeholder='¿Qué estás buscando?' onChange={handleChangeTitleAndName} autoComplete='off' />
                </div>
                <div className='d-flex align-items-center input-2'>
                    <i className="fa-solid fs-4 fa-location-dot bg-white pe-2" style={{ color: "rgb(208 201 201)" }} ></i>
                    <input type="text" id='location' placeholder='¿Dónde?' onChange={(e) => setLocation(e.target.value)} maxLength={20} autoComplete='off' />
                </div>
                <button className='button-search-filters px-3 py-1 pb-2'>Buscar</button>
            </div>
        </form>
    )
}