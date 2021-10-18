const Home = ({userToken, myUsername}) => {
    return (
        <>
            <div className="home">
                {userToken ?
                <div className="loggedInMessage">
                    Welcome back {myUsername}, let's go shopping!
                </div>
                :
                <div className="loggedOutMessage">
                    <h1>Welcome To McLovin's Scents</h1>
                    <p>Appeal to your nostrils</p>
                </div>
                }
            </div>
        </>
    )
}
export default Home; 