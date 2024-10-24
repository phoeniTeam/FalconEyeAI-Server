

const creatorSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    creditBalance:{
        type:Number,
        default:10,
        trim:true,

    },
    

})

export default mongoose.model('Creator', creatorSchema);