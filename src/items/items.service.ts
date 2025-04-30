import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemRequest, GetItemRequest, Item, Items } from './items';
import { randomUUID } from 'crypto';
import { Subject } from 'rxjs';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];
  private readonly itemsSubject = new Subject<Items>();

  createItem(request: CreateItemRequest) {
    const item: Item = {
      id: randomUUID(),
      ...request,
    };
    this.items.push(item);
    this.itemsSubject.next({
      items: this.items,
    });
    return item;
  }

  getItem(request: GetItemRequest) {
    const item = this.items.find((item) => item.id === request.id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${request.id} not found`);
    }
    return item;
  }

  streamItems() {
    return this.itemsSubject.asObservable();
  }
}
