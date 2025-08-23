import { useEffect, useState } from "react";
import EBook from "../../classes/EBook";
import Buffer from "../common/Buffer";
import LinkButton from "../common/LinkButton";
import EBookDisplay from "../admin/ebooks/EBookDisplay.jsx";
import AddEBookForm from "../admin/ebooks/AddEBookForm.jsx";
import Drawer from "../common/Drawer.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const Read = ({saveEBook, updateEBook, allEBooks, deleteEBook}) => {
    const [isAddingEBook, setAddingEBook] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // const [firstRenderDone, setFirstRenderDone] = useState(false);
    const [location, setLocation] = useState(null);
    const [curEBook, setCurEBook] = useState(new EBook());
    const [numOfEBooks, setNumOfEBooks] = useState(0);
    const [firstRender, setFirstRender] = useState(true);
    const [deletingBook, setDeletingBook] = useState(false);

    useEffect(() => {
        setNumOfEBooks(allEBooks.length)
        let previousBookId = localStorage.getItem('currentEBookId');
        if (previousBookId) {
            allEBooks.map((eBook) => {
                if (eBook.id == previousBookId){
                    setCurEBook(eBook)
                }
                else {
                    console.log("no previous book");
                    ///TODO: create default book
                }
            })
        }
        
        console.log(allEBooks.length)
    }, [])

    useEffect(() => {
        console.log(location);
    }, [location])

    useEffect(() => {
        if(curEBook){
            updateEBook(curEBook)
            localStorage.setItem('currentEBookId', curEBook.id);
            console.log("curEBook useEffect")
        }
    }, [curEBook])

    useEffect(() => {
        if (numOfEBooks && allEBooks.length > numOfEBooks) {
            setCurEBook(allEBooks[allEBooks.length - 1]);
            setNumOfEBooks(allEBooks.length);
            
            toast.success("Saved " + allEBooks[allEBooks.length - 1].title);

        }
    },[allEBooks])
    const locationChanged = epubcifi => {
        // Since this function is also called on initial rendering, we are using custom state
        // logic to check if this is the initial render.
        // If you block this function from running (i.e not letting it change the page on the first render) your app crashes.

        // if (!firstRenderDone) {
        //     setLocation(localStorage.getItem('book-progress')) // getItem returns null if the item is not found.
        //     setFirstRenderDone(true)
        //     return
        // }

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
        closeMenu();

    }

    const handleDeleteBook = (e) => {
        allEBooks.map((eBook) => {
        if (e.target.id == eBook.id){
            if (eBook.id === curEBook.id) {
                if (allEBooks.length > 0){
                    setCurEBook(allEBooks[0])
                }
                else {
                    setCurEBook(new EBook())
                }
            }
            deleteEBook(eBook.id);
        }}) 
    }

    const handleAddBook = () => {
        setAddingEBook(true);
        setDeletingBook(false);
    }
    const handleDeletingBook = () => {
        setDeletingBook(!deletingBook);
    }
    const eBooksJSX = allEBooks.map(eBook => {
        return (
            <>
            <li className="list-book" id={eBook.id}>
                <button disabled={`${deletingBook ? 'true' : ''}`} className='drawer-book-item' name={eBook.id} id={eBook.id} onClick={handleEBookClick}>{eBook.title}</button>
                {deletingBook && <button className="delete-book" name={eBook.id} id={eBook.id} onClick={handleDeleteBook}>x</button>}
            </li>
            <hr className="solid-divider"></hr>
            </>
        )
    })


    const getEBookData = (formData) => {
        console.log("getEBookData")
        setAddingEBook(false);
        saveEBook(formData);
    }
    const openMenu = () => {
        setMenuOpen(true);
    }
    const closeMenu = () => {
        setMenuOpen(false);
        setDeletingBook(false);
    }
    const backFromAddBook = () => {
        setAddingEBook(false);
    }

    return (
        <>
            <div className="reader-header">
                <Drawer menuIsOpen={menuOpen} openMenu={openMenu} closeMenu={closeMenu}>
                    <div className="drawer-top-buttons">
                        <button className="add-book" onClick={handleAddBook}>add book</button>
                        <button className="add-book"onClick={handleDeletingBook}>delete book</button>
                    </div>

                    <div className="library-heading">Library</div>
                    <ul className="drawer-list">
                        {eBooksJSX}
                    </ul>
                </Drawer>
            </div>
            
            <div className="page-container">
                <ToastContainer />
                <Buffer></Buffer>
                <div className="center-content">
                    {isAddingEBook ? <AddEBookForm getEBookData={getEBookData} back={backFromAddBook}/> 
                        : <EBookDisplay bookUrl={curEBook.fileName} location={curEBook.bookProgress} locationChanged={locationChanged}/> 
                    }
                </div>
                <Buffer></Buffer>
            </div>
        </>

    );
}

export default Read;