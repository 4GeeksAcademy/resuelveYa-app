import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className='bg-black text-white d-flex justify-content-between align-items-center p-2'>
			<div><h1 className='mb-0 fw-bold'>Resuelve<span>Ya!</span></h1></div>

			<form>
				<input className='p-2 rounded' type="text" placeholder='Que estas buscando...?' />
			</form>

			<ul className='d-flex gap-3 my-auto fs-3 fw-semibold'>
				<Link to='/login' className='text-white'>
					<li className='list-group-item border-bottom-0'>Iniciar Sesion</li>
				</Link>
				<li className='list-group-item'>Registrate</li>
			</ul>

		</nav>
	);
};
