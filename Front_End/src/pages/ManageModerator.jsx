import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ManageModerator = () => {
    const [moderators, setModerators] = useState([]);
    useEffect(() => {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        axios
            .post(
                'http://localhost:8080/webproj/postModsList',
                {},
                { headers }
            )
            .then((response) => setModerators(response.data.moderators))
            .catch((error) => console.log(error));
    }, [moderators]);

    const deleteModeratorHandler = (moderator) => {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        axios.post(
            'http://localhost:8080/webproj/getModToDelete',
            {
                username: moderator.username,
            },
            { headers }
        );
    };

    return (
        <ManageModStyled>
            <h2>List of all moderator</h2>
            {moderators.map((moderator) => (
                <div key={moderator.username}>
                    <button
                        type="button"
                        onClick={() => deleteModeratorHandler(moderator)}
                    >
                        Delete
                    </button>
                    <span>{moderator.username}</span>
                </div>
            ))}
        </ManageModStyled>
    );
};

const ManageModStyled = styled.div`
    h2 {
        margin-top: 2rem;
    }
    div {
        margin-top: 0.75rem;
        button {
            padding: 0.3rem 0.7rem;

            border: 1px solid #d20438;
            border-radius: 3px;
            background: #fff;
            color: #d20438;

            cursor: pointer;
            outline: none;

            &:hover {
                color: #fff;
                background: #d20438;
            }
        }

        span {
            margin-left: 1rem;
        }
    }
`;

export default ManageModerator;
