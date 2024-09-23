import React from 'react';


import { FaInstagramSquare, FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";


import foto1 from "../../img/electra.jpg";
import foto2 from "../../img/gasfitero.jpg";
import foto3 from "../../img/enfermera.jpg";

import '../../styles/footer.css';

export const Footer = () => {
	return (
		<div className='container m-auto bg-dark'>
			<div className='col-md-10 m-auto py-3'>
				<div className='row-10 d-flex flex-row '>
					<div className='col-md-4 bg-light m-3'>
						<h3>Direccion</h3>
						<p>aqui direccion</p>
					</div>
					<div className='col-md-8 bg-light'>
						<div className="col-10 mb-2 d-flex flex-row m-3">
							<label htmlFor="exampleFormControlInput1" className="form-label col-4">Dejanos tu correo</label>
							<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
						</div>
						<div className="col-10 mb-2 d-flex flex-row">
							<label htmlFor="exampleFormControlTextarea1" className="form-label col-4">Dejanos tu comentario</label>
							<textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
						</div>
						<button type="button" className="btn btn-primary">Enviar</button>
					</div>
				</div>
			</div>

			<div className='col-10 m-auto'>
				<div className='row-10 d-flex flex-row'>
					<div className='col-8 bg-light m-3'>
						<h3>Unete a Nuestros Colaboradores</h3>
						<p>Si eres un proveedor de servicios, regístrate y comienza a ofrecer tu experiencia a nuestra comunidad. Publica tus horarios disponibles y conecta con clientes que buscan profesionales como tú.<br />
							Ya sea que busques un servicio o quieras ofrecer uno, SolucionesYa es la plataforma que te ayuda a hacer la conexión perfecta.</p>
					</div>
					<div className='col-sm-4 bg-light'>
						<div className="col-10 mb-2 d-flex flex-row">
							<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
								<div className="carousel-inner">
									<div className="carousel-item active">
										<img src={foto1} className="d-block w-100" alt="electicista" />
									</div>
									<div className="carousel-item">
										<img src={foto2} className="d-block w-100" alt="plomero" />
									</div>
									<div className="carousel-item">
										<img src={foto3} className="d-block w-100" alt="enfermera" />
									</div>
								</div>
								<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Previous</span>
								</button>
								<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
							<div className='botones-md-3 d-flex flex-column m-2 py-1 fs-5'>
								<button className='btns fs-5'><FaInstagramSquare /></button>
								<button className='btns'><FaFacebookSquare /></button>
								<button className='btns'><FaGithubSquare /></button>
								<button className='btns'><FaLinkedin /></button>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
