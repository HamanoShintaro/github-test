/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Newjhip3TestModule } from '../../../test.module';
import { IngredientsUpdateComponent } from 'app/entities/ingredients/ingredients-update.component';
import { IngredientsService } from 'app/entities/ingredients/ingredients.service';
import { Ingredients } from 'app/shared/model/ingredients.model';

describe('Component Tests', () => {
    describe('Ingredients Management Update Component', () => {
        let comp: IngredientsUpdateComponent;
        let fixture: ComponentFixture<IngredientsUpdateComponent>;
        let service: IngredientsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Newjhip3TestModule],
                declarations: [IngredientsUpdateComponent]
            })
                .overrideTemplate(IngredientsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IngredientsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IngredientsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Ingredients(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ingredients = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Ingredients();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ingredients = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
