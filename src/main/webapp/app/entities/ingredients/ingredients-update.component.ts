import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IIngredients } from 'app/shared/model/ingredients.model';
import { IngredientsService } from './ingredients.service';

@Component({
    selector: 'jhi-ingredients-update',
    templateUrl: './ingredients-update.component.html'
})
export class IngredientsUpdateComponent implements OnInit {
    ingredients: IIngredients;
    isSaving: boolean;

    constructor(protected ingredientsService: IngredientsService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ingredients }) => {
            this.ingredients = ingredients;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ingredients.id !== undefined) {
            this.subscribeToSaveResponse(this.ingredientsService.update(this.ingredients));
        } else {
            this.subscribeToSaveResponse(this.ingredientsService.create(this.ingredients));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIngredients>>) {
        result.subscribe((res: HttpResponse<IIngredients>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
