import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIngredients } from 'app/shared/model/ingredients.model';
import { IngredientsService } from '../entities/ingredients/ingredients.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    ingredients: IIngredients[];
    modalRef: NgbModalRef;

    constructor(
        protected ingredientsService: IngredientsService,
        protected jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this.ingredientsService
            .query()
            .pipe(
                filter((res: HttpResponse<IIngredients[]>) => res.ok),
                map((res: HttpResponse<IIngredients[]>) => res.body)
            )
            .subscribe(
                (res: IIngredients[]) => {
                    this.ingredients = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
