import registers from "../Entity/registers.ts";
import { BadRequest } from "../errors.ts/status.ts";
import { ISignup } from "../interfaces/registers.ts";

export class CreateUser{
    async execute( user :ISignup ): Promise<void> {

            if(!user.username || !user.email || !user.password){
                throw new BadRequest("Please, fill all the fields!");
            }
           else {
            await registers.create({
                username: user.username,
                email: user.email,
                password: user.password,
            });
        }
    }
}