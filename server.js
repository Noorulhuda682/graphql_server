const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors');

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:false
}))
const port = process.env.PORT || 5000;

app.listen(port ,() => console.log( `app is running on port ${port}` ))


