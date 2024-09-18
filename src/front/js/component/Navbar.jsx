import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './styles/navbar.css'
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {actions, store} = useContext(Context)
	const [users, setUsers] = useState([])
	const [valueInput, setValueInput] = useState('')
	const [category, setCategory] = useState('')
	const [visible, setVisible] = useState(false)
	const [posts, setPosts] = useState([])

	const handleSubmit = (e) => {
		e.preventDefault()

	}

	const handleChangeCategory = (e) => {
		console.log(e.target.value)
		setCategory(e.target.value)
	}
	
	const handleChangeInput = (e) => {
		const textInput = e.target.value
		setValueInput(textInput)
	}
	
	const filterByName = posts.filter((user => user.username.toLowerCase().includes(valueInput.toLowerCase())))
	
	const filterByCategory = filterByName.filter((user) => user.service_type.includes(category.toLowerCase()))
	
	const dataUsers = async () => {
		const dataFetch = await actions.getUsers()
		setUsers(dataFetch)
	}

	const dataPosts = async () => {
		const dataPosts = await actions.getPostsProviders()
		setPosts(dataPosts)
		console.log(dataPosts)
	}
	
	useEffect(() => {
		if(store.username) {
			setVisible(true)
		} else  {
			setVisible(false)
		}
		
	}, [store.username])
	
	useEffect(() => {
		actions.setListServices(filterByCategory)
		
	}, [valueInput, category])
	
	useEffect(() => {
		// dataUsers()
		dataPosts()
		// actions.setListServices(filterByName)
		// dataPosts()
	}, [])
	
	return (
		<nav className='bg-black text-white d-flex justify-content-between align-items-center p-2'>
			<div>
				<Link to='/' className="text-white">
					<h2 className='mb-0 fw-bold'>Resuelve<span>Ya!</span></h2>
				</Link>
			</div>

			<form onSubmit={handleSubmit} className="d-flex gap-1">
				<select className="rounded" name="" id="" onChange={handleChangeCategory}>
					<option value="">Categorias</option>
					<option value="fontanero">Fontanero</option>
					<option value="electricista">Electricista</option>
					<option value="plomero">Plomero</option>
					<option value="gasfitero">Gasfitero</option>
				</select>
				<input onChange={handleChangeInput} id="search" className='p-2 rounded' type="text" placeholder='Que estas buscando...?' />
			</form>

			{
				visible ? (
				<div className="d-flex gap-2 justify-content-center align-items-center">
					<Link to='/providerprofile'>
						<h2 className="fs-4 p-0 m-0 fw-semibold text-white">{store.username && store.username}</h2>
					</Link>
					<button onClick={() => {actions.changeValueUsername(), localStorage.clear()}} className="btn p-0 bg-transparent text-white fw-semibold fs-4">Cerrar Sesión</button>
				</div>
				) : (
					<ul className='d-flex gap-3 my-auto fs-4 fw-semibold'>
				<Link to='/login' className='text-white'>
					<li className='list-group-item'>Iniciar Sesion</li>
				</Link>
				<Link to='/register' className="text-white">
					<li className='list-group-item'>Registrate</li>
				</Link>
			</ul>
				)
			}

			

		</nav>
	);
};
