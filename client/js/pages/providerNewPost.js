import React from "react";
import { NewPost } from "../component/NewPost.jsx";

export const ProviderNewPost = () => {
	return (
        <div className="d-flex justify-content-center p-5 bg-light">
            <NewPost/>
        </div>
	);
};