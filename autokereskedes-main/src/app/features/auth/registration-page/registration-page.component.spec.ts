import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginData } from '../auth.types';
import { RegistrationPageComponent } from './registration-page.component';

describe('RegistrationPageComponent', () => {
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let component: RegistrationPageComponent;

  let userServiceSpy: jasmine.SpyObj<UserService>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('userService', ['register']);
    userServiceSpy.register.and.returnValue(Promise.resolve());

    snackBarServiceSpy = jasmine.createSpyObj('snackBarService', ['error']);

    routerSpy = jasmine.createSpyObj('router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should registration and navigate to the home page', async () => {
    // Arrange
    const loginData: LoginData = {
      email: 'email',
      password: 'password',
    };

    // Act
    await component.register(loginData);

    // Assert
    expect(userServiceSpy.register).toHaveBeenCalledWith({
      email: 'email',
      password: 'password',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    expect(snackBarServiceSpy.error).not.toHaveBeenCalled();
  });

  it('should show error message when the registration was failed', async () => {
    // Arrange
    userServiceSpy.register.and.throwError('error');
    const loginData: LoginData = {
      email: 'email',
      password: 'password',
    };

    // Act
    await component.register(loginData);

    // Assert
    expect(userServiceSpy.register).toHaveBeenCalledWith({
      email: 'email',
      password: 'password',
    });
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(snackBarServiceSpy.error).toHaveBeenCalledWith('Sikertelen regisztráció.');
  });
});
