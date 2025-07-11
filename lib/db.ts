import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI! ;

if (!MONGODB_URI) {
    throw Error("MONGODB_URI is not present")
}

let cached = global.mongoose;

if(!cached){

    cached = global.mongoose = { conn: null , promise: null};

}

export async function connectdb() {
    
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        
        const opts = {
      bufferCommands: true,  // fixed option name
      maxPoolSize: 10,       // fixed option name
    };

        cached.promise = mongoose.connect( MONGODB_URI ,opts  ).then(()=>mongoose.connection);

    }

    try {

        cached.conn = await cached.promise;
        
    } catch (error) {
        cached.promise = null;
        throw error
    }

    return cached.conn;

}

