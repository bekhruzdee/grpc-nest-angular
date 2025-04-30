import { Controller } from '@nestjs/common';
import {
  CreateItemRequest,
  Empty,
  GetItemRequest,
  Item,
  Items,
  ItemsServiceController,
  ItemsServiceControllerMethods,
} from './items';
import { ItemsService } from './items.service';
import { Observable } from 'rxjs';

@Controller('items')
@ItemsServiceControllerMethods()
export class ItemsController implements ItemsServiceController {
  constructor(private readonly itemsService: ItemsService) {}

  getItem(request: GetItemRequest): Promise<Item> | Observable<Item> | Item {
    return this.itemsService.getItem(request);
  }

  createItem(
    request: CreateItemRequest,
  ): Promise<Item> | Observable<Item> | Item {
    return this.itemsService.createItem(request);
  }

  streamItems(): Observable<Items> {
    return this.itemsService.streamItems();
  }
}
