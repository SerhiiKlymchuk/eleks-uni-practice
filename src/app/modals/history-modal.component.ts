import {
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: [
    '../../styles/default.scss',
    './history-modal.component.scss',
  ],
})
export class HistoryModalComponent implements OnInit {
 
  @Input() history: any[] = [];

  historyList: any[] = [];

  activeModal = inject(NgbActiveModal);

  page = 1;
	
  pageSize = 15;
	
  collectionSize = 0;

  constructor(
    
  ) {}

  ngOnInit(): void {
    this.collectionSize = this.history.length;
    this.refresh();
  }

  refresh() {
		this.historyList = this.history.slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}
}
