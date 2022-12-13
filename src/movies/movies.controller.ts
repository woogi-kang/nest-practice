import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesServies: MoviesService) {}

    @Get()
    getAll() {
        return this.moviesServies.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') movieId: string) {
        const movie = this.moviesServies.getOne(movieId);

        if(!movie) {
            throw new NotFoundException(`Movie with Id: ${movieId} not found.`);
        }
        return movie;
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesServies.create(movieData);
    }

    @Delete('/:id')
    delete(@Param('id') movieId: string) {
        this.getOne(movieId);
        return this.moviesServies.deleteOne(movieId);
    }

    @Patch('/:id')
    update(@Param('id') movieId: string) {
        return `This will update a movie with the id: ${movieId}`; 
    }
}
