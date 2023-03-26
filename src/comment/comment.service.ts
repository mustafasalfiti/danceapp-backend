import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from 'src/dto/comment.dto';
import { Comment } from 'src/schema/comment.schema';

@Injectable()
export class CommentService {

    constructor(
        // Inject the model name 
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>
    ) { }

    /**
     * find all comments in the database
     */
    public async findAll(): Promise<Comment[]> {
        return await this.commentModel.find().exec()
    }

    /**
     * find one comment from the database if not exists throws exception error
     * @param id 
     */
    public async findOne(id: string): Promise<Comment> {
        const comment = await this.commentModel.findById(id).exec();

        if (!comment)
            throw new NotFoundException(`Comment with the id : ${id} is not found`)

        return comment;
    }


    /**
     * update one comment from the database if not exists throws exception error
     * @param id 
     */
    public async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const updateExistingComment = await this.commentModel.findByIdAndUpdate(id, updateCommentDto).exec()

        if (!updateExistingComment)
            throw new NotFoundException(`Comment with the id : ${id} is not found`)

        return updateExistingComment;
    }

    /**
     * remove one comment from the database
     * @param id 
     */
    public async delete(id: string): Promise<Boolean> {
        try {
            await this.commentModel.findByIdAndDelete(id)
            return true
        } catch (err) {
            throw new Error(`Comment failed to be deleted ${err}`);

        }
    }

    /**
     * create one comment in the database
     * @param commentCreateDto Data transfer object for comment
     */
    public async create(createCommentDto: CreateCommentDto): Promise<any> {
        const newComment = await new this.commentModel(createCommentDto).save();
        return newComment;
    }
}
