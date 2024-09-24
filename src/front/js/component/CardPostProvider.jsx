import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./styles/cardPostProvider.css"
import { SearchFilter } from "./SearchFilter.jsx";
import { NewCardPost } from "./NewCardPost.jsx";
// import './styles/jumbotron.css'

export const CardPostProvider = () => {
    const { store, actions } = useContext(Context)
    // const token = localStorage.getItem("token")
    // const name = localStorage.getItem("name")
    // const role = localStorage.getItem("role")
    // const [post_id, setPost_id] = useState()
    // console.log(store.reviews)
    // const [rankings, setRankings] = useState({})

    // const handlerRating = async (index, postId) => {
    //     const newRanking = index + 1
    //     setRankings(prev => ({ ...prev, [postId]: newRanking }))
    //     console.log(newRanking)
    //     const data = {
    //         post_id: postId,
    //         rating: newRanking,
    //     }
    //     await actions.newReview(data)
    //     console.log(data)

    // }

    // const handlerId = (item) => {
    //     setPost_id(item)
    //     console.log(item)
    // }

    // const formik = useFormik({
    //     initialValues: {
    //         comment: ''
    //     },
    //     validationSchema: Yup.object({
    //         comment: Yup.string()
    //             .min(8, "El comentario debe tener mínimo caracteres")
    //             .required("No puedes enviar un comentario vacío"),
    //     }),
    //     onSubmit: async (values, { resetForm }) => {
    //         console.log('Formulario enviado con valores:', JSON.stringify(values, null, 2));
    //         const data_comment = {
    //             post_id: post_id,
    //             comment: values.comment
    //         }
    //         // console.log(data_comment)
    //         try {
    //             await actions.newReview(data_comment)
    //             resetForm();

    //         } catch (e) {
    //             console.error(e)
    //         }
    //     },
    // });

    useEffect(() => {
        actions.getReviews()
        // if( store.listServices.length === 0){
        //     actions.getPostsProviders()
        // }
    }, [])

    return (
        <div className="d-flex flex-column align-items-center" style={{ paddingTop: '100px' }}>

            <SearchFilter title={'¡Encuentra tu solución aquí!'} subTitle={'¡Porque nosotros sí resolvemos!'} />

            {
                store.reviews?.map((item, index) => (
                    <NewCardPost item={item} index={index}/>
                ))
            }
        </div>
    );
};
