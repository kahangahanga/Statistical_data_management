const { ApolloServer,gql }=require('apollo-server')
const {faker}=require('@faker-js/faker')
let {users}=require('./db/users.js')


const typeDefs=gql`
    scalar Date
    type User{
        userId: ID
        username: String
        email: String
        avatar: String
        password: String
        birthdate: Date
        registeredAt: Date
    }
    type Query{
        hello:String,
        users:[User!]!
    }
    type Mutation{
        createUser(username:String,email:String,avatar:String,password:String,birthdate:Date):User!
    }
`

const resolvers={
    Query:{
        hello:()=>"Hello World!",
        users:(parent,args,context,info)=>users,
    },
    Mutation:{
        createUser:(parent,{username,email,avatar,password,birthdate},context,info)=>{
            let _newUser={
                userId:faker.datatype.uuid(),
                username,
                email,
                avatar,
                password,birthdate,
                registeredAt:new Date().toISOString()
            }
            users=[...users,_newUser]
            return _newUser
        }
    }
}

const server=new ApolloServer({typeDefs,resolvers})

server.listen({port:8000}).then(_server=>console.log(`Apollo server is up to at ${_server.url}`))