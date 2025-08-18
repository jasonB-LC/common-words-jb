import { useState } from "react";
import EBook from "../../classes/EBook";
import Buffer from "../common/Buffer";
import LinkButton from "../common/LinkButton";
import EBookDisplay from "./EBookDisplay";
import AddEBookForm from "./AddEBookForm.jsx";

const Read = () => {
    const [curEBookUrl, setCurEBookUrl] = useState("")
    const [isAddingEBook, setAddingEBook] = useState(false);
    // const fetchBook = async () => {//fetching all eBooks from back end
    //     let eBooks = [];

    //     let response;
    //     let data;
        
    //     try {
    //         response = await fetch('/api/eBooks');
    //         data = await response.json();
            
    //         } catch (error) {
    //             console.log("error " + error);
    //         }

    //         if (data.length !== 0){
    //             data.forEach(eBook => {
    //                 let newEBook = new EBook(
    //                     eBook.id,
    //                     eBook.languageID,
    //                     eBook.title,
    //                     eBook.fileName,
    //                     eBook.creator,
    //                     eBook.releaseDate,
    //                     eBook.readingLevel,
    //                 )
    //                 eBooks.push(newEBook);
    //             });
    //         }
    //     setCurEBook(eBooks[0]);
    // }
    const handleAddBook = () => {
        setAddingEBook(true);
    }

    const getBookurl = (formData) => {
        setCurEBookUrl(formData.fileName);
        console.log(formData);
    }

    return (
        <div className="page-container">
            <Buffer></Buffer>
            <div className="center-content">

                {isAddingEBook ? <AddEBookForm getEBookData={getBookurl}/> 
                : <button onClick={handleAddBook}>add book</button>}
                {/* <button onClick={fetchBook}>grab book</button> */}
                
                {/* {curEBookUrl && <EBookDisplay bookUrl={'/api/download/pg20079-images-3.epub'} />} */}
            </div>
            <Buffer></Buffer>
        </div>
    );
}

export default Read;