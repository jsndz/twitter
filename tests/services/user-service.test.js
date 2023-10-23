import { UserRepository } from "../../src/repository/index.js"
import UserService from "../../src/services/user-service.js"

jest.mock("../../src/repository/index.js")


describe('test for user signup',()=>{
    test('create a user',async ()=>{
        const data ={
            email:'a@b.com',
            password:'12345678'
        };
        (UserRepository.prototype.create).mockReturnValue({...data,createdAt:'2022-02-12',updateAt:'2022-02-12'})
        const userService = new UserService();
        const signup = await userService.signup();
        expect(signup.email).toBe(data.email);

    })
})