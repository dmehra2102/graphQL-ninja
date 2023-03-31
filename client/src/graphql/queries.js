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

export {GET_AUTHORS,GET_BOOKLIST};