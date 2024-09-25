import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/navbar.css'
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions, store } = useContext(Context)
	const [valueInput, setValueInput] = useState('')
	const [category, setCategory] = useState('')
	const [posts, setPosts] = useState([])
	const [visible, setVisible] = useState(false)
	const [viewChange, setViewChange] = useState(false)
	const navigate = useNavigate()

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

	const handleNav = () => {
		setViewChange(!viewChange)
	}

	// const filterByTitleAndUsername = posts.filter(userPost =>
	// 	userPost.title.toLowerCase().includes(valueInput.toLowerCase()) ||
	// 	userPost.username.toLowerCase().includes(valueInput.toLowerCase())
	// );

	// const filterByCategory = filterByTitleAndUsername.filter(user => user.service_type.toLowerCase().includes(category.toLowerCase()));

	// const dataPosts = async () => {
	// 	const dataPosts = await actions.getPostsProviders()
	// 	setPosts(dataPosts)
	// 	console.log(dataPosts)
	// }
	// Verificar si el rol es admin, cliente o proveedor para redirigir a la página correcta
	const getProfileLink = () => {
		if (store.role === 'admin') {
			return '/adminprofile';
		}
		return '/userprofile';
	};

	useEffect(() => {
		if (store.username) {
			setVisible(true)
		} else {
			setVisible(false)
		}

	}, [store.username])


	useEffect(() => {
		// dataPosts()
	}, [])

	return (
		<nav className=' text-white'>
			<div className="d-flex blur justify-content-between w-100 align-items-center p-2 nav-sec-1 ">
				<div>
					<Link to='/' className="text-white">
						<h2 className='mb-0 fw-bold'>Resuelve<span>Ya!</span></h2>
					</Link>
				</div>
				{/* Btn hamburguesa */}
				<div className="btnNav transition-transform d-md-none">
					<input type="checkbox" id="lanzador" />
					<label htmlFor="lanzador" onClick={handleNav}>
						<span className="btnNav-linea bg-white"></span>
						<span className="btnNav-linea bg-white"></span>
						<span className="btnNav-linea bg-white"></span>
					</label>
				</div>
				<div className="d-none d-md-block">
					{
						visible ? (
							<div className="d-flex gap-2 justify-content-center align-items-center">
								<Link to={getProfileLink()}>
									<h2 className="fs-4 p-0 m-0 fw-semibold text-white">{store.username && store.username}</h2>
								</Link>
								<button onClick={() => { actions.logout(), navigate('/') }} className="btn p-0 bg-transparent text-white fw-semibold fs-4">Cerrar Sesión</button>
							</div>
						) : (
							<ul className='d-flex gap-3 my-auto fs-4 fw-semibold'>
								<Link to='/login' className='text-white'>
									<li className='list-group-item'>Iniciar sesión</li>
								</Link>
								<Link to='/register' className="text-white">
									<li className='list-group-item'>Regístrate</li>
								</Link>
								<Link to='/' className="text-white">
									<li className='list-group-item'>Contáctanos</li>
								</Link>
							</ul>
						)
					}
				</div>

			</div>
			<div className={viewChange ? 'menu d-md-none' : 'menu menu-off d-md-none'}>
				{/* <form onSubmit={handleSubmit} className="d-flex flex-column gap-1">
					<select className="rounded p-2" name="category" id="category" onChange={handleChangeCategory}>
						<option value="">Categorias</option>
						<option value="fontanero">Fontanero</option>
						<option value="electricista">Electricista</option>
						<option value="plomero">Plomero</option>
						<option value="gasfitero">Gasfitero</option>
						<option value="pintor">Pintor</option>
					</select>
					<input onChange={handleChangeInput} id="search" className='p-2 rounded' type="text" placeholder='Que estas buscando...?' autoComplete="off" />
				</form> */}
				{
					visible ? (
						<div className="d-flex flex-column gap-2 justify-content-center align-items-center">
							<Link to={getProfileLink()}>
								<h2 className="username fs-2 p-0 m-0 fw-semibold text-white li-ham">{store.username && store.username}</h2>
							</Link>
							<button onClick={() => { actions.logout(), navigate('/') }} className="btn btn-ham p-0 bg-transparent text-white fw-semibold fs-2 li-ham">Cerrar Sesión</button>
							<Link to='/contact' className="text-white">
								<li className="list-group-item text-center li-ham fs-2 fw-semibold">Contáctanos</li>
							</Link>
						</div>
					) : (
						<ul className='d-flex flex-column fs-2 fw-semibold m-0 p-0'>
							<Link to='/login' className='text-white'>
								<li className='list-group-item fs-2 text-center li-ham'>Iniciar Sesion</li>
							</Link>
							<Link to='/register' className="text-white">
								<li className='list-group-item fs-2 text-center li-ham'>Registrate</li>
							</Link>
							<Link to='/' className='text-white'>
								<li className='list-group-item fs-2 text-center li-ham'>Contáctanos</li>
							</Link>
						</ul>
					)
				}
			</div>

		</nav>
	);
};
