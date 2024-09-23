import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from '../store/appContext';
import './styles/payment.css';

export const Payments = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [payComplete, setPayComplete] = useState(false)
    const [payDetails, setPayDetails] = useState({})

    const formik = useFormik({
        initialValues: {
            card_number: '',
            name: '',
            expiry_date: '',
            cvv: '',
            amount: 100,
        },
        validationSchema: Yup.object({
            card_number: Yup.string()
                .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número de tarjeta inválido')
                .required('Requerido'),
            name: Yup.string().required('Requerido'),
            expiry_date: Yup.string()
                .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Fecha inválida (MM/AA)')
                .required('Requerido'),
            cvv: Yup.string()
                .matches(/^\d{3}$/, 'CVV inválido')
                .required('Requerido'),
            amount: Yup.number()
                .min(1, 'El monto debe ser mayor a 0')
                .required('Requerido'),
        }),

        onSubmit: async (values, formikActions) => {
            try {
                const paymentData = {
                    "card_number": values.card_number,
                    "name": values.name,
                    "expiry_date": values.expiry_date,
                    "cvv": values.cvv,
                    "amount": values.amount,
                    "new_post_data": store.dataNewPost
                };
                console.log({ 'datos enviados': paymentData })
                const result = await actions.processPayment(paymentData);

                console.log(result)

                setPayComplete(true)
                setPayDetails(paymentData)
                formikActions.setSubmitting(false);
                formikActions.resetForm();
            } catch (error) {
                console.error('Error en el procesamiento del pago:', error);
                formikActions.setSubmitting(false);
            }
        }
    });

    // Funciones de formato y validación
    const handlecard_numberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        formik.setFieldValue('card_number', formattedValue);
        console.log(value)
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        let formattedValue = value;
        if (value.length >= 2) {
            formattedValue = value.slice(0, 2) + '/' + value.slice(2);
        }
        formik.setFieldValue('expiry_date', formattedValue);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
        formik.setFieldValue('cvv', value);
    };

    const getCardType = (number) => {
        if (number.startsWith('4')) {
            return 'visa';
        } else if (number.startsWith('5')) {
            return 'mastercard';
        }
        return 'default';
    };

    const cardType = getCardType(formik.values.card_number.replace(/\s/g, ''));

    return (
        <div>

            {
                payComplete ?
                    <div style={{ paddingTop: '100px' }}>
                        <h2 className='text-center'>¡Pago Realizado con Éxito!</h2>
                        <div className='w-75 mx-auto bg-light p-3 rounded' style={{ maxWidth: '400px' }}>
                            <p>Número de Tarjeta: <strong>{payDetails.card_number}</strong></p>
                            <p>Nombre del Titular: <strong>{payDetails.name}</strong></p>
                            <p>CVV: <strong>***</strong></p> {/* No muestres el CVV por razones de seguridad */}
                            <p>Monto: <strong>S/{payDetails.amount}</strong></p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center p-3'>
                            <Link to='/userprofile'>
                                <button className='btn btn-secondary'>Volver a mis publicaciones</button>
                            </Link>
                        </div>
                        <p className='text-center'>Gracias por tu compra. ¡Tu pago ha sido procesado exitosamente!</p>
                    </div> :
                    <div className="container d-flex flex-column align-items-center" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                        <h2 className="text-center mb-4 text-white">Realizar Pago</h2>

                        <div className={`card-preview ${cardType} position-relative`} >
                            {cardType === 'visa' && <i className='bx bxl-visa text-light' style={{ fontSize: "100px", position: "absolute", right: "85px", top: "0" }}></i>}
                            {cardType === 'mastercard' && <i className='bx bxl-mastercard text-light' style={{ fontSize: "100px", position: "absolute", right: "85px", top: "0" }} ></i>}
                            <div className="card-number">{formik.values.card_number || '• • • • • • • • • • • • • • • •'}</div>
                            <div className="card-details">
                                <div className="card-holder">{formik.values.name || 'Nombre del Titular'}</div>
                                <div className="expiry-date">{formik.values.expiry_date || 'MM/AA'}</div>
                            </div>
                        </div>

                        <form onSubmit={formik.handleSubmit} className="payment-form">
                            <div className="form-group">
                                <label htmlFor="card_number">Número de Tarjeta</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.card_number && formik.errors.card_number ? 'is-invalid' : ''}`}
                                    id="card_number"
                                    name="card_number"
                                    value={formik.values.card_number}
                                    onChange={handlecard_numberChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="0000 0000 0000 0000"
                                />
                                {formik.touched.card_number && formik.errors.card_number ? (
                                    <div className="invalid-feedback">{formik.errors.card_number}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nombre del Titular</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Nombre Completo"
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="invalid-feedback">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiry_date">Fecha de Expiración</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.expiry_date && formik.errors.expiry_date ? 'is-invalid' : ''}`}
                                    id="expiry_date"
                                    name="expiry_date"
                                    value={formik.values.expiry_date}
                                    onChange={handleExpiryDateChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="MM/AA"
                                />
                                {formik.touched.expiry_date && formik.errors.expiry_date ? (
                                    <div className="invalid-feedback">{formik.errors.expiry_date}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.cvv && formik.errors.cvv ? 'is-invalid' : ''}`}
                                    id="cvv"
                                    name="cvv"
                                    value={formik.values.cvv}
                                    onChange={handleCvvChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="123"
                                />
                                {formik.touched.cvv && formik.errors.cvv ? (
                                    <div className="invalid-feedback">{formik.errors.cvv}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Monto</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className={`form-control ${formik.touched.amount && formik.errors.amount ? 'is-invalid' : ''}`}
                                        id="amount"
                                        name="amount"
                                        value={formik.values.amount}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Monto en soles"
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text">S/</span>
                                    </div>
                                </div>
                                {formik.touched.amount && formik.errors.amount ? (
                                    <div className="invalid-feedback">{formik.errors.amount}</div>
                                ) : null}
                            </div>
                            <br />
                            <div className="payment-button-container">
                                <button type="submit" className="btn btn-danger btn-block">
                                    <i className="fas fa-credit-card"></i> Pagar
                                </button>
                            </div>
                        </form>
                    </div>
            }

        </div>
    );
};
