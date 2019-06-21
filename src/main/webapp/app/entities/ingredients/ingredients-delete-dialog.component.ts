import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIngredients } from 'app/shared/model/ingredients.model';
import { IngredientsService } from './ingredients.service';

@Component({
    selector: 'jhi-ingredients-delete-dialog',
    templateUrl: './ingredients-delete-dialog.component.html'
})
export class IngredientsDeleteDialogComponent {
    ingredients: IIngredients;

    constructor(
        protected ingredientsService: IngredientsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ingredientsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ingredientsListModification',
                content: 'Deleted an ingredients'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ingredients-delete-popup',
    template: ''
})
export class IngredientsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ingredients }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IngredientsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ingredients = ingredients;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ingredients', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ingredients', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
