import redis from "../../shared/redis/redis.js"

const protect = async (req, res, next) => {
    try{
        const sessionId = req.cookies?.session
        if(!sessionId){
            return res.status(400).json({message:"Unauthorized"})
        }
        const data = await redis.get(`session:${sessionId}`)
        if(!data){
            return res.status(400).json({message:"Invalid session"})
        }
        req.user = JSON.parse(data)
        next()
    } catch(error){
        return res.status(500).json({message :`auth middleware error ${error}`})
    }
}

export default protect