import Buffer from "../common/Buffer";

const Resources = () => {
    return (
        <div className="page-container">
            <Buffer></Buffer>
            <div className="center-content">
            <div className='resources'>
                <div>Resources</div>
                <div>
                    <a href="https://forvo.com/" className="outside-link">Forvo</a><br></br>
                    <div>Find downloadable soundfiles made by native speakers in hundreds of languages</div><br></br>
                </div>
                <div>
                    <a href="https://www.wiktionary.org/" className="outside-link">Wiktionary.org</a> <br></br>
                    <div>Entries include phonetical spellings, grammatical info and images. Very helpful for building vocabulary decks.</div><br></br>
                </div>
                <div>
                    <a href="https://rhinospike.com/" className="outside-link">Rhinospike</a><br></br>
                    <div>Fun community of language learners. Submit a ticket requesting a pronunciation or translation while helping others on their language learning journey.</div><br></br>
                </div>
            </div>
            </div>
            <Buffer></Buffer>
        </div>
    );
}

export default Resources;