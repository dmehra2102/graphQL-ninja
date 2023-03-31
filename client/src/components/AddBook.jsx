import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_BOOK_MUTATION } from '../graphql/mutation';
import { GET_AUTHORS, GET_BOOKLIST } from '../graphql/queries'

const AddBook = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS,);

    const [bookDetail,setBookDetail] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const [addNewBook] = useMutation(ADD_BOOK_MUTATION, {
        variables : bookDetail,
        refetchQueries : [{query : GET_BOOKLIST}]
    });
    const submitForm = (event)=>{
        event.preventDefault();
        addNewBook();
        // console.log(bookDetail);
    }
    return (
        <div>
            <form id="add-book"  onSubmit={submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => setBookDetail({...bookDetail, name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => setBookDetail({...bookDetail, genre: e.target.value })} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => setBookDetail({...bookDetail, authorId: e.target.value })} >
                        <option>Select author</option>
                        {(data && !loading && !error) && data.authors.map((author) => {
                            return (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            )
                        })}
                    </select>
                </div>
                <input type={"submit"} value="+"/>
            </form>
        </div>
    )
}

export default AddBook