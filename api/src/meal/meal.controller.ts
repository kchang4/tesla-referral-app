import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  @Post()
  async create(@Body() creatMealDto: CreateMealDto) {
    console.log(creatMealDto.name);
    return this.mealService.create(creatMealDto);
  }

  @Get()
  async findAll() {
    return this.mealService.findAll();
  }

  @Delete('/:id')
  async remove(@Param('id') _id: string) {
    return this.mealService.remove({ _id });
  }
}
