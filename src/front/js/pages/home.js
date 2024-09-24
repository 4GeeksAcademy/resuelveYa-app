import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Jumbotron } from "../component/Jumbotron.jsx";
import { ListServices } from "../component/ListServices.jsx";
import "../../styles/home.css";
import { Footer } from "../component/Footer.jsx";



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<Jumbotron />
			<ListServices />
			<Footer />
		</div>
	);
};
