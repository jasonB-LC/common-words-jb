import { useState } from "react";
import EBook from "../../classes/EBook";
import Buffer from "../common/Buffer";
import LinkButton from "../common/LinkButton";
import EBookDisplay from "./EBookDisplay";

const Read = () => {
    const [curEBookUrl, setCurEBookUrl] = useState({})

    const fetchBook = async () => {//fetching all eBooks from back end
        let eBooks = [];

        let response;
        let data;
        
        try {
            response = await fetch('/api/eBooks');
            data = await response.json();
            
            } catch (error) {
                console.log("error " + error);
            }

            if (data.length !== 0){
                data.forEach(eBook => {
                    let newEBook = new EBook(
                        eBook.id,
                        eBook.languageID,
                        eBook.text,
                        eBook.title,
                        eBook.creator,
                        eBook.releaseDate,
                        eBook.subject,
                        eBook.readingLevel,
                        eBook.originalPublication,
                        eBook.categories
                    )
                    eBooks.push(newEBook);
                });
            }
        setCurEBook(eBooks[0]);
    }

    return (
        <div className="page-container">
            <Buffer></Buffer>
            <div className="center-content">
                <EBookDisplay bookUrl={'/api/download/pg20079-images-3.epub'} />
                <button onClick={fetchBook}>grab book</button>
                <LinkButton linkPath={"/"} type={"button"} text={"Back"} />
            </div>
            <Buffer></Buffer>
        </div>
    );
}

export default Read;