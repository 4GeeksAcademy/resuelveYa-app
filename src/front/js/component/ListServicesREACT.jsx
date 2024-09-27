import React, { useContext, useEffect, useState } from 'react'
import { CardService } from './CardService.jsx'
import './styles/listServices.css'
import { Context } from "../store/appContext";
export const ListServices = () => {
    const { actions, store } = useContext(Context)
    const [users, setUsers] = useState([])
    console.log(store.reviews)

    return (
        <div className='mt-4 w-100 list-services mx-auto py-5'>
            <h1>Servicios más populares</h1>
            <div className="gallery js-flickity"
                data-flickity-options='{ "wrapAround": true }'>
                <div className="gallery-cell list-card-div list-card-1">
                    {/* <div className='bg-white d-flex justify-content-center align-items-center' style={{ height: '10%' }}>
                        {
                            [... new Array(5)].map((_, indx) => {
                                const isRated = store.reviews[0]?.average_rating > indx;
                                return isRated ?
                                    <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i> :
                                    <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i>
                            })
                        }
                    </div> */}
                    <div className="container-img-def">
                        <img src={store.reviews[0]?.post.post_img} alt="" />
                    </div>
                    <div className='div-desc gap-1'>
                        <div className='bg-white d-flex justify-content-center align-items-center'>
                            {
                                [... new Array(5)].map((_, indx) => {
                                    const isRated = store.reviews[0]?.average_rating > indx;
                                    return isRated ?
                                        <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i> :
                                        <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i>
                                })
                            }
                        </div>
                        <h4 className="def-h4 m-0">
                            {store.reviews[0]?.post.title}
                        </h4>
                    </div>
                </div>
                <div className="gallery-cell list-card-div list-card-1">
                    {/* <div className='bg-white d-flex justify-content-center align-items-center' style={{ height: '10%' }}>
                        {
                            [... new Array(5)].map((_, indx) => {
                                const isRated = store.reviews[1]?.average_rating > indx;
                                return isRated ?
                                    <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i> :
                                    <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i>
                            })
                        }
                    </div> */}
                    <div className="container-img-def">
                        <img src={store.reviews[1]?.post.post_img} alt="" />
                    </div>
                    <div className='div-desc gap-1'>
                        <div className='bg-white d-flex justify-content-center align-items-center'>
                            {
                                [... new Array(5)].map((_, indx) => {
                                    const isRated = store.reviews[1]?.average_rating > indx;
                                    return isRated ?
                                        <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i> :
                                        <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i>
                                })
                            }
                        </div>
                        <h4 className="def-h4 m-0">
                            {store.reviews[1]?.post.title}
                        </h4>
                    </div>
                </div>
                <div className="gallery-cell list-card-div list-card-1">
                    {/* <div className='bg-white d-flex justify-content-center align-items-center' style={{ height: '10%' }}>
                        {
                            [... new Array(5)].map((_, indx) => {
                                const isRated = store.reviews[2]?.average_rating > indx;
                                return isRated ?
                                    <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i> :
                                    <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i>
                            })
                        }
                    </div> */}
                    <div className="container-img-def">
                        <img src={store.reviews[2]?.post.post_img} alt="" />
                    </div>
                    <div className='div-desc gap-1'>
                        <div className='bg-white d-flex justify-content-center align-items-center'>
                            {
                                [... new Array(5)].map((_, indx) => {
                                    const isRated = store.reviews[2]?.average_rating > indx;
                                    return isRated ?
                                        <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i> :
                                        <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i>
                                })
                            }
                        </div>
                        <h4 className="def-h4 m-0">
                            {store.reviews[2]?.post.title}
                        </h4>
                    </div>
                </div>
                <div className="gallery-cell list-card-div list-card-1">
                    {/* <div className='bg-white d-flex justify-content-center align-items-center' style={{ height: '10%' }}>
                        {
                            [... new Array(5)].map((_, indx) => {
                                const isRated = store.reviews[3]?.average_rating > indx;
                                return isRated ?
                                    <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i> :
                                    <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i>
                            })
                        }
                    </div> */}
                    <div className="container-img-def">
                        <img src={store.reviews[3]?.post.post_img} alt="" />
                    </div>
                    <div className='div-desc gap-1'>
                        <div className='bg-white d-flex justify-content-center align-items-center'>
                            {
                                [... new Array(5)].map((_, indx) => {
                                    const isRated = store.reviews[3]?.average_rating > indx;
                                    return isRated ?
                                        <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i> :
                                        <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i>
                                })
                            }
                        </div>
                        <h4 className="def-h4 m-0">
                            {store.reviews[3]?.post.title}
                        </h4>
                    </div>
                </div>
                <div className="gallery-cell list-card-div list-card-1">
                    {/* <div className='bg-white d-flex justify-content-center align-items-center' style={{ height: '10%' }}>
                        {
                            [... new Array(5)].map((_, indx) => {
                                const isRated = store.reviews[1]?.average_rating > indx;
                                return isRated ?
                                    <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i> :
                                    <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                        key={indx}>
                                    </i>
                            })
                        }
                    </div> */}
                    <div className="container-img-def">
                        <img src="https://img.freepik.com/free-photo/man-engaged-household-task_23-2151741266.jpg?t=st=1727368854~exp=1727372454~hmac=34ffaddc707b2a38186d6147318d594aab4ee5329ac6f4cea6b0af2bf8d8cb12&w=740" alt="" />
                    </div>
                    <div className='div-desc gap-1'>
                        <div className='bg-white d-flex justify-content-center align-items-center'>
                            {
                                [... new Array(5)].map((_, indx) => {
                                    const isRated = store.reviews[0]?.average_rating > indx;
                                    return isRated ?
                                        <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i> :
                                        <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center'
                                            key={indx}>
                                        </i>
                                })
                            }
                        </div>
                        <h4 className="def-h4 m-0">
                            {store.reviews[0]?.post.title}
                        </h4>
                    </div>
                </div>

            </div>
        </div>
    )
}

