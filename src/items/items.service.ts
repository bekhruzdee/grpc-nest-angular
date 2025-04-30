import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemRequest, GetItemRequest, Item, Items } from './items';
import { randomUUID } from 'crypto';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];
  private readonly itemsSubject = new ReplaySubject<Items>(1);

  constructor() {
    this.emitItems();
  }

  createItem(request: CreateItemRequest): Item {
    const newItem: Item = {
      id: randomUUID(),
      ...request,
    };

    this.items.push(newItem);
    this.emitItems();
    return newItem;
  }

  getItem(request: GetItemRequest): Item {
    const foundItem = this.items.find((item) => item.id === request.id);

    if (!foundItem) {
      throw new NotFoundException(`Item with ID "${request.id}" not found`);
    }

    return foundItem;
  }

  streamItems(): Observable<Items> {
    return this.itemsSubject.asObservable();
  }

  private emitItems(): void {
    this.itemsSubject.next({ items: [...this.items] });
  }
}
