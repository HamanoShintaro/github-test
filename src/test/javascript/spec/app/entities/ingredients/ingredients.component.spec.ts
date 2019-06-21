/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Newjhip3TestModule } from '../../../test.module';
import { IngredientsComponent } from 'app/entities/ingredients/ingredients.component';
import { IngredientsService } from 'app/entities/ingredients/ingredients.service';
import { Ingredients } from 'app/shared/model/ingredients.model';

describe('Component Tests', () => {
    describe('Ingredients Management Component', () => {
        let comp: IngredientsComponent;
        let fixture: ComponentFixture<IngredientsComponent>;
        let service: IngredientsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Newjhip3TestModule],
                declarations: [IngredientsComponent],
                providers: []
            })
                .overrideTemplate(IngredientsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IngredientsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IngredientsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Ingredients(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ingredients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
