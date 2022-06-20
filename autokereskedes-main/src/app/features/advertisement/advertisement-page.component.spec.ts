import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/shared/services/user.service';
import { AdvertisementPageComponent } from './advertisement-page.component';

describe('AdvertisementPageComponent', () => {
  let fixture: ComponentFixture<AdvertisementPageComponent>;
  let component: AdvertisementPageComponent;

  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('userService', ['user']);

    await TestBed.configureTestingModule({
      declarations: [AdvertisementPageComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
