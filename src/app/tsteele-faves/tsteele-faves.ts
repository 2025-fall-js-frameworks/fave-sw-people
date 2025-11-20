import { Component, inject, OnInit } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { AsyncPipe } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tsteele-faves',
  imports: [AsyncPipe],
  templateUrl: './tsteele-faves.html',
  styleUrl: './tsteele-faves.css',
})
export class TsteeleFaves {
  private readonly peopleSvc = inject(SwPeopleService);
  private readonly modalService = inject(NgbModal);

  protected readonly people$ = this.peopleSvc.getPeopleFromSwapiApi();

  protected promisesAsThenables() {
    
    const page1 = this.peopleSvc.getPeoplePageOne()
      .then(
        data => {
          console.log(data);

          const page2 = this.peopleSvc.getPeoplePageTwo()
            .then(
              data => console.log(data)
            )
            .catch(
              err => console.warn(err)
            )
        }
      )
      .catch(
        err => console.warn(err)
      )
    ;
  }

  protected async promisesWithAsyncAwait() {
    try {
      const page1 = await this.peopleSvc.getPeoplePageOne();
      console.log(page1) // ? ? ?

      const page2 = await this.peopleSvc.getPeoplePageTwo();
      console.log(page2) // ? ? ?
    }
    
    catch(err) {
      console.warn(err)
    }
  }

  protected async promisesFun() {
    try {
      const page1 = this.peopleSvc.getPeoplePageOne();
      console.log(page1) // ? ? ?

      const page2 = this.peopleSvc.getPeoplePageTwo();
      console.log(page2) // ? ? ?

      // const data = await Promise.all([page1, page2]);
      const data = await Promise.any([page1, page2]);
      console.log(data[0].name);
      this.openModal(data[0].name);
    }
    
    catch(err) {
      console.warn(err)
    }
  }

  private openModal(content: any) {
    const modalRef = this.modalService.open(ModalContent, { size: 'sm' });
    modalRef.componentInstance.data = content;
  }
}

@Component({
  selector: 'modal-content',
  standalone: true,
  imports: [],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Message</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <pre>{{ data }}</pre>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close()">Close</button>
    </div>
  `
})
export class ModalContent {
  activeModal = inject(NgbActiveModal);
  data: any;
}
