import {gql} from "@apollo/client";

const GET_BOOKLIST = gql`
    query getBooklist {
        books {
            name
            id
        }
    }
`;

const GET_AUTHORS = gql`
    query getAllAuthors {
        authors {
            name
            id
        }
    }
`;

const GET_SINGLE_BOOK_DETAIL = gql`
    query getBookDetail($id : ID!){
        book(id : $id){
            id
            name
            genre
            author {
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`

export {GET_AUTHORS,GET_BOOKLIST, GET_SINGLE_BOOK_DETAIL};