import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Buffer from "../common/Buffer";
import AddLanguageForm from "../common/AddLanguageForm";

const Main = () => {
    return (
        <div className="page-container">
            <Buffer></Buffer>
            <div className="center-content">
                <div>
                    Welcome to common words.
                </div>
                <div>
                    On the study page, you can add new cards to the existing decks, or create your own. Have fun!
                </div>
                <Link to="/Read">
                    <button type="button">Read</button>
                </Link>
                <Link to="/Study">
                    <button type="button">Study</button>
                </Link>
            </div>
            <Buffer></Buffer>
        </div>
    );
}

export default Main;