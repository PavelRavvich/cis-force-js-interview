import {
  Input,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> {

  @Input() public numbered: string;

  @Input() public items: Array<T>;

  @Input() public columns: Array<String>;

  @Input() public keys: Array<String>;

  @Output() public actionChange = new EventEmitter<T>();

  public action(item: T): void {
    this.actionChange.emit(item);
  }

}
