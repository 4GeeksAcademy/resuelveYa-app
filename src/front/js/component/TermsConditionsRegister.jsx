import React from 'react';

const TermsConditionsRegister = ({ role }) => {
  return (
    <div>
      {role === "client" ? (
        <p>
          Como cliente, debe tener cuidado con la información que reciba a través de las publicaciones y no compartir datos personales o de contacto con terceros. Además, es importante ser respetuoso con los proveedores y cumplir con los acuerdos pactados.
        </p>
      ) : (
        <p>
          Como proveedor, para poder realizar una publicación acerca de sus servicios a prestar, dede aceptar pagar una tarifa desde S/30.00 por 1 mes. Además, es responsable de proporcionar información veraz y precisa sobre los servicios que ofreces. Asegúrate de cumplir con los acuerdos pactados y mantener una buena relación con los clientes.
        </p>
      )}
    </div>
  );
};

export default TermsConditionsRegister;
