import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterStyle>
            <h3>HCMC University Of Technology And Education</h3>
            <div>
                <h4>Contact Us:</h4>
                <ul>
                    <li>
                        <a href="https://facebook.com">Facebook</a>
                    </li>
                    <li>
                        <a href="https://instagram.com">Instagram</a>
                    </li>
                    <li>
                        <a href="https://twitter.com">Twitter</a>
                    </li>
                </ul>
            </div>
        </FooterStyle>
    );
};

const FooterStyle = styled.div`
    margin: 3rem -10rem 0;
    padding: 2.5rem 10rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: #04d28f;
    color: #fff;

    li {
        margin-top: 0.5rem;
    }

    a {
        color: #fff;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

export default Footer;
