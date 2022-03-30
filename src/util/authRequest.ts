export async function validateToken(req: any): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
        try{
            let result = false;
            const token = req.header('auth-token');
            if(token == '123456'){
                result = true;
            }            
            resolve(result);
        } catch(error){
            reject(error);
        }

    })

}