import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Comment = ({ comment }) => {
    const [userAvatarUrl, setUserAvatarUrl] = useState(
        'https://previews.123rf.com/images/igorrita/igorrita1507/igorrita150700024/42584408-flat-hipster-character-stylish-young-guy-with-glasses-avatar-icon-man-vector-illustration-eps10.jpg'
    );

    useEffect(() => {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        axios
            .post(
                'http://localhost:8080/webproj/postUserAvatar',
                {
                    username: comment.username,
                },
                { headers }
            )
            .then((response) => setUserAvatarUrl(response.data.avatarUrl))
            .catch((error) => console.log(error));
    }, [comment.username]);

    return (
        <CommentStyled>
            <div>
                <img src={userAvatarUrl} alt="Avatar" />
                <span className="username">{comment.username}</span>
                <span className="datetime">
                    {comment.datetime.slice(0, 16)}
                </span>
            </div>
            <p>{comment.content}</p>
        </CommentStyled>
    );
};

const CommentStyled = styled.div`
    margin-top: 1.5rem;
    padding: 1rem 2rem 1rem 0;

    display: flex;

    box-shadow: 1px 1px 2px rgba(30, 30, 30, 0.2);

    background: #fff;

    img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
    }

    span {
        margin-top: 0.25rem;

        display: flex;

        font-size: 0.85rem;
    }

    p {
        margin-left: 2rem;
    }
`;

export default Comment;
