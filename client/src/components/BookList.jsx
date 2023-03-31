import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BOOKLIST } from "../graphql/queries";

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKLIST);

    if(loading) <p>Fetching your Data ......</p>

    return <div>{(!loading && !error && data.books) && data.books.map((book)=>{
        return <li key={book.id}>{book.name}</li>
    })}</div>;
};

export default BookList;
