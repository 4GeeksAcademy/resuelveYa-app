import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Jumbotron } from "../component/Jumbotron.jsx";
import { ListServices } from "../component/ListServices.jsx";
import { ChatOpenia } from "../component/ChatOpenia.jsx"
import "../../styles/home.css";
import { Footer } from "../component/Footer.jsx";
import AboutUs from "../component/AboutUs.jsx";


export const Home = () => {
    const role = localStorage.getItem('role');
    const { store, actions } = useContext(Context)

    const getPost = async () => {
        const dataPost = await actions.getReviews()
        actions.setDataReviews(dataPost)
        // console.log(store.dataReviews)
    }

    useEffect(() => {
        // console.log(store.reviews)
        getPost()
    }, [])

    return (
        <div className="text-center" style={{ backgroundColor: '#EEEEEE' }}>
            <Jumbotron />
            <AboutUs />
            <ListServices />
            {/* Mostrar ChatOpenia solo si el usuario tiene rol 'cliente' */}
            {role === "client" && <ChatOpenia />}
            <Footer />
        </div>
    );
};
