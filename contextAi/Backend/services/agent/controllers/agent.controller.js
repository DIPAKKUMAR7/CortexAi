


export const agent = async (req,res) => {
    try{
        const {prompt,conversationId} = req.body;
    } catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
}