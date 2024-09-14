import React from 'react'
import LoginClient from './../components/auth/LoginClient';
import { getCurrentUser } from '../actions/getCurrentUser';

const Login = async () => {
    const currentUser = await getCurrentUser();
    return (
        <div>
            <LoginClient currentUser={currentUser} />
        </div>
    )
}

export default Login
