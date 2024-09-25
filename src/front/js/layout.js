import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Login } from "./pages/login.js";
import { Register } from "./pages/register.js";
import { SendVerificationCode } from "./pages/sendVerificationCode.js";
import { NewPassword } from "./pages/newPassword.js";
import { UserProfile } from "./pages/userProfile.js";
import { AdminProfile } from "./pages/adminProfile.js";
import { ProviderNewPost } from "./pages/providerNewPost.js";
import { PaymentPage } from "./pages/payment.js";
import { CardPostsList } from "./pages/cardPostsList.js";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";


    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar/>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Register />} path="/register" />
                    <Route element={<SendVerificationCode />} path="/sendverificationcode" />
                    <Route element={<NewPassword />} path="/newpassword" />
                    <Route element={<UserProfile />} path="/userprofile" />
                    <Route element={<AdminProfile />} path="/adminprofile" />
                    <Route element={<ProviderNewPost />} path="/providernewpost" />
                    <Route element={<PaymentPage />} path="/payment" />
                    <Route element={<CardPostsList />} path="/cardPostsList" />

                </Routes>
                {/* <Footer /> */}
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
