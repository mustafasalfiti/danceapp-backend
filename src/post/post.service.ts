import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto, UpdatePostDto } from 'src/dto/post.dto';
import { Post } from 'src/schema/post.schema';

@Injectable()
export class PostService {

    constructor(
        // Inject the model name 
        @InjectModel(Post.name) private readonly postModel: Model<Post>
    ) { }

    /**
     * find all posts in the database
     */
    public async findAll(): Promise<Post[]> {
        return await this.postModel.find().exec()
    }

    /**
     * find one post from the database if not exists throws exception error
     * @param id 
     */
    public async findOne(id: string): Promise<Post> {
        const post = await this.postModel.findById(id).exec();

        if (!post)
            throw new NotFoundException(`Post with the id : ${id} is not found`)

        return post;
    }


    /**
     * update one post from the database if not exists throws exception error
     * @param id 
     */
    public async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        const updateExistingPost = await this.postModel.findByIdAndUpdate(id, updatePostDto).exec()

        if (!updateExistingPost)
            throw new NotFoundException(`Post with the id : ${id} is not found`)

        return updateExistingPost;
    }

    /**
     * remove one post from the database
     * @param id 
     */
    public async delete(id: string): Promise<Boolean> {
        try {
            await this.postModel.findByIdAndDelete(id)
            return true
        } catch (err) {
            throw new Error(`Post failed to be deleted ${err}`);

        }
    }

    /**
     * create one post in the database
     * @param postCreateDto Data transfer object for post
     */
    public async create(createPostDto: CreatePostDto): Promise<any> {
        const newPost = await new this.postModel(createPostDto).save();
        return newPost;
    }
}
