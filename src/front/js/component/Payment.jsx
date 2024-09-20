import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from '../store/appContext';
import './styles/payment.css';

export const Payments = () => {
    const navigate = useNavigate(); 
    
    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            cardHolder: '',
            expiryDate: '',
            cvv: '',
            amount: 100,
        },
        validationSchema: Yup.object({
            cardNumber: Yup.string()
                .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número de tarjeta inválido')
                .required('Requerido'),
            cardHolder: Yup.string().required('Requerido'),
            expiryDate: Yup.string()
                .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Fecha inválida (MM/AA)')
                .required('Requerido'),
            cvv: Yup.string()
                .matches(/^\d{3}$/, 'CVV inválido')
                .required('Requerido'),
            amount: Yup.number()
                .min(1, 'El monto debe ser mayor a 0')
                .required('Requerido'),
        }),
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            navigate('/home'); 
        },
    });

    // Funciones de formato y validación
    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        formik.setFieldValue('cardNumber', formattedValue);
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        let formattedValue = value;
        if (value.length >= 2) {
            formattedValue = value.slice(0, 2) + '/' + value.slice(2);
        }
        formik.setFieldValue('expiryDate', formattedValue);
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

    const cardType = getCardType(formik.values.cardNumber.replace(/\s/g, ''));

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">Realizar Pago</h2>

            <div className={`card-preview ${cardType}`}>
                <div className="card-logo">
                    {cardType === 'visa' && <i className="bi bi-credit-card-2-front-fill visa-icon"></i>}
                    {cardType === 'mastercard' && <i className="bi bi-credit-card-2-front-fill mastercard-icon"></i>}
                </div>
                <div className="card-number">{formik.values.cardNumber || '• • • • • • • • • • • • • • • •'}</div>
                <div className="card-details">
                    <div className="card-holder">{formik.values.cardHolder || 'Nombre del Titular'}</div>
                    <div className="expiry-date">{formik.values.expiryDate || 'MM/AA'}</div>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="payment-form">
                <div className="form-group">
                    <label htmlFor="cardNumber">Número de Tarjeta</label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.cardNumber && formik.errors.cardNumber ? 'is-invalid' : ''}`}
                        id="cardNumber"
                        name="cardNumber"
                        value={formik.values.cardNumber}
                        onChange={handleCardNumberChange}
                        onBlur={formik.handleBlur}
                        placeholder="1234 5678 9012 3456"
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber ? (
                        <div className="invalid-feedback">{formik.errors.cardNumber}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="cardHolder">Nombre del Titular</label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.cardHolder && formik.errors.cardHolder ? 'is-invalid' : ''}`}
                        id="cardHolder"
                        name="cardHolder"
                        value={formik.values.cardHolder}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Nombre Completo"
                    />
                    {formik.touched.cardHolder && formik.errors.cardHolder ? (
                        <div className="invalid-feedback">{formik.errors.cardHolder}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Fecha de Expiración</label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.expiryDate && formik.errors.expiryDate ? 'is-invalid' : ''}`}
                        id="expiryDate"
                        name="expiryDate"
                        value={formik.values.expiryDate}
                        onChange={handleExpiryDateChange}
                        onBlur={formik.handleBlur}
                        placeholder="MM/AA"
                    />
                    {formik.touched.expiryDate && formik.errors.expiryDate ? (
                        <div className="invalid-feedback">{formik.errors.expiryDate}</div>
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
                <button type="submit" className="btn btn-danger btn-block">
                    <i className="fas fa-credit-card"></i> Pagar
                </button>
            </form>
        </div>
    );
};
