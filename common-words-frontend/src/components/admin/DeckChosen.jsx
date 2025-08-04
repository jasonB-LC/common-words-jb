import { Outlet, Navigate } from "react-router-dom";

const DeckChosen = (curDeck) => {
    return curDeck ? <Outlet/> : <Navigate to="/Study"/>
}

export default DeckChosen