import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewModels } from '../models/view-models';
import { AdvertisementFilterComponent } from './advertisement-filter.component';

describe('AdvertisementFilterComponent', () => {
  let fixture: ComponentFixture<AdvertisementFilterComponent>;
  let component: AdvertisementFilterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertisementFilterComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter', () => {
    // Arrange
    spyOn(component.onFilter, 'emit');
    fixture.detectChanges();

    // Act
    component.form.setValue({
      brandIds: ['1'],
      typeIds: null,
      priceFrom: null,
      priceTo: null,
      conditionIds: ['2'],
      colorIds: null,
      fuelTypeIds: null,
      numberOfSeats: null,
    });
    component.onSubmit();

    // Assert
    expect(component.onFilter.emit).toHaveBeenCalledWith({
      brandIds: ['1'],
      typeIds: null,
      priceFrom: null,
      priceTo: null,
      conditionIds: ['2'],
      colorIds: null,
      fuelTypeIds: null,
      numberOfSeats: null,
    } as unknown as ViewModels.IFilter);
  });
});
