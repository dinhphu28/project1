import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setRole, setUserIntoLocalStorage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleSelected, setRoleSelected] = useState('normal');
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const loginClickedHandler = () => {
        switch (roleSelected) {
            case 'admin':
                username === 'admin' && password === 'password'
                    ? setRole('admin')
                    : setRole('non-user');
                if (localStorage.getItem('role') === 'admin') {
                    window.location.href = '/';
                }
                break;
            case 'moderator':
                username &&
                    password &&
                    axios
                        .post(
                            'http://localhost:8080/webproj/getLogInRequest',
                            {
                                username: username,
                                password: password,
                                role: 2,
                            },
                            { headers }
                        )
                        .then((response) => {
                            if (response.data.success) {
                                setUserIntoLocalStorage(username);
                                setRole('moderator');
                                window.location.href = '/';
                            }
                        })
                        .catch((error) => console.log(error));
                break;
            default:
                username &&
                    password &&
                    axios
                        .post(
                            'http://localhost:8080/webproj/getLogInRequest',
                            {
                                username: username,
                                password: password,
                                role: 1,
                            },
                            { headers }
                        )
                        .then((response) => {
                            if (response.data.success) {
                                setUserIntoLocalStorage(username);
                                setRole('normal');
                                window.location.href = '/';
                            }
                        })
                        .catch((error) => console.log(error));
                break;
        }
    };

    return (
        <LoginStyled>
            <div className="layer"></div>
            <form action="">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="role-selections">
                    <div>
                        <input
                            type="radio"
                            name="role"
                            id="normal-user"
                            value="User"
                            defaultChecked
                            onClick={() => setRoleSelected('normal')}
                        />
                        <label htmlFor="normal-user">User</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="role"
                            id="moderator"
                            value="Moderator"
                            onClick={() => setRoleSelected('moderator')}
                        />
                        <label htmlFor="moderator">Moderator</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="role"
                            id="admin"
                            value="Admin"
                            onClick={() => setRoleSelected('admin')}
                        />
                        <label htmlFor="admin">Admin</label>
                    </div>
                </div>
                <button onClick={loginClickedHandler} type="button">
                    Log In
                </button>
                <Link to="/">Back to homepage</Link>
            </form>
        </LoginStyled>
    );
};

const LoginStyled = styled.div`
    form {
        padding: 2rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%);

        background: #fff;
        border-radius: 5px;

        z-index: 4;
    }

    input {
        padding: 1rem 2rem;
        min-width: 20rem;

        display: block;

        border: 1px solid #04d28f;
        border-radius: 5px;

        outline: none;

        &:not(:first-child) {
            margin-top: 0.75rem;
        }
    }

    button {
        padding: 1rem 2rem;
        margin-top: 0.75rem;

        display: flex;
        justify-content: center;

        background: #04d28f;
        color: #fff;
        border: 1px solid #04d28f;
        border-radius: 100px;

        outline: none;
        cursor: pointer;
        &:hover {
            background: #fff;
            color: #04d28f;
            border: 1px solid #04d28f;
        }
    }

    a {
        margin-top: 0.75rem;
        color: #04d28f;
        &:hover {
            text-decoration: underline;
        }
    }

    .layer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background: #323232;
        opacity: 0.7;

        z-index: 3;
    }

    .role-selections {
        margin-top: 0.75rem;

        display: flex;
        justify-content: center;
        div {
            display: flex;
            align-items: center;
            &:not(:first-child) {
                margin-left: 1.5rem;
            }
        }
        input {
            min-width: 10px;
        }
        label {
            padding-left: 0.5rem;
            color: #323232;
            user-select: none;
        }
    }
`;

export default Login;
