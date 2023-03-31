const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

app.use(cors());

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", ()=>{
    console.log('Connected to the Database.');
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000, ()=>{
    console.log("lstening on PORT 4000");
})