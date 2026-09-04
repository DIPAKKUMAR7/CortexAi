import moongoose from "mongoose";

const conversationSchema = new moongoose.Schema({
    title:{
        type:String,
        default:"New Conversation"
        },
    userId:{
        type:String,
        
    }
},{
    timestamps:true
})

const Conversation = moongoose.model("Conversation",conversationSchema)

export default Conversation