import {
  Input,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';

import { IPaginatorConfig } from '../../interfaces/paginator-config.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() public config: IPaginatorConfig;

  @Output() public pageChange = new EventEmitter<IPaginatorConfig>();

  public changePage(page: number): void {
    if (page < 1 || page > this.config.totalPages) { return; }

    this.config.page = page;
    this.pageChange.emit(this.config);
  }
}
