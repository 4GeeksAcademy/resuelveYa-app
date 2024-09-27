import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "./styles/cardPostProvider.css"
import { SearchFilter } from "./SearchFilter.jsx";
import { NewCardPost } from "./NewCardPost.jsx";
import {Search2} from './Search2.jsx'

export const CardPostProvider = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        console.log(store.reviews)
        if(store.reviews.length === 0) {
            actions.getReviews()
        }
    }, [])

    return (
        <div className="d-flex flex-column align-items-center" style={{ paddingTop: '100px' }}>

            <SearchFilter title={'¡Encuentra tu solución aquí!'} subTitle={'¡Porque nosotros sí resolvemos!'}/>
            {/* <Search2 /> */}
            {
                store.reviews?.map((item, index) => (
                    <NewCardPost item={item} index={index} key={item.post.id}/>
                ))
            }
        </div>
    );
};
