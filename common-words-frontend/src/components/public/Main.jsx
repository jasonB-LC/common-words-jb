import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Buffer from "../common/Buffer";

const Main = () => {
    return (
    <>
        <div className="page-container">
            <Buffer></Buffer>
            <div className="center-content">
                <div className="about-paragraph">
                    Common Words is a free online space for reading and studying vocabulary. 
                </div>
                <div className="about-paragraph">
                    The 
                    <Link className="paragraph-link" to="/Study">study</Link>
                    page allows you to create decks of multimedia flash cards containing images
                    and sounds.
                </div>
                <div className="about-paragraph">The
                    <Link className="paragraph-link" to="/Read">read</Link>
                    page allows you to maintain a library of .ePub files and will keep track of your reading progress.
                    Highlight text and use the stash button to save a word for adding to a flashcard when
                    it's convenient.
                </div>
                <div className="about-paragraph">
                    Common Words uses 
                    <a className="paragraph-link" href="https://en.wikipedia.org/wiki/Spaced_repetition">spaced repetition</a> 
                    to keep track of your progress. This means that the interval between review sessions
                    for each term will become longer the more times you successfully remember the definition. 
                    There is research that shows that information retention is improved by spacing out study sessions.
                </div>
                <div className="about-paragraph">
                    Resources:
                    <div>
                        <a href="https://forvo.com/" className="outside-link">Forvo</a><br></br>
                    <div>Find downloadable soundfiles made by native speakers in hundreds of languages</div><br></br></div>
                    <div>
                        <a href="https://www.wiktionary.org/" className="outside-link">Wiktionary.org</a> <br></br>
                    <div>Entries include phonetical spellings, grammatical info and images. Very helpful for building vocabulary decks.</div><br></br></div>
                    <div>
                        <a href="https://rhinospike.com/" className="outside-link">Rhinospike</a><br></br>
                    <div>Fun community of language learners. Submit a ticket requesting a pronunciation or translation while helping others on their language learning journey.</div><br></br></div>
                </div>
            </div>
            <Buffer></Buffer>
        </div>
    </>

    );
}

export default Main;