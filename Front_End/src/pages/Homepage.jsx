import PostCard from '../components/PostCard';
import PageNumber from '../components/PageNumber';

const Homepage = ({
    articles,
    numberOfArticles,
    currentCategory,
    currentPage,
    setCurrentPage,
}) => {
    return (
        <div>
            {articles.map((article) => (
                <PostCard article={article} key={article.url} />
            ))}
            <PageNumber
                articles={articles}
                numberOfArticles={numberOfArticles}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default Homepage;
