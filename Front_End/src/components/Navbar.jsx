// import { useEffect } from 'react';
import NavAuthSection from './NavAuthSection';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = ({
    role,
    user,
    currentCategory,
    setCurrentCategory,
    userAvatarUrl,
    setCurrentPage,
}) => {
    return (
        <Nav>
            <div className="logo">
                <Link
                    to="/"
                    onClick={() => {
                        setCurrentCategory('default');
                        setCurrentPage(1);
                        window.scrollTo(0, 0);
                    }}
                >
                    tech-sharing
                </Link>
            </div>
            <ul>
                <li>
                    <Link
                        to="/"
                        className={
                            currentCategory === 'default' ? 'active' : ''
                        }
                        onClick={() => {
                            setCurrentCategory('default');
                            setCurrentPage(1);
                            window.scrollTo(0, 0);
                        }}
                    >
                        Newest
                    </Link>
                </li>
                <li>
                    <Link
                        to="/"
                        className={
                            currentCategory === 'front-end' ? 'active' : ''
                        }
                        onClick={() => {
                            setCurrentCategory('front-end');
                            setCurrentPage(1);
                            window.scrollTo(0, 0);
                        }}
                    >
                        Front-end
                    </Link>
                </li>
                <li>
                    <Link
                        to="/"
                        className={
                            currentCategory === 'back-end' ? 'active' : ''
                        }
                        onClick={() => {
                            setCurrentCategory('back-end');
                            setCurrentPage(1);
                            window.scrollTo(0, 0);
                        }}
                    >
                        Back-end
                    </Link>
                </li>
                <li>
                    <Link
                        to="/"
                        className={currentCategory === 'ios' ? 'active' : ''}
                        onClick={() => {
                            setCurrentCategory('ios');
                            setCurrentPage(1);
                            window.scrollTo(0, 0);
                        }}
                    >
                        iOS
                    </Link>
                </li>
                <li>
                    <Link
                        to="/"
                        className={
                            currentCategory === 'android' ? 'active' : ''
                        }
                        onClick={() => {
                            setCurrentCategory('android');
                            setCurrentPage(1);
                            window.scrollTo(0, 0);
                        }}
                    >
                        Android
                    </Link>
                </li>

                <li>
                    <Link
                        to="/"
                        className={
                            currentCategory === 'tips-tricks' ? 'active' : ''
                        }
                        onClick={() => {
                            setCurrentCategory('tips-tricks');
                            setCurrentPage(1);
                            window.scrollTo(0, 0);
                        }}
                    >
                        Tips & tricks
                    </Link>
                </li>
            </ul>

            <NavAuthSection
                role={role}
                user={user}
                setCurrentCategory={setCurrentCategory}
                userAvatarUrl={userAvatarUrl}
            />
        </Nav>
    );
};

const Nav = styled.div`
    padding: 1rem 10rem;
    margin: 0 -10rem;
    position: sticky;
    top: 0;

    box-shadow: 1px 1px 2px rgba(30, 30, 30, 0.3);

    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: space-between;

    z-index: 2;

    ul {
        display: flex;
        align-items: center;
        justify-content: space-between;

        list-style: none;

        li {
            a {
                color: #04d28f;

                cursor: pointer;
                user-select: none;

                &:hover {
                    text-decoration: underline;
                }

                &.active {
                    color: #323232;

                    cursor: auto;
                    &:hover {
                        text-decoration: none;
                    }
                }
            }

            &:not(:first-child) {
                margin-left: 1.5rem;
            }
        }
    }

    .authentication {
        a {
            color: #04d28f;

            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        .sign-up {
            padding: 0.5rem 1rem;
            margin-left: 0.5rem;

            border: none;
            border-radius: 5px;

            color: #fff;
            background: #04d28f;

            cursor: pointer;
            outline: none;
        }
    }

    .logo {
        a {
            font-family: 'Satisfy', cursive;
            font-size: 1.5rem;
            color: #fec516;
            cursor: pointer;
        }
    }
`;

export default Navbar;
