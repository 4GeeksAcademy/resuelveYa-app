import React from 'react';
import './styles/footer.css'
import bg from "../../img/bg-footer.png"
import ubi from "../../img/ubi.png"
import milton from "../../img/perfil-milton.jpg"
// import { FaInstagramSquare, FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";


<<<<<<< HEAD
=======
// import { FaInstagramSquare, FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";


>>>>>>> e23e49de7b6286169c9ac535b33a4f8ce66c1498
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
					<h3 className='m-0'>Contáctanos</h3>
					<p className='fs-5 m-0'>Teléfono: (01) 234-5678</p>
					<form >
						<div className='d-flex align-items-start gap-2 footer-inputs'>
							<label htmlFor="" className='fs-5 '>Tu correo:</label>
							<input className='form-control footer-input' type="text" />
						</div>
						<div className='d-flex align-items-start gap-2 footer-inputs'>
							<label htmlFor="" className='fs-5'>Dejanos tu mensaje:</label>
							<textarea className='fs-5 footer-input form-control' name="footer-textarea" id="footer-textarea"></textarea>
						</div>
						<button className='btn btn-danger mt-2'>Enviar</button>
					</form>
				</div>
				<div className="div-footer div-new-team div3 overflow-y-auto">
					<h3 className='text-center'>Únete a nuestros colaboradores</h3>
					<p className='fs-5'>Si eres un proveedor de servicios, regístrate y comienza a ofrecer tu experiencia a nuestra comunidad. Publica tus horarios disponibles y conecta con clientes que buscan profesionales como tú.</p>
					<p className='fs-5'>Ya sea que busques un servicio o quieras ofrecer uno, ResuelveYa! es la plataforma que te ayuda a hacer la conexión perfecta.</p>
				</div>
				<div className="div-footer div-team div4">
					<div id="carouselExampleAutoplaying" className="carousel slide div-caro shadow position-relative" data-bs-ride="carousel">
						<h3 className='mt-2 title-team'>Equipo</h3>

						<div className="carousel-inner">
							<div className="carousel-item active bg-profiles">
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Maguila</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
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
							<div className="carousel-item bg-profiles">
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Ericka</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
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
							<div className="carousel-item bg-profiles">
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Kevin</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
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
							<div className="carousel-item bg-profiles">
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Max</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
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
							<div className="carousel-item bg-profiles" style={{ backgroundImage: `url(${milton})` }}>
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Milton Omar Y.</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
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
