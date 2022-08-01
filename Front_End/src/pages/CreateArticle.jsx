import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Remarkable } from 'remarkable';

const CreateArticle = ({ user }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png'
    );
    const [category, setCategory] = useState('front-end');
    const markdown = new Remarkable();

    const createArticleHandler = () => {
        const apiUrl = 'http://localhost:8080/webproj/getArticle';
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const data = {
            title: title,
            description: description,
            content: markdown.render(content),
            category: category,
            thumbnailUrl: thumbnailUrl,
            author: user,
        };
        axios
            .post(apiUrl, data, { headers })
            .then((window.location.href = '/'));
    };

    return (
        <CreateArticleStyled>
            <textarea
                placeholder="Title of article"
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <textarea
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)}
            />
            <textarea
                placeholder="Url of thumbnail"
                onChange={(e) => setThumbnailUrl(e.target.value)}
            />
            <div className="category-container">
                <div>
                    <input
                        type="radio"
                        name="category-container"
                        id="back-end-category"
                        onClick={() => setCategory('back-end')}
                    />
                    <label htmlFor="back-end-category">Back-end</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category-container"
                        id="front-end-category"
                        onClick={() => setCategory('front-end')}
                        defaultChecked
                    />
                    <label htmlFor="front-end-category">Front-end</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category-container"
                        id="iOS-category"
                        onClick={() => setCategory('ios')}
                    />
                    <label htmlFor="iOS-category">iOS</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category-container"
                        id="android-category"
                        onClick={() => setCategory('android')}
                    />
                    <label htmlFor="android-category">Android</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category-container"
                        id="tips-and-tricks-category"
                        onClick={() => setCategory('tips-tricks')}
                    />
                    <label htmlFor="tips-and-tricks-category">
                        Tips & tricks
                    </label>
                </div>
            </div>
            <button type="button" onClick={createArticleHandler}>
                Create article
            </button>
        </CreateArticleStyled>
    );
};

const CreateArticleStyled = styled.div`
    textarea {
        width: 100%;
        margin-top: 1rem;
        padding: 1rem 2rem;

        display: block;

        resize: none;
        outline: none;
        &:focus {
            border: 1px solid #04d28f;
        }
        &:nth-child(2) {
            min-height: 8rem;
        }
        &:nth-child(3) {
            min-height: 24rem;
        }
    }

    label {
        user-select: none;
    }

    button {
        width: 100%;
        padding: 0.75rem 1.5rem;
        margin-top: 1rem;

        background: linear-gradient(to bottom right, #04d28f, #044cd2);
        color: #fff;
        border: none;
        border-radius: 6px;

        transition: background 1s ease-out;

        outline: none;
        cursor: pointer;

        &:hover {
            background: linear-gradient(to bottom right, #044cd2, #04d28f);
        }
    }
    .category-container {
        margin-top: 1rem;
        padding: 0 10rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
            display: flex;
            align-items: center;
        }
        label {
            padding-left: 0.75rem;
        }
    }
`;

export default CreateArticle;
