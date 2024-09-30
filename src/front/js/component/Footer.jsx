import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import './styles/footer.css'
import bg from "../../img/bg-footer.png"
import ubi from "../../img/ubi.png"
import milton from "../../img/perfil-milton.jpg"
import kevin from "../../img/kevin_img.jpg"
import ericka from "../../img/perfil-ericka.jpg"
import magui from "../../img/maguisr.jpg"
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import '../../styles/footer.css';

export const Footer = () => {
	const { actions } = useContext(Context);
	const [showAlert, setShowAlert] = useState({ visible: false, message: "", type: "" });

	const formik = useFormik({
		initialValues: {
			email: '',
			message: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Correo electrónico inválido')
				.required('El correo electrónico es requerido'),
			message: Yup.string()
				.min(10, "El mensaje debe tener al menos 10 caracteres")
				.required("Déjanos un mensaje por favor"),
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				const data = await actions.sendContactMessage(values)
				resetForm();
				setShowAlert({
					visible: true,
					message: "Mensaje enviado exitosamente",
					type: "success"
				});
				setTimeout(() => {
					setShowAlert({
						visible: false,
					});
				}, 2000);


			} catch (e) {
				console.error(e);
			}
		},
	});



	return (
		<footer id="footer" className="footer py-5 text-center">
			<div className='container-bento w-75'>

				{/* <div className="div-footer div-direction div1">
					<h3>Dirección</h3>
					<p className='fs-5'>Ubicanos en: Av. José Larco 1234, Miraflores, Lima, Perú</p>
					<div className='div-img'>
						<img src={ubi} alt="" />
					</div>
				</div> */}

				<div className="div-footer div-contact div1">
					<h3 className='m-0'>Contáctanos</h3>
					<p className='fs-5 m-0'>Teléfono: (01) 234-5678</p>
					{showAlert.visible && (
						<div className={`alert alert-${showAlert.type} p-2`} role="alert">
							{showAlert.message}
						</div>
					)}
					<form onSubmit={formik.handleSubmit}>
						<div className='d-flex align-items-start gap-2 footer-inputs pb-2'>
							<label htmlFor="" className='fs-5 '>Tu correo:</label>
							<input className='form-control footer-input email-footer' type="email" id="email"
								name="email" onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email} />
							{formik.touched.email && formik.errors.email ? (
								<div className="text-danger">{formik.errors.email}</div>
							) : null}
						</div>
						<div className='d-flex align-items-start gap-2 footer-inputs pb-2'>
							<label htmlFor="" className='fs-5'>Déjanos tu mensaje:</label>
							<textarea className='fs-5 footer-input form-control' id="message"
								name="message" onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.message}></textarea>
							{formik.touched.message && formik.errors.message ? (
								<div className="text-danger">{formik.errors.message}</div>
							) : null}
						</div>
						<div className="col-md-12">
							<button className="btn btn-login w-50 mt-2 text-uppercase rounded-pill" type="submit">Enviar</button>
						</div>
					</form>
				</div>

				<div className="div-footer div-new-team div2 overflow-y-auto text-center">
					<h3 className='text-center pb-4'>Únete a nuestros colaboradores</h3>
					<p className='fs-5'>Si eres un proveedor de servicios, regístrate y comienza a ofrecer tu experiencia a nuestra comunidad. Publica tus servicios disponibles y conecta con clientes que buscan profesionales como tú.</p>
					<p className='fs-5 m-0'>Ya sea que busques un servicio o quieras ofrecer uno, ResuelveYa es la plataforma que te ayuda a hacer la conexión perfecta.</p>
				</div>
				<div className="div-footer div-team div3 text-white">
					<div id="carouselExampleAutoplaying" className="carousel slide div-caro shadow position-relative" data-bs-ride="carousel">
						<h3 className='mt-2 title-team'>Equipo</h3>

						<div className="carousel-inner">
							<div className="carousel-item active bg-profiles" style={{ backgroundImage: `url(${magui})` }}>
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Maguila Sanchez</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
										<a className='a-footer' href="https://github.com/MaguiSanchez" target="_blank" rel="noopener noreferrer">
											<i className="fa-brands fa-github i-footer i-github"></i>
										</a>
										<a className='a-footer' href="https://linkedin.com/in/maguisanchezr" target="_blank" rel="noopener noreferrer">
											<i className="fa-brands fa-linkedin i-footer i-link"></i>
										</a>
									</div>
								</div>
							</div>
							<div className="carousel-item bg-profiles" style={{ backgroundImage: `url(${ericka})` }}>
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Ericka Castillo</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
										<a className='a-footer' href="https://github.com/erickact" target="_blank" rel="noopener noreferrer">
											<i className="fa-brands fa-github i-footer i-github"></i>
										</a>
										<a className='a-footer' href="https://www.linkedin.com/in/erickacastillot/" target="_blank" rel="noopener noreferrer">
											<i className="fa-brands fa-linkedin i-footer i-link"></i>
										</a>
									</div>
								</div>
							</div>
							<div className="carousel-item bg-profiles" style={{ backgroundImage: `url(${kevin})` }}>
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Kevin</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
										<a className='a-footer' href="https://github.com/Kevin962022" target="_blank" rel="noopener noreferrer">
											<i className="fa-brands fa-github i-footer i-github"></i>
										</a>
										<a className='a-footer' href="https://www.linkedin.com/in/kevin-césar-villafuerte-montero-712520283" target="_blank" rel="noopener noreferrer">
											<i className="fa-brands fa-linkedin i-footer i-link"></i>
										</a>
									</div>
								</div>
							</div>

							<div className="carousel-item bg-profiles" style={{ backgroundImage: `url(${milton})` }}>
								<div className='profile-details w-100'>
									<h3 className='text-center fs-4 title-car m-0 mb-1'>Milton Omar Y.</h3>
									<div className='d-flex gap-4 justify-content-center align-items-center '>
										<a className='a-footer' href="https://github.com/" target="_blank" rel="noopener noreferrer">
											<i className="fa-brands fa-github i-footer i-github"></i>
										</a>
										<a className='a-footer' href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer">
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
			<div className="text-light" id="copyright">Copyright&copy; 2024- Todos los derechos reservados a ResuelveYa!</div>
		</footer>
	)
}
