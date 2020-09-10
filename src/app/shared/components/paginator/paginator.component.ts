import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  public actualPage = 0;

  @Input() lastPage: number;
  @Output() changePageEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public previousPage() {
    if (this.actualPage > 0) {
      this.actualPage -= 1;
      this.sendEvent();
    }
  }

  public nextPage() {
    if (this.actualPage < this.lastPage - 1) {
      this.actualPage += 1;
      this.sendEvent();
    }
  }

  public sendEvent(): void {
    this.changePageEvent.emit(this.actualPage.toString());
  }
}
