import React from "react";
// import { GrInstagram } from "react-icons/gr";
// import { FaFacebookF } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 text-center">
      <div className="col-sm-10 m-auto">
        <div className="container-fluid bg-custom m-auto">
          <div className="row d-flex justify-content-around pt-3">
            <div className="col-md-4 bg-light border-dark d-flex flex-column text-center">
              <h3>Direccion</h3>
              <p></p>

            </div>
            <div className="col-md-7 bg-light d-flex flex-column ">
              <div className="m-4 d-flex flex-row">
                <label htmlFor="exampleFormControlInput1" className="col-sm-3 form-label">Dejanos tu Correo</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
              <div className="m-4  d-flex flex-row">
                <label htmlFor="exampleFormControlTextarea1" className="col-sm-3 form-label">Dejanos tu mensaje</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="btn m-auto">
                <button type="button" className="btn btn-primary m-auto">Enviar</button>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-around py-3">
            <div className="col-md-7 bg-light d-flex flex-column text-center">
              <h3>Unete a Nuestros Colaboradores</h3>
              <p>Si eres un proveedor de servicios, regístrate y comienza a ofrecer tu experiencia a nuestra comunidad. Publica tus horarios disponibles y conecta con clientes que buscan profesionales como tú.<br />
                Ya sea que busques un servicio o quieras ofrecer uno, SolucionesYa es la plataforma que te ayuda a hacer la conexión perfecta..</p>

            </div>
            <div className="col-md-4 bg-light d-flex align-items-center justify-content-center">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="../img/f1.jpg" className="d-block w-100" alt="." />
                  </div>
                  <div className="carousel-item">
                    <img src="..." className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="..." className="d-block w-100" alt="..." />
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
                {/* <div className="btns">
                 <button className="btnx fs-3 m-2"><GrInstagram /></button>
                <button className="btnx fs-3 m-2"><FaFacebookF /></button>
                <button className="btnx fs-3 m-2"><FaGithub /></button>
                <button className="btnx fs-3 m-2"><FaLinkedin /></button>
              </div> */}
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  )
}
