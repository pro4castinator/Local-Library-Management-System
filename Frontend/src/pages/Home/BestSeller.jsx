import React, { useEffect, useState } from 'react'
import BookCards from '../../components/shared/BookCards';


const BestSeller = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/books/").then(res => res.json()).then(data => setBooks(data.slice(0, 8)))
    }, [])

    return (
        <>
            <BookCards books={books} headline={"Most Read Books"} />
        </>
    )
}

export default BestSeller