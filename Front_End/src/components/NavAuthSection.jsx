import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPen,
    faUserPlus,
    faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';

const NavAuthSection = ({ role, user, setCurrentCategory, userAvatarUrl }) => {
    let element;
    const [avatarUpdateUrl, setAvatarUpdateUrl] = useState('');

    const logoutHandler = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const avatarUpdateHandler = () => {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

        axios
            .post(
                'http://localhost:8080/webproj/getUserAvatar',
                {
                    username: user,
                    avatarUrl: avatarUpdateUrl,
                },
                { headers }
            )
            .then((response) => {
                if (response.data.success === true) window.location.href = '/';
            })
            .catch((error) => console.log(error));
    };

    switch (role) {
        case 'moderator':
            element = (
                <ModeratorStyled>
                    <Link to="/create-article">
                        <FontAwesomeIcon
                            icon={faPen}
                            onClick={() => setCurrentCategory('')}
                        />
                    </Link>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/2/2b/MOD_Pizza_logo.svg"
                        alt=""
                    />
                    <span>
                        {user}
                        <span className="logout" onClick={logoutHandler}>
                            Log out
                        </span>
                    </span>
                </ModeratorStyled>
            );
            break;
        case 'normal':
            element = (
                <NormalStyled>
                    <div>
                        <img alt="" src={userAvatarUrl} />
                        <div className="avatar-updater active">
                            <input
                                type="text"
                                placeholder="Link to your image"
                                onChange={(e) =>
                                    setAvatarUpdateUrl(e.target.value)
                                }
                            />
                            <button type="button" onClick={avatarUpdateHandler}>
                                Update
                            </button>
                        </div>
                    </div>
                    <span>
                        {user}
                        <span className="logout" onClick={logoutHandler}>
                            Log out
                        </span>
                    </span>
                </NormalStyled>
            );
            break;
        case 'admin':
            element = (
                <AdminStyled>
                    <Link to="/manage-moderator">
                        <FontAwesomeIcon
                            icon={faAddressBook}
                            title="Manage moderator"
                        />
                    </Link>
                    <Link to="/add-moderator">
                        <FontAwesomeIcon
                            icon={faUserPlus}
                            title="Add a moderator"
                        />
                    </Link>
                    <img
                        src="https://gcloudvn.com/wp-content/uploads/2018/01/admin_512dp.png"
                        alt=""
                    />
                    <span>
                        Admin
                        <span className="logout" onClick={logoutHandler}>
                            Log out
                        </span>
                    </span>
                </AdminStyled>
            );
            break;
        default:
            element = (
                <div className="authentication">
                    <Link to="/login">Log In</Link>
                    <Link to="/sign-up" className="sign-up">
                        Sign Up
                    </Link>
                </div>
            );
            break;
    }
    return element;
};

const ModeratorStyled = styled.div`
    display: flex;
    align-items: center;

    img {
        margin-left: 1.5rem;
        width: 2.25rem;
        height: 2.25rem;

        border-radius: 50%;

        object-fit: cover;
    }

    span {
        margin-left: 0.5rem;

        position: relative;

        cursor: pointer;
        .logout {
            display: none;
            padding: 0.3rem 0.7rem;

            text-align: center;

            position: absolute;
            bottom: -2rem;
            left: -2rem;

            box-shadow: 1px 1px 1px #323232;
            border-radius: 4px;
            background: #fff;
            cursor: pointer;

            &:hover {
                color: #d20438;
            }

            &::before {
                content: '';
                height: 1.5rem;
                width: 4rem;

                display: block;
                position: absolute;
                top: -1rem;
            }
        }

        &:hover .logout {
            display: block;
        }
    }

    a {
        padding: 0.5rem;

        border-radius: 5px;
        border: 1px solid #04d28f;
        color: #04d28f;
        &:hover {
            background: linear-gradient(to bottom right, #04d28f, #044cd2);
            border: 1px solid #fff;
            color: #fff;
        }
    }
`;

const AdminStyled = styled(ModeratorStyled)`
    svg {
        color: #044cd2;

        cursor: pointer;
        &:not(:first-child) {
            margin-left: 1rem;
        }
    }
    a {
        border: 1px solid #fff;
        &:hover svg {
            color: #fff;
        }
    }
`;

const NormalStyled = styled(ModeratorStyled)`
    img {
        position: relative;
        cursor: pointer;
    }

    input {
        width: 20rem;
        padding: 1rem 2rem;

        border: none;
        border-radius: 3px;
        outline: none;
    }

    div {
        position: relative;
        .avatar-updater {
            padding: 0.2rem 0.4rem;
            position: absolute;
            left: -12rem;
            display: none;
            box-shadow: 1px 1px 2px #323232;
            button {
                padding: 0.25rem 0.5rem;
                border: none;
                color: #fff;
                background: #04d28f;
                border-radius: 5px;
                cursor: pointer;
                outline: none;
            }
        }

        &:hover .avatar-updater {
            display: flex;
        }
    }
`;
export default NavAuthSection;
