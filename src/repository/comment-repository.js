import CrudRepository from "./crud-repository.js"
import Comment from "../models/comments"

class CommentRepository {
    constructor(){
        super(Comment)
    }
}

export default CommentRepository;