import React from "react";
import { Link } from "react-router-dom";
import './styles/navbar.css'

export const Navbar = () => {
	return (
		<nav className='bg-black text-white d-flex justify-content-between align-items-center p-2'>
			<div>
				<Link to='/' className="text-white">
					<h2 className='mb-0 fw-bold'>Resuelve<span>Ya!</span></h2>
				</Link>
			</div>

			<form>
				<input className='p-2 rounded' type="text" placeholder='Que estas buscando...?' />
			</form>

			<ul className='d-flex gap-3 my-auto fs-4 fw-semibold'>
				<Link to='/login' className='text-white'>
					<li className='list-group-item'>Iniciar Sesion</li>
				</Link>
				<Link to='/register' className="text-white">
					<li className='list-group-item'>Registrate</li>
				</Link>
			</ul>

		</nav>
	);
};
