import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_BOOKLIST } from "../graphql/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKLIST);

    const [bookId,setBookId] = useState(null);
    if (loading) <p>Fetching your Data ......</p>

    return <div>
        <ul>
            {(!loading && !error && data.books) && data.books.map((book) => {
                return <li key={book.id} onClick={()=> setBookId(book.id)}>{book.name}</li>
            })}
        </ul>
        <BookDetails bookID = {bookId}/>
    </div>;
};

export default BookList;
