import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Article from './pages/Article';
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import CreateArticle from './pages/CreateArticle';
import ManageModerator from './pages/ManageModerator';
import AddModerator from './pages/AddModerator';
import SignUpSuccessfully from './pages/SignUpSuccessfully';
import GlobalStyle from './components/GlobalStyles';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

function App() {
    const getRoleFromLocalStorage = () => {
        const role = localStorage.getItem('role') || 'non-user';
        return role;
    };

    const setRoleIntoLocalStorage = (role) => {
        localStorage.setItem('role', role);
    };

    const getUserFromLocalStorage = () => {
        const user = localStorage.getItem('user') || '';
        return user;
    };

    const setUserIntoLocalStorage = (user) => {
        localStorage.setItem('user', user);
    };

    const [user] = useState(getUserFromLocalStorage);
    const [role] = useState(getRoleFromLocalStorage);
    const [articles, setArticles] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('default');
    const [numberOfArticles, setNumberOfArticles] = useState(0);
    const [userAvatarUrl, setUserAvatarUrl] = useState(
        'https://thuthuatnhanh.com/wp-content/uploads/2019/10/anh-avatar-buc-minh-de-thuong.jpg'
    );
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        axios
            .post(
                `http://localhost:8080/webproj/postArticlesList`,
                {
                    pageNumber: currentPage,
                    category: currentCategory,
                },
                {
                    headers,
                }
            )
            .then((response) => {
                setArticles(response.data.articles);
                setNumberOfArticles(response.data.numberOfArticles);
            })
            .catch((error) => console.error(error));

        axios
            .post(
                'http://localhost:8080/webproj/postUserAvatar',
                {
                    username: user,
                },
                { headers }
            )
            .then((response) => setUserAvatarUrl(response.data.avatarUrl))
            .catch((error) => console.log(error));
    }, [currentCategory, currentPage, user]);

    const location = useLocation();

    return (
        <div>
            <GlobalStyle />
            <Navbar
                userAvatarUrl={userAvatarUrl}
                role={role}
                user={user}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setCurrentPage={setCurrentPage}
            />
            <Switch location={location} key={location.pathname}>
                {articles && (
                    <Route path="/" exact>
                        <Homepage
                            articles={articles}
                            numberOfArticles={numberOfArticles}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Route>
                )}
                <Route path="/article/:id">
                    {articles && (
                        <Article
                            articles={articles}
                            role={role}
                            userAvatarUrl={userAvatarUrl}
                            user={user}
                        />
                    )}
                </Route>
                <Route path="/sign-up">
                    <SignUp />
                </Route>
                <Route path="/successfully">
                    <SignUpSuccessfully />
                </Route>
                <Route path="/login">
                   <Login
                        setRole={setRoleIntoLocalStorage}
                        setUserIntoLocalStorage={setUserIntoLocalStorage}
                        role={role}
                    />
                </Route>
                <Route path="/create-article">
                    <CreateArticle user={user} />
                </Route>
                <Route path="/manage-moderator">
                    <ManageModerator />
                </Route>
                <Route path="/add-moderator">
                    <AddModerator />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
