import { Body, Controller, Delete, Get, HttpStatus, Request, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/JwtAuth/jwt-auth.guard';
import { CreateCommentDto, UpdateCommentDto } from 'src/dto/comment.dto';
import { Comment } from 'src/schema/comment.schema';
import { CommentService } from './comment.service';

@Controller('api/comment')
export class CommentController {

    constructor(
        private commentService: CommentService
    ) { }

    /**
     * create a comment in the database and send it back
     * @param createCommentDto
     * @param res the response object from express framwork
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    public async createComment(
        @Body() createCommentDto: CreateCommentDto,
        @Res() res: Response
    ) {
        try {
            const comment = await this.commentService.create(createCommentDto);
            res.status(HttpStatus.OK).json(comment)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

    /**
 * update one comment with specific id in the database
 * @param id comment id
 * @param updateCommentDto
 * @param user_id id of the user that created the comment
 * @param res the response object from express framwork
 * @param req the request object
 */
    @UseGuards(JwtAuthGuard)
    @Put()
    public async updateComment(
        @Body('id') id: string, // comment id
        @Body('user_id') user_id: string,
        @Body('comment') updateCommentDto: UpdateCommentDto,
        @Res() res: Response,
        @Request() req
    ) {
        try {
            if (user_id == req.user.user_id) {
                const updatedComment = await this.commentService.update(id, updateCommentDto);
                res.status(HttpStatus.OK).json(updatedComment)
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send()
            }
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }


    /**
     * delete one comment with specific id from the database
     * @param comment
     * @param res the response object from express framwork
     * @param req the request object
     */
    @UseGuards(JwtAuthGuard)
    @Delete()
    public async deleteComment(
        @Body() comment: Comment,
        @Res() res: Response,
        @Request() req
    ) {
        try {
            if (comment.user_id == req.user.user_id) {
                await this.commentService.delete(comment._id);
                res.status(HttpStatus.OK).json({})
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send()
            }
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

}