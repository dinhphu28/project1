import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Comment from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Comments = ({ role, userAvatarUrl, articleId, user }) => {
    const [allComments, setAllComments] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const commentFieldRef = useRef(null);
    let key = -1;

    const takeCommentHandler = () => {
        console.log(articleId);
        console.log(user);
        console.log(commentContent);
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        axios
            .post(
                'http://localhost:8080/webproj/getComment',
                {
                    _id: articleId,
                    username: user,
                    content: commentContent,
                },
                { headers }
            )
            .then((commentFieldRef.current.value = ''))
            .catch((error) => console.log(error));
    };

    let leaveCommentSection;

    switch (role) {
        case 'non-user':
            leaveCommentSection = (
                <div className="non-user-login">
                    Please <Link to="/login">Log In</Link> or{' '}
                    <Link to="/sign-up">create an account</Link> to leave a
                    comment...
                </div>
            );
            break;

        case 'admin':
        case 'moderator':
            leaveCommentSection = (
                <div className="non-user-login">
                    Login a normal account to leave a comment
                </div>
            );
            break;

        default:
            leaveCommentSection = (
                <div className="leave-comment">
                    <img src={userAvatarUrl} alt="Avatar" />
                    <textarea
                        placeholder="Leave a comment..."
                        onChange={(e) => setCommentContent(e.target.value)}
                        ref={commentFieldRef}
                    ></textarea>
                    <button type="button" onClick={takeCommentHandler}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            );
            break;
    }

    useEffect(() => {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        axios
            .post(
                'http://localhost:8080/webproj/postCommentsList',
                {
                    _id: articleId,
                },
                { headers }
            )
            .then((response) => setAllComments(response.data.comments))
            .catch((error) => console.log(error));
    }, [articleId, allComments]);

    return (
        <CommentsStyled>
            <div className="line"></div>
            <h3>Comments:</h3>

            {allComments &&
                allComments.map((comment) => (
                    <Comment comment={comment} key={key++} />
                ))}

            {leaveCommentSection}
        </CommentsStyled>
    );
};

const CommentsStyled = styled.div`
    margin-top: 1.5rem;

    font-size: 1.2rem;
    line-height: 1.5;

    h3 {
        margin-top: 1.5rem;
    }

    .line {
        width: 100%;
        height: 1px;
        background: rgba(32, 32, 32, 0.6);
    }

    .leave-comment {
        margin-top: 1.5rem;
        padding: 1rem 2rem 1rem 0;

        display: flex;
        align-items: center;

        box-shadow: 1px 1px 2px rgba(30, 30, 30, 0.2);

        img {
            width: 8rem;
            height: 8rem;
            object-fit: cover;
        }

        textarea {
            padding: 1rem 2rem;
            width: 100%;

            border: none;

            font-size: 1.2rem;
            line-height: 1.5;

            outline: none;
            resize: none;
        }
        button {
            width: 6rem;
            height: 3.5rem;

            font-size: 2rem;

            color: #fff;
            background: linear-gradient(to bottom right, #04d28f, #044cd2);
            border: none;
            border-radius: 5px;
        }
    }
    .non-user-login {
        margin-top: 0.75rem;
        a {
            color: #04d28f;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

export default Comments;
