import React from 'react';
import './styles/footer.css'
import bg from "../../img/bg-footer.png"
import ubi from "../../img/ubi.png"

// import { FaInstagramSquare, FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";


// import foto1 from "../../img/electra.jpg";
// import foto2 from "../../img/gasfitero.jpg";
// import foto3 from "../../img/enfermera.jpg";

// import '../../styles/footer.css';

export const Footer = () => {
	return (
		// <footer className="footer py-5 text-center" style={{backgroundImage: `url(${bg})`}}>
		<footer className="footer py-5 text-center">
			<div className='container-bento w-75'>

				<div className="div-footer div-direction div1">
					<h3>Dirección</h3>
					<p className='fs-5'>Ubicanos en: Av. José Larco 1234, Miraflores, Lima, Perú</p>
					<div className='div-img'>
						<img src={ubi} alt="" />
					</div>
				</div>
				<div className="div-footer div-contact div2">
					<h3>Contáctanos</h3>
					<p className='fs-5'>Teléfono: (01) 234-5678</p>
					<p className='fs-5'>Email: resuelveYa@gmail.com</p>
				</div>
				<div className="div-footer div-new-team div3">
					<h3 className='text-center'>Únete a nuestros colaboradores</h3>
					<p className='fs-5'>Si eres un proveedor de servicios, regístrate y comienza a ofrecer tu experiencia a nuestra comunidad. Publica tus horarios disponibles y conecta con clientes que buscan profesionales como tú.</p>
					<p className='fs-5'>Ya sea que busques un servicio o quieras ofrecer uno, SolucionesYa es la plataforma que te ayuda a hacer la conexión perfecta.</p>
				</div>
				<div className="div-footer div-team div4">
					<div id="carouselExampleAutoplaying" className="carousel slide div-caro shadow" data-bs-ride="carousel">
						<h3 className='mt-2'>Equipo</h3>
						<div className="carousel-inner">
							<div className="carousel-item active">
							<h3 className='text-center'>Maguila Sanchez</h3>
								<div className='d-flex gap-4 mb-2 justify-content-center align-items-center'>
									<a className='a-footer'>
										<i className="fa-brands fa-instagram i-footer i-insta"></i>
									</a>
									<a>
										<i className="fa-brands fa-square-facebook i-footer i-face"></i>
									</a>
									<a className='a-footer'>
										<i className="fa-brands fa-linkedin i-footer i-link"></i>
									</a>
								</div>
							</div>
							<div className="carousel-item">
							<h3 className='text-center'>Ericka</h3>
								<div className='d-flex gap-4 mb-2  justify-content-center align-items-center'>
									<a className='a-footer'>
										<i className="fa-brands fa-instagram i-footer i-insta"></i>
									</a>
									<a>
										<i className="fa-brands fa-square-facebook i-footer i-face"></i>
									</a>
									<a className='a-footer'>
										<i className="fa-brands fa-linkedin i-footer i-link"></i>
									</a>
								</div>
							</div>
							<div className="carousel-item">
							<h3 className='text-center'>Kevin</h3>
								<div className='d-flex gap-4 mb-2  justify-content-center align-items-center'>
									<a className='a-footer'>
										<i className="fa-brands fa-instagram i-footer i-insta"></i>
									</a>
									<a>
										<i className="fa-brands fa-square-facebook i-footer i-face"></i>
									</a>
									<a className='a-footer'>
										<i className="fa-brands fa-linkedin i-footer i-link"></i>
									</a>
								</div>
							</div>
						</div>
						<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>
					</div>
				</div>
			</div>
		</footer>
	)
}
