import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto, UpdateEventDto } from 'src/dto/event.dto';
import { Event } from 'src/schema/event.schema';

@Injectable()
export class EventService {

    constructor(
        // Inject the model name 
        @InjectModel(Event.name) private readonly eventModel: Model<Event>
    ) { }

    /**
     * find all events in the database
     */
    public async findAll(): Promise<Event[]> {
        return await this.eventModel.find().exec()
    }

    /**
     * find one event from the database if not exists throws exception error
     * @param id 
     */
    public async findOne(id: string): Promise<Event> {
        const event = await this.eventModel.findById(id).exec();

        if (!event)
            throw new NotFoundException(`Event with the id : ${id} is not found`)

        return event;
    }


    /**
     * update one event from the database if not exists throws exception error
     * @param id 
     */
    public async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        const updateExistingEvent = await this.eventModel.findByIdAndUpdate(id, updateEventDto).exec()

        if (!updateExistingEvent)
            throw new NotFoundException(`Event with the id : ${id} is not found`)

        return updateExistingEvent;
    }

    /**
     * remove one event from the database
     * @param id 
     */
    public async delete(id: string): Promise<Boolean> {
        try {
            await this.eventModel.findByIdAndDelete(id)
            return true
        } catch (err) {
            throw new Error(`Event failed to be deleted ${err}`);

        }
    }

    /**
     * create one event in the database
     * @param eventCreateDto Data transfer object for event
     */
    public async create(createEventDto: CreateEventDto): Promise<any> {
        const newEvent = await new this.eventModel(createEventDto).save();
        return newEvent;
    }
}
