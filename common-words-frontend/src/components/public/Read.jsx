import { useState } from "react";
import EBook from "../../classes/EBook";
import Buffer from "../common/Buffer";
import LinkButton from "../common/LinkButton";

const Read = () => {
    const [curEBook, setCurEBook] = useState({})

    const fetchBook = async () => {//fetching all eBooks from back end
        let eBooks = [];

        let response;
        let data;
        
        try {
            response = await fetch('http://localhost:8080/api/eBooks');
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

    const addEBook = async () => {//add a new deck to the database
    let newEBook = new EBook(
        3,
        1,
        "temp text",
        "temp title",
        "temp creator",
        "temp release date",
        "temp subject",
        4,
        "temp whatever",
        1
    )
        try {
            await fetch('http://localhost:8080/api/eBooks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newEBook),
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="page-container">
            <Buffer></Buffer>
            <div className="center-content">
            <p>
                Read Page
                This is some plain text with special characters like é, ü, ñ.
            </p>
            <p>{curEBook.text}</p>
            <button onClick={fetchBook}>grab book</button>
            <button onClick={addEBook}>add book</button>
            <LinkButton linkPath={"/"} type={"button"} text={"Back"} />
            </div>
            <Buffer></Buffer>
        </div>
    );
}

export default Read;