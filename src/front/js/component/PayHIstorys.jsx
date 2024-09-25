import React, { useContext, useEffect } from 'react'
import PayHistory from './PayHistory.jsx'
import { Context } from '../store/appContext'

const PayHistorys = () => {
    const { actions, store } = useContext(Context)
    console.log(store.providerInfo)

    return (
        <div className='bg-white p-4 rounded-3'style={{ backgroundColor: '#fff', width: "100%", maxWidth: "900px" }}>
            <h3 className='fs-4'>Mi historial de pagos:</h3>
            {
                store.providerInfo?.service_history.length === 0 ?
                    <div>
                        No tienes pagos hechos
                    </div>
                    :
                    store.providerInfo?.service_history.map(payInfo =>
                        <PayHistory payInfo={payInfo} key={payInfo.id} />
                    )
            }
        </div>
    )
}

export default PayHistorys