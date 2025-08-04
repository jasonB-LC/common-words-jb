import { Link } from "react-router-dom";

const Main = () => {
    return (
        <>
            <div>
                <Link to="/Read">
                    <button type="button">Read</button>
                </Link>
                <Link to="/Study">
                    <button type="button">Study</button>
                </Link>
                </div>
        </>
    );
}

export default Main;