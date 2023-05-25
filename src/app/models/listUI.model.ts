import { List } from './list.model';
import { Card } from './card.model';

export interface ListUI {
  list: List;
  cards: Card[];
}
