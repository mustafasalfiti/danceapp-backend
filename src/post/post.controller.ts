import { Body, Controller, Delete, Get, Request, HttpStatus, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/JwtAuth/jwt-auth.guard';
import { CreatePostDto, UpdatePostDto } from 'src/dto/post.dto';
import { Post as PostModel } from 'src/schema/post.schema';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {

    constructor(
        private postService: PostService
    ) { }

    /**
     * send back all posts from the database
     @param res the response object from express framwork
     */
    @Get()
    public async getAllPosts(
        @Res() res: Response
    ) {
        try {
            const posts = await this.postService.findAll();
            return res.status(HttpStatus.OK).json(posts)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

    /**
     * send back one post with specific id from the database
     * @param id
     * @param res the response object from express framwork
     */
    @Get()
    public async getPost(
        @Body('id') id: string,
        @Res() res: Response
    ) {
        try {
            const post = await this.postService.findOne(id);
            res.status(HttpStatus.OK).json(post)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

    /**
     * create a post in the database and send it back
     * @param createPostDto
     * @param res the response object from express framwork
     */
    @Post()
    public async createPost(
        @Body() createPostDto: CreatePostDto,
        @Res() res: Response
    ) {
        try {
            const post = await this.postService.create(createPostDto);
            console.log(post)
            res.status(HttpStatus.OK).json(post)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

    /**
     * delete one post with specific id from the database
     * @param post
     * @param res the response object from express framwork
     * @param req the request object
     */
    @UseGuards(JwtAuthGuard)
    @Delete()
    public async deletePost(
        @Body() post: PostModel,
        @Res() res: Response,
        @Request() req
    ) {
        try {
            if (post.user_id == req.user.user_id) {
                await this.postService.delete(post._id);
                res.status(HttpStatus.OK).json({});
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send();
            }
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

    /**
     * update one post with specific id in the database
     * @param post_user_id
     * @param post_id
     * @param updatePostDto
     * @param res the response object from express framwork
     * @param req the request object
     */
    @UseGuards(JwtAuthGuard)
    @Put()
    public async updatePost(
        @Body('post_user_id') post_user_id, // the user that created the post
        @Body('post_id') post_id,
        @Body('post') updatePostDto: UpdatePostDto,
        @Res() res: Response,
        @Request() req
    ) {
        try {
            if (post_user_id == req.user.user_id) {
                const updatedPost = await this.postService.update(post_id, updatePostDto);
                res.status(HttpStatus.OK).json(updatedPost)
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send();
            }
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

}




