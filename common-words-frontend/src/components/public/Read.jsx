import { useEffect, useState } from "react";
import EBook from "../../classes/EBook";
import Buffer from "../common/Buffer";
import LinkButton from "../common/LinkButton";
import EBookDisplay from "../admin/ebooks/EBookDisplay.jsx";
import AddEBookForm from "../admin/ebooks/AddEBookForm.jsx";
import Drawer from "../common/Drawer.jsx";


const Read = ({saveEBook, updateEBook, allEBooks}) => {
    const [isAddingEBook, setAddingEBook] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [firstRenderDone, setFirstRenderDone] = useState(false);
    const [location, setLocation] = useState(null);
    const [curEBook, setCurEBook] = useState(new EBook());

    useEffect(() => {
        console.log(location);
    }, [location])

    useEffect(() => {
        if(curEBook){
            updateEBook(curEBook)
        }
    }, [curEBook])

    const locationChanged = epubcifi => {
        // Since this function is also called on initial rendering, we are using custom state
        // logic to check if this is the initial render.
        // If you block this function from running (i.e not letting it change the page on the first render) your app crashes.

        if (!firstRenderDone) {
            setLocation(localStorage.getItem('book-progress')) // getItem returns null if the item is not found.
            setFirstRenderDone(true)
            return
        }

        // This is the code that runs everytime the page changes, after the initial render.
        // Saving the current epubcifi on storage...
 
        setCurEBook((prevData) => ({
            ...prevData,
            bookProgress: epubcifi,
        }));   


        // And then rendering it.
        setLocation(epubcifi) // Or setLocation(localStorage.getItem("book-progress"))
    }

    const handleEBookClick = (e) => {
        allEBooks.map((eBook) => {
        if (e.target.id == eBook.id){
            setCurEBook(eBook)
        }})  
    }
    
    const eBooksJSX = allEBooks.map(eBook => {
        return (
            <li id={eBook.id}>
                <button name={eBook.id} id={eBook.id} onClick={handleEBookClick}>{eBook.title}</button>
            </li>
        )
    })

    const handleAddBook = () => {
        setAddingEBook(true);
    }

    const getEBookData = (formData) => {
        setCurEBook(new EBook(
            0,
            formData.languageID,
            formData.title,
            formData.fileName,
            formData.creator,
            formData.releaseDate,
            formData.readingLevel,
            formData.bookProgress
        ))
        setAddingEBook(false);
        saveEBook(formData);
    }
    const openMenu = () => {
        setMenuOpen(true);
    }
    const closeMenu = () => {
        setMenuOpen(false);
    }
    const backFromAddBook = () => {
        setAddingEBook(false);
    }

    return (
        <>
            <Drawer menuIsOpen={menuOpen} openMenu={openMenu} closeMenu={closeMenu}>
                <div className="library-heading">Library</div>
                <ul className="drawer-list">
                    {eBooksJSX}
                </ul>
                </Drawer>
            <div className="page-container">
                <Buffer></Buffer>
                <div className="center-content">
                    {isAddingEBook ? <AddEBookForm getEBookData={getEBookData} back={backFromAddBook}/> 
                        : <EBookDisplay bookUrl={curEBook.fileName} addBook={handleAddBook} location={curEBook.bookProgress} locationChanged={locationChanged}/> 
                    }
                </div>
                <Buffer></Buffer>
            </div>
        </>

    );
}

export default Read;