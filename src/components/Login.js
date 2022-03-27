    import React, { useState } from "react";
    import {Formik,Form,Field, ErrorMessage } from "formik";
    import * as Yup from 'yup';
    import TextError from "./TextError";
    import axios from 'axios'
    import { useNavigate } from "react-router-dom";
    import logo from '../images/logo.png'

    const initialValues = {
    
        
        email: '',
        password: ''
    }

    const validationSchema = Yup.object ({
    
    email: Yup.string().email('Not a valid email').required('This is required field'),
    password : Yup.string().required('This is required')
    })
    
    export const Login = ({authenticate,name,setName}) => {
    
   // const navigate = useNavigate();
    const onSubmit = async(values,onSubmitProps) => {
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    
    try {
        const response = await axios({
            method : 'post',
            url: 'https://ecom-react-task.herokuapp.com/auth/login',
            data: values
            })

        
        localStorage.setItem('token', JSON.stringify(response?.data?.data?.token))
        authenticate();
        setName(response.data.data.user.name)
        
         
        
    
    }
    catch (err) {
        
    }
    
    

    }
    
    

    

    return (
        <div className="form-content">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <div className="content m-auto">
            <div className=" form-header d-flex flex-column align-items-center">
                <img src={logo} alt="logo" className="logo mt-5"/>
                <h1 className="fonty mt-5">Dashboard Login </h1>
            </div>
        <Form className="form-body">
            <div className="mb-3">
            
        
            <div className="mb-3">
            <label htmlFor="name" className="form-label">
                Email address
            </label>
            <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
                

            />
            </div>
            <ErrorMessage name = "email" component={TextError}/>
        
            <label htmlFor="exampleInputPassword1" className="form-label">
            Password
            </label>
            <Field
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                
            />
            </div>
            <ErrorMessage name = 'password' component={TextError}/>
            <div className="form-footer ">
            <button type="submit" className="btn text-white form-button align-center">
            Submit
            </button>
            </div>
        </Form>
        </div>
        </Formik>
        </div>
    );
    };
