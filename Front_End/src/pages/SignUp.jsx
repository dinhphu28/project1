import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');
    const [password, setPassword] = useState('');
    const [isNotExistedUsername, setIsNotExistUsername] = useState(true);

    const retypePasswordHandler = (e) => {
        e.target.value === password
            ? setPasswordCheckMessage('')
            : setPasswordCheckMessage('Two password field must be same');
        setPasswordRetype(e.target.value);
    };

    const signUpHandler = () => {
        const apiData = {
            username: username,
            password: password,
            role: 1,
        };
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

        if (
            password === passwordRetype &&
            username !== '' &&
            password &&
            isNotExistedUsername
        ) {
            axios
                .post(
                    `http://localhost:8080/webproj/getSignUpInfo`,
                    apiData,
                    {
                        headers,
                    }
                )
                .then((window.location.href = '/successfully'))
                .catch((error) => console.error(error));
        }
    };

    const usernameValidate = (e) => {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

        axios
            .post(
                'http://localhost:8080/webproj/postIsNotExistNormUsername',
                {
                    currentUsername: e.target.value,
                },
                { headers }
            )
            .then((response) =>
                response.data.isNotExisted
                    ? setIsNotExistUsername(true)
                    : setIsNotExistUsername(false)
            );
        setUsername(e.target.value);
    };

    return (
        <SignUpStyled>
            <div className="layer"></div>
            <form action="">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => usernameValidate(e)}
                />
                {!isNotExistedUsername && (
                    <span>This username was existed</span>
                )}
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordCheckMessage('');
                    }}
                />
                <input
                    type="password"
                    placeholder="Retype password"
                    onChange={retypePasswordHandler}
                />
                <span>{passwordCheckMessage}</span>
                <button type="button" onClick={signUpHandler}>
                    Create my account
                </button>
                <Link to="/">Back to homepage</Link>
            </form>
        </SignUpStyled>
    );
};

const SignUpStyled = styled.div`
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
    span {
        margin-top: 0.5rem;

        display: inline-block;
        color: red;
    }
`;

export default SignUp;
