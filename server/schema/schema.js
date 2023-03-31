const graphql = require("graphql");
const lodash = require("lodash");

const {GraphQLList,GraphQLInt,GraphQLID,GraphQLNonNull,GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;
const BookModel = require("../model/book.model");
const AuthorModel = require("../model/author.model");

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre:  {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent,args){
                const authorInfo = AuthorModel.findById({_id : parent.authorId});

                return authorInfo;
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLInt},
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                const allBooks = BookModel.find({authorId : parent.id});
                return allBooks;
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                // WRITE CODE TO INTERECT WITH DATABASE
                const book = BookModel.findById(args.id);
                return book;
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                const author = AuthorModel.findById(args.id);
                return author;
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent){
                const allBooks = BookModel.find();
                return allBooks;
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent){
                const allAuthors = AuthorModel.find();
                return allAuthors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : {type: new GraphQLNonNull(GraphQLString)},
                age : {type : new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                const newAuthor = new AuthorModel({
                    name : args.name,
                    age : args.age
                });

                const savedAuthor = newAuthor.save();
                return savedAuthor
            }
        },
        addBook : {
            type : BookType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                genre : {type : new GraphQLNonNull(GraphQLString)},
                authorId : { type : new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let newBook = new BookModel({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });

                const savedBook = newBook.save();
                return savedBook;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});