import {useState} from 'react'

function LoginForm({logInCustomer, updateLoginFormData}){

    return (
        <div className="user-form">
            <h2>Login Form</h2>
            <form onSubmit={logInCustomer}>
                <label>Username: </label>
                <input onChange={updateLoginFormData} type="text" name="username" placeholder="Enter your username..."/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default LoginForm