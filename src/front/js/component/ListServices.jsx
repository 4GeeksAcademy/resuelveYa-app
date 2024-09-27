import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import './styles/listServices.css'
import { Context } from "../store/appContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ListServices = () => {
    const { store } = useContext(Context);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Número de elementos a mostrar por vez
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='mt-4 w-100 list-services mx-auto p-5 rounded-4 mb-5'>
            <h3 className='services-population'>Servicios más populares</h3>
            <Slider {...settings}>
                {store.reviews.map((review, index) => (
                    <div key={index} className="list-card-div">
                        <div className="container-img-def">
                            <img src={review?.post.post_img} alt={`Service ${index}`} className='img-fluid w-100' />
                        </div>
                        <div className='div-desc gap-2'>
                            <div className='d-flex justify-content-center align-items-center pb-1'>
                                {[...Array(5)].map((_, indx) => {
                                    const isRated = review?.average_rating > indx;
                                    return isRated ?
                                        <i className='bx bxs-star text-warning fa-lg d-flex justify-content-center align-items-center' key={indx}></i> :
                                        <i className='bx bx-star fa-lg d-flex justify-content-center align-items-center' key={indx}></i>
                                })}
                            </div>
                            <h4 className="def-h4 m-0">{review?.post.title}</h4>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

