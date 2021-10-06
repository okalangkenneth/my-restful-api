import mongoose from 'mongoose';

// Connect to mangodb and create the mongo file

const connectDB = async ()=> {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            //useCreateIndex:true,

        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)  // To confirm that we are logged in Mongo

    }catch(err){

        console.log(`Error: ${err.message}`);   // If there is an error..exit out
        process.exit(1); // stops the scirpt

    }

}

export default connectDB;