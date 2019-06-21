import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ingredients } from 'app/shared/model/ingredients.model';
import { IngredientsService } from './ingredients.service';
import { IngredientsComponent } from './ingredients.component';
import { IngredientsDetailComponent } from './ingredients-detail.component';
import { IngredientsUpdateComponent } from './ingredients-update.component';
import { IngredientsDeletePopupComponent } from './ingredients-delete-dialog.component';
import { IIngredients } from 'app/shared/model/ingredients.model';

@Injectable({ providedIn: 'root' })
export class IngredientsResolve implements Resolve<IIngredients> {
    constructor(private service: IngredientsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIngredients> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Ingredients>) => response.ok),
                map((ingredients: HttpResponse<Ingredients>) => ingredients.body)
            );
        }
        return of(new Ingredients());
    }
}

export const ingredientsRoute: Routes = [
    {
        path: '',
        component: IngredientsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newjhip3App.ingredients.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: IngredientsDetailComponent,
        resolve: {
            ingredients: IngredientsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newjhip3App.ingredients.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: IngredientsUpdateComponent,
        resolve: {
            ingredients: IngredientsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newjhip3App.ingredients.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: IngredientsUpdateComponent,
        resolve: {
            ingredients: IngredientsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newjhip3App.ingredients.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ingredientsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: IngredientsDeletePopupComponent,
        resolve: {
            ingredients: IngredientsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'newjhip3App.ingredients.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
