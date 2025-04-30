import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemRequest, GetItemRequest, Item, Items } from './items';
import { ItemsService } from './items.service';
import { Observable } from 'rxjs';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() request: CreateItemRequest): Promise<Item> {
    try {
      const item = await this.itemsService.createItem(request);
      return item;
    } catch (error) {
      throw new NotFoundException('Item creation failed');
    }
  }

  @Get(':id')
  async getItem(@Param('id') id: string): Promise<Item> {
    try {
      const request: GetItemRequest = { id };
      const item = await this.itemsService.getItem(request);
      return item;
    } catch (error) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }

  @Get()
  streamItems(): Observable<Items> {
    try {
      return this.itemsService.streamItems();
    } catch (error) {
      throw new NotFoundException('Could not retrieve items');
    }
  }
}
