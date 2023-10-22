import UserService from '../services/user-service.js'

const userService = new UserService();

export const signup = async (req,res) =>{
    try {
        const response = await userService.signup({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        });
        
        return res.status(201).json({
            data: response,
            message:'Successsfully created new user',
            sucess:true,
            err:{}
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            data : {},
            message:'coulnt create  new user',
            sucess: true,
            err:{error}})
    }
}