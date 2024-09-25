import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Jumbotron } from "../component/Jumbotron.jsx";
import { ListServices } from "../component/ListServices.jsx";
import { ChatOpenia } from "../component/ChatOpenia.jsx"
import "../../styles/home.css";
import { Footer } from "../component/Footer.jsx";
import AboutUs from "../component/AboutUs.jsx";
import { useLocation } from "react-router-dom";



export const Home = () => {


	// useEffect(() => {
	// 	if(location.pathname === '/'){

	// 		actions.getReviews()
	// 	}
	// }, [])
	
	return (
		<div className="text-center" style={{backgroundColor: '#EEEEEE'}}>
			<Jumbotron />
			<AboutUs />
			<ListServices />
			<ChatOpenia />
			<Footer />
		</div>
	);
};
