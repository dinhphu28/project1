const SignUpSuccessfully = () => {
    setTimeout(() => {
        window.location.href = '/login';
    }, 1500);
    return (
        <h3>Your account has been created. Redirecting to log in page...</h3>
    );
};

export default SignUpSuccessfully;
