import React from 'react';

const TermsConditionsRegister = ({ role }) => {
  return (
    <div>
      {role === "client" ? (
        <p>
          Como cliente, debes tener cuidado con la información que ves en las publicaciones y no compartir datos personales o de contacto con terceros. Además, es importante ser respetuoso con los proveedores y cumplir con los acuerdos pactados.
        </p>
      ) : (
        <p>
          Como proveedor, debes pagar una tarifa plana desde S/30.00 por 1 mes para publicar tus servicios. Además, eres responsable de proporcionar información veraz y precisa sobre los servicios que ofreces. Asegúrate de cumplir con los acuerdos pactados y mantener una buena relación con los clientes.
        </p>
      )}
    </div>
  );
};

export default TermsConditionsRegister;
