import styled from 'styled-components';

const PageNumber = ({
    articles,
    numberOfArticles,
    currentPage,
    setCurrentPage,
}) => {
    const pages = [];
    const maxPage = Math.floor(numberOfArticles / 10) + 1;
    for (let i = 0; i < maxPage; i++) {
        pages.push(i + 1);
    }
    return (
        <PageNumberStyle>
            {pages.map((page) => (
                <span
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo(0, 0);
                    }}
                >
                    {page}
                </span>
            ))}
        </PageNumberStyle>
    );
};

const PageNumberStyle = styled.div`
    margin-top: 2.5rem;
    text-align: center;

    span {
        padding: 0.8rem 1rem;

        border: 1px solid #04d28f;
        color: #04d28f;
        border-radius: 5px;

        cursor: pointer;

        &.active {
            border: none;

            color: #fff;
            background-color: #04d28f;
        }

        &:not(.active) {
            &:hover {
                text-decoration: underline;
            }
        }
        &:not(:first-child) {
            margin-left: 0.25rem;
        }
    }
`;

export default PageNumber;
