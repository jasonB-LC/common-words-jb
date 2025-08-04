import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import data from '../../data/initLanguageData.json';
import { useEffect, useState } from "react";
import Study from "./Study";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import StyledLink from "../StyledLink";
import { Link } from "react-router-dom";
import TraversalButton from "../TraversalButton";

const Home = () => {
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

export default Home;