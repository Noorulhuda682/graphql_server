const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
} = require('graphql');

const _ = require('lodash'); 

const books = [
    {name:'the way to learn ethics',genre:'hasnia',id:"1",authorId:"1"},
    {name:'the way to learn maths',genre:'hasnia',id:"1",authorId:"1"},
    {name:'the way to learn Javascript',genre:'genia',id:"2",authorId:"2"},
    {name:'the way to learn Java',genre:'geologia',id:"3",    authorId:"3"},
]
const authors = [
    {name:'Noorul Huda',age:24,  id:"1"},
    {name:'Ajaz khan',  age:23,  id:"2"},
    {name:'Ajaz uddin', age:25,  id:"3"},
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
      id:{type:GraphQLID},
      name:{type:GraphQLString},
      genre:{type:GraphQLString},
      author:{
          type:AuthorType,
          resolve(parent,args){
              console.log(parent)
              return _.find(authors, {id : parent.authorId})
          }
      }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
      id:{type:GraphQLID},
      name:{type:GraphQLString},
      age:{type:GraphQLInt},
      books:{
          type: new GraphQLList(BookType),
          resolve(parent,args){
              return _.filter(books, {authorId:parent.id})
          }
      }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{id:{ type:GraphQLID} },
            resolve(parent,args){
                // get data here from resources
                return _.find(books, {id:args.id})
            }
        },
        author:{
          type:AuthorType,
          args:{id : {type: GraphQLID}},
          resolve(parent,args){
            return _.find(authors,{id:args.id})
          }
        },
        books:{
           type:new GraphQLList(BookType),
           resolve(parent,args){
             return books
           } 
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
              return authors
            } 
         }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
})