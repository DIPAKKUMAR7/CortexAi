import proxy from "express-http-proxy"

export const proxyWithHeader = (target) => {
    return proxy(target,{
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            if(srcReq.user){
            proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
            }
          
        }   
})
}