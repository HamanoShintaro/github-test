/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Newjhip3TestModule } from '../../../test.module';
import { IngredientsDeleteDialogComponent } from 'app/entities/ingredients/ingredients-delete-dialog.component';
import { IngredientsService } from 'app/entities/ingredients/ingredients.service';

describe('Component Tests', () => {
    describe('Ingredients Management Delete Component', () => {
        let comp: IngredientsDeleteDialogComponent;
        let fixture: ComponentFixture<IngredientsDeleteDialogComponent>;
        let service: IngredientsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Newjhip3TestModule],
                declarations: [IngredientsDeleteDialogComponent]
            })
                .overrideTemplate(IngredientsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IngredientsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IngredientsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
