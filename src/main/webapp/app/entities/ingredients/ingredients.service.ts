import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIngredients } from 'app/shared/model/ingredients.model';

type EntityResponseType = HttpResponse<IIngredients>;
type EntityArrayResponseType = HttpResponse<IIngredients[]>;

@Injectable({ providedIn: 'root' })
export class IngredientsService {
    public resourceUrl = SERVER_API_URL + 'api/ingredients';

    constructor(protected http: HttpClient) {}

    create(ingredients: IIngredients): Observable<EntityResponseType> {
        return this.http.post<IIngredients>(this.resourceUrl, ingredients, { observe: 'response' });
    }

    update(ingredients: IIngredients): Observable<EntityResponseType> {
        return this.http.put<IIngredients>(this.resourceUrl, ingredients, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIngredients>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIngredients[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
