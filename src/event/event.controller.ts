import { Body, Controller, Delete, Get, Request, HttpStatus, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Mongoose } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/JwtAuth/jwt-auth.guard';
import { CreateEventDto, UpdateEventDto } from 'src/dto/event.dto';
import { Event } from 'src/schema/event.schema';
import { EventService } from './event.service';

@Controller('api/event')
export class EventController {

    constructor(
        private eventService: EventService
    ) { }

    /**
     * send back all events from the database
     @param res the response object from express framwork
     */
    @Get()
    public async getAllEvents(
        @Res() res: Response
    ) {
        try {
            const events = await this.eventService.findAll();
            return res.status(HttpStatus.OK).json(events)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

    /**
     * send back one event with specific id from the database
     * @param id
     * @param res the response object from express framwork
     */
    @Get()
    public async getEvent(
        @Body('id') id: string,
        @Res() res: Response
    ) {
        try {
            const event = await this.eventService.findOne(id);
            res.status(HttpStatus.OK).json(event)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

    /**
     * create a event in the database and send it back
     * @param createEventDto
     * @param res the response object from express framwork
     */
    @Post()
    public async createEvent(
        @Body() createEventDto: CreateEventDto,
        @Res() res: Response
    ) {
        try {
            console.log(createEventDto);
            const event = await this.eventService.create(createEventDto);
            res.status(HttpStatus.OK).json(event)
        } catch (err) {
            console.log(err.message)
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

    /**
     * delete one event with specific id from the database
     * @param event
     * @param res the response object from express framwork
     * @param req the request object
     */
    @UseGuards(JwtAuthGuard)
    @Delete()
    public async deleteEvent(
        @Body() event: Event,
        @Res() res: Response,
        @Request() req
    ) {
        try {
            if (event.createdBy == req.user.user_id) {
                await this.eventService.delete(event._id);
                res.status(HttpStatus.OK).json({})
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send()
            }
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }
    /**
     * update one post with specific id in the database
     * @param event_user_id
     * @param event_id
     * @param updateEventDto
     * @param res the response object from express framwork
     * @param req the request object
     */
    @UseGuards(JwtAuthGuard)
    @Put()
    public async updateEvent(
        @Body('event_user_id') event_user_id, // the user that created the event
        @Body('event_id') event_id,
        @Body('event') updateEventDto: UpdateEventDto,
        @Res() res: Response,
        @Request() req
    ) {
        try {
            if (event_user_id == req.user.user_id) {
                const updatedEvent = await this.eventService.update(event_id, updateEventDto);
                res.status(HttpStatus.OK).json(updatedEvent)
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send()
            }
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err)
        }
    }

}



