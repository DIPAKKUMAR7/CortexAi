import express from "express"
import { createConversation } from "../controllers/chat.controller.js"
import { getConversations } from "../controllers/chat.controller.js"
import { updateConversation } from "../controllers/chat.controller.js"
import { saveMessages } from "../controllers/chat.controller.js"
import { getMessages } from "../controllers/chat.controller.js"


const router = express.Router()

router.get("/create-conversation",createConversation)
router.get("/get-conversations",getConversations)
router.put("/conversations/:id",updateConversation)
router.post("/save-messages",saveMessages)
router.get("/get-messages/:conversationId",getMessages)


export default router