import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIngredients } from 'app/shared/model/ingredients.model';
import { AccountService } from 'app/core';
import { IngredientsService } from './ingredients.service';

@Component({
    selector: 'jhi-ingredients',
    templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit, OnDestroy {
    ingredients: IIngredients[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ingredientsService: IngredientsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

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

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIngredients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIngredients) {
        return item.id;
    }

    registerChangeInIngredients() {
        this.eventSubscriber = this.eventManager.subscribe('ingredientsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
