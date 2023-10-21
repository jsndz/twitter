import CommentService from '../services/comment-service.js';

const commentService = new CommentService();

export const createComment = async (req,res) => {
    try {
        const response = await commentService.create(req.query.modelId,req.query.modelType,req.body.userId,req.body.content);
        
        return res.status(201).json({
            data : response,
            message:'Successfully commented',
            sucess: true,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            data : {},
            message:'coulnt be commented',
            sucess: true,
            err:{error}
        
    })
    }
}