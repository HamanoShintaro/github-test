import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIngredients } from 'app/shared/model/ingredients.model';

@Component({
    selector: 'jhi-ingredients-detail',
    templateUrl: './ingredients-detail.component.html'
})
export class IngredientsDetailComponent implements OnInit {
    ingredients: IIngredients;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ingredients }) => {
            this.ingredients = ingredients;
        });
    }

    previousState() {
        window.history.back();
    }
}
