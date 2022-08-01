import styled from 'styled-components';
import Comments from '../components/Comments';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Markup } from 'interweave';
import axios from 'axios';

const Article = ({ articles, role, userAvatarUrl, user }) => {
    const history = useHistory();
    const url = history.location.pathname.slice(1);
    const [article, setArticle] = useState(null);

    // const [isVoteButtonClicked, setIsVoteButtonClicked] = useState({
    //     up: false,
    //     down: false,
    // });

    useEffect(() => {
        const currentArticle = articles.filter(
            (article) => article.url === url
        )[0];
        setArticle(currentArticle);
    }, [url, articles]);

    // useEffect(() => {
    // const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // article &&
    //     axios.post(
    //         'http://localhost:8080/webproj/getArticleVoteState',
    //         {
    //             _id: article._id,
    //             username: user,
    //             isUpButtonClicked: isVoteButtonClicked.up,
    //             isDownButtonClicked: isVoteButtonClicked.down,
    //         },
    //         { headers }
    //     );

    // article &&
    //     axios
    //         .post(
    //             'http://localhost:8080/webproj/postArticleVoteState',
    //             {
    //                 _id: article._id,
    //                 username: user,
    //             },
    //             { headers }
    //         )
    //         .then((response) => {
    //             if (response.data.isUpButtonClicked)
    //                 setIsVoteButtonClicked({ up: true, down: false });
    //             else if (response.data.isDownButtonClicked)
    //                 setIsVoteButtonClicked({ up: false, down: true });
    //         });
    // }, [
    //     isVoteButtonClicked.up,
    //     isVoteButtonClicked.down,
    //     article,
    //     user,
    //     isVoteButtonClicked,
    // ]);

    // const voteHandler = (state) => {
    //     if (state === 'up') {
    //         if (isVoteButtonClicked.up === true)
    //             setIsVoteButtonClicked({ up: false, down: false });
    //         else {
    //             setIsVoteButtonClicked({ up: true, down: false });
    //         }
    //     } else {
    //         if (isVoteButtonClicked.down === true)
    //             setIsVoteButtonClicked({ up: false, down: false });
    //         else setIsVoteButtonClicked({ up: false, down: true });
    //     }
    // };

    return (
        <>
            {article && (
                <div>
                    <ArticleStyled>
                        <h1>{article.title}</h1>
                        <div className="info">
                            <span>Written by: {article.author}</span>
                            <span>Published {article.datetime}</span>
                            <span className="vote">
                                <FontAwesomeIcon
                                    icon={faCaretUp}
                                    // onClick={() => voteHandler('up')}
                                    // className={
                                    // isUpButtonClicked ? 'active' : ''
                                    // }
                                />
                                <span>{article.upVote - article.downVote}</span>
                                <FontAwesomeIcon
                                    icon={faCaretDown}
                                    // onClick={() => voteHandler('down')}
                                    // className={
                                    // isDownButtonClicked ? 'active' : ''
                                    // }
                                />
                            </span>
                        </div>
                        <article className="content">
                            <Markup content={article.content} />
                        </article>
                    </ArticleStyled>
                    <Comments
                        role={role}
                        userAvatarUrl={userAvatarUrl}
                        articleId={article._id}
                        user={user}
                    ></Comments>
                </div>
            )}
        </>
    );
};

const ArticleStyled = styled.article`
    margin-top: 1rem;

    h1 {
        font-size: 2.4rem;
    }

    svg {
        font-size: 2rem;
        color: #888;

        cursor: pointer;

        &:not(:first-child) {
            margin-left: 0.35rem;
        }

        &.active {
            color: #04d28f;
        }
    }

    .vote {
        display: flex;
        align-items: center;
        span {
            margin-left: 0.35rem;
        }

        svg.active {
            color: #04d28f;
        }
    }

    .info {
        margin-top: 0.4rem;

        display: flex;
        justify-content: space-between;
    }

    .content {
        margin-top: 1.2rem;

        h2 {
            margin-top: 1.4rem;

            font-size: 1.8rem;
        }

        h3 {
            margin-top: 0.7rem;
            font-size: 1.2rem;
        }

        p {
            margin-top: 0.7rem;

            font-size: 1.2rem;
            line-height: 1.5;
        }

        h2 + p,
        h3 + p {
            text-indent: 3rem;
        }

        img {
            display: block;
            margin: 0 auto;
            max-width: 50vh;
            max-height: 70vh;
        }
    }
`;

export default Article;
