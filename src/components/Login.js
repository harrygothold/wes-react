import React from 'react';

const Login = (props) => (
    <nav className='login'>
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className='github' onClick={() => props.authenticate('Github')} formTarget='_blank'>Log in with Github</button>
        <button className='facebook' onClick={() => props.authenticate('Facebook')}>Log in with Facebook</button>
        <button className='twitter' onClick={() => props.authenticate('Twitter')}>Log in with Twitter</button>
    </nav>
)

export default Login;