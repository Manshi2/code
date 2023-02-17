const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

let mongo;

// Check if mongodb is connected or not
const isDbConnected = () => !!mongo && !!mongo.topology && mongo.topology.isConnected()

// Connect to mongodb
const connectDb = async() => {
  if(!isDbConnected()){
    try{
        mongo = await MongoClient.connect(uri, options);
        console.log('Connected to Database!');
        return mongo
      }catch(e){
        console.log(e)
        console.log('Failed to connected to Database!');
        return null
      }
  }
  return mongo
}

const addUser = async (user) => {
  try{
    const {phone, name, dob, guardian, gender, email} = user;
    if(!phone || !name || !dob || !gender){
      return {ok: false, msg: 'Missing required fileds'}
    }
    const client = await connectDb();
    await client.db('carenest').collection('users').updateOne(
      { phone },
      {
        $set: {phone, name, dob, guardian, gender, email},
        $setOnInsert: {created: new Date().toISOString()}
      },
      {upsert: true}
    )
    return {ok: true, msg: 'Saved user to database successfully'}
  }catch(err){
    return {ok: false, msg: err.message}
  }
}

const getUser = async (user) => {
  try{
    const client = await connectDb();
    const query = user && user.phone ? {phone: user.phone} : {};
    const users = await client.db('carenest').collection('users').find( query ).toArray();
    if(users && users[0]){
      return {ok: true, users, msg: 'Fetched user details successfully'}
    }
    return {ok: false, msg: 'User not found'}
  }catch(err){
    return {ok: false, msg: err.message}
  }
}
// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
module.exports = {connectDb, addUser, getUser}