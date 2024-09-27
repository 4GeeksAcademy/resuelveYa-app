import React from 'react'

const PayHistory = ({payInfo}) => {
    return (
        <div className='border p-3 bg-white post-history shadow-sm mb-3'>
            <p className='m-0'><span className='fw-semibold'>Monto pagado:</span> S/{payInfo.amount_paid}</p>
            <p className='m-0'><span className='fw-semibold'>Fecha del pago:</span> {payInfo.created_at}</p>
            <p className='m-0'><span className='fw-semibold'>Número de transacción:</span> {payInfo.payment_id}</p>
        </div>
    )
}

export default PayHistory;