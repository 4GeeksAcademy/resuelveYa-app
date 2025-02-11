import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './styles/navbar.css'
import { Context } from "../store/appContext";
import { Link as ScrollLink } from 'react-scroll';
import logoNavbar from "../../img/logo-navbar.png"

export const Navbar = () => {
	const { actions, store } = useContext(Context)
	const [visible, setVisible] = useState(false)
	const [viewChange, setViewChange] = useState(false)
	const navigate = useNavigate()
	const location = useLocation();

	const handleNav = () => {
		setViewChange(!viewChange)
	}

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

	const scrollToFooter = () => {
		const footer = document.getElementById("footer");
		if (footer) {
			footer.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleContactUsClick = () => {
		navigate('/');
		setTimeout(scrollToFooter, 100);
	};


	return (
		<nav className=''>
			<div className="d-flex blur justify-content-between w-100 align-items-center p-2 nav-sec-1 ">
				<div>
					<Link to={'/'} className="d-flex justify-content-center align-items-center">
						<img src={logoNavbar} style={{ width: "70px", height: "70px" }} alt="logo"></img>
						<h2 className='mb-0' style={{ color: "var(--blanco)" }}>Resuelve<span>Ya!</span></h2>
					</Link>
				</div>
				{/* Btn hamburguesa */}
				<div className="btnNav transition-transform d-md-none">
					<input type="checkbox" id="lanzador" />
					<label htmlFor="lanzador" onClick={handleNav}>
						<span className="btnNav-linea"></span>
						<span className="btnNav-linea"></span>
						<span className="btnNav-linea"></span>
					</label>
				</div>
				<div className="d-none d-md-block">
					{
						visible ? (
							<div className="d-flex gap-2 justify-content-center align-items-center">
								<Link to={getProfileLink()}>
									<div className="fs-5 text-white text-list">{store?.username && `Hola ${store.username}`}
									</div>
								</Link>
								<button onClick={() => { actions.logout(), navigate('/') }} className="btn text-white fs-5 text-list">Cerrar Sesión</button>
							</div>
						) : (
							<ul className='d-flex gap-4 my-auto fs-5'>
								<Link to='/login'>
									<li className='list-group-item text-list'>Iniciar sesión</li>
								</Link>
								<Link to='/register'>
									<li className='list-group-item text-list'>Regístrate</li>
								</Link>
								<li className='list-group-item text-list' onClick={handleContactUsClick}>Contáctanos</li>
							</ul>
						)
					}
				</div>

			</div>
			<div className={viewChange ? 'menu d-md-none' : 'menu menu-off d-md-none'}>
				{
					visible ? (
						<div className="d-flex flex-column gap-2 justify-content-center align-items-center">
							<Link to={getProfileLink()}>
								<div className="username fs-5 p-0 m-0 fw-semibold text-white text-list li-ham">{store.username && `Hola ${store.username}`}</div>
							</Link>
							<button onClick={() => { actions.logout(), navigate('/') }} className="btn btn-ham p-0 bg-transparent text-white fw-semibold fs-5 li-ham">Cerrar Sesión</button>
							<Link to='/contact' className="text-white">
								<li className="list-group-item text-center li-ham fs-5 fw-semibold text-list">Contáctanos</li>
							</Link>
						</div>
					) : (
						<ul className='d-flex flex-column fw-semibold m-0 p-0'>
							<Link to='/login' className='text-white'>
								<li className='list-group-item fs-5 text-center li-ham text-list'>Iniciar Sesion</li>
							</Link>
							<Link to='/register' className="text-white">
								<li className='list-group-item fs-5 text-center li-ham text-list'>Registrate</li>
							</Link>
							<Link to='/footer' className='text-white'>
								<li className='list-group-item fs-5 text-center li-ham text-list'>Contáctanos</li>
							</Link>
						</ul>
					)
				}
			</div>

		</nav>
	);
};
