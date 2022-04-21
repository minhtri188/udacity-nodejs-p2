import {Request} from 'express';

export async function validateToken(req: Request): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
        try{
            let result: boolean = false;
            const token: string = req.header('auth-token') as string;
            if(token == '123456'){
                result = true;
            }            
            resolve(result);
        } catch(error){
            reject(false);
        }

    })

}
