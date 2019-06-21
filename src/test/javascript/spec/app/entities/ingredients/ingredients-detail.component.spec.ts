/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Newjhip3TestModule } from '../../../test.module';
import { IngredientsDetailComponent } from 'app/entities/ingredients/ingredients-detail.component';
import { Ingredients } from 'app/shared/model/ingredients.model';

describe('Component Tests', () => {
    describe('Ingredients Management Detail Component', () => {
        let comp: IngredientsDetailComponent;
        let fixture: ComponentFixture<IngredientsDetailComponent>;
        const route = ({ data: of({ ingredients: new Ingredients(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Newjhip3TestModule],
                declarations: [IngredientsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IngredientsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IngredientsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ingredients).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
