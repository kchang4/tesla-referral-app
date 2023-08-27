import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal, MealDocument } from './meal.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateMealDto } from './dto/create-meal.dto';

@Injectable()
export class MealService {
  constructor(@InjectModel(Meal.name) private mealModel: Model<Meal>) {}

  async create(createMealDto: CreateMealDto) {
    return this.mealModel.create(createMealDto);
  }

  async findAll(query?: FilterQuery<MealDocument>) {
    return this.mealModel.find(query || {});
  }

  async remove(query: FilterQuery<MealDocument>) {
    return this.mealModel.deleteOne(query);
  }
}
