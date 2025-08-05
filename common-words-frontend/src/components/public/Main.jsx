import { Link } from "react-router-dom";

const Main = () => {
    return (
        <>
            <div>
                <div>
                    Welcome to common words.
                </div>
                <div>
                    On the study page, you can add new cards to the existing decks, or create your own. Have fun!
                </div>
                <Link to="/Study">
                    <button type="button">Study</button>
                </Link>
            </div>
        </>
    );
}

export default Main;