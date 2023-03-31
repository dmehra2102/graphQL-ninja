import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_SINGLE_BOOK_DETAIL } from '../graphql/queries'

const BookDetails = ({bookID}) => {
    const { loading, error, data} = useQuery(GET_SINGLE_BOOK_DETAIL,{
        variables : {id : bookID}
    });

    return (
        <>
            {(data && !loading && !error) && (
                <div id="book-details">
                    <h2>{data.book.name}</h2>
                    <p>{data.book.genre}</p>
                    <p>{data.book.author.name}</p>
                    <p>All data.books by this author:</p>
                    <ul className="other-books">
                        {data.book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>)}
        </>
    )
}

export default BookDetails