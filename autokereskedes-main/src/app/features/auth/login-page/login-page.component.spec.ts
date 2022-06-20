import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginData } from '../auth.types';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;

  let userServiceSpy: jasmine.SpyObj<UserService>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('userService', [
      'login',
      'loginWithGoogle',
    ]);
    userServiceSpy.login.and.returnValue(Promise.resolve());
    userServiceSpy.loginWithGoogle.and.returnValue(Promise.resolve());

    snackBarServiceSpy = jasmine.createSpyObj('snackBarService', ['error']);

    routerSpy = jasmine.createSpyObj('router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login and navigate to the home page', async () => {
    // Arrange
    const loginData: LoginData = {
      email: 'email',
      password: 'password',
    };

    // Act
    await component.login(loginData);

    // Assert
    expect(userServiceSpy.login).toHaveBeenCalledWith({
      email: 'email',
      password: 'password',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    expect(snackBarServiceSpy.error).not.toHaveBeenCalled();
  });

  it('should show error message when the login was failed', async () => {
    // Arrange
    userServiceSpy.login.and.throwError('error');
    const loginData: LoginData = {
      email: 'email',
      password: 'password',
    };

    // Act
    await component.login(loginData);

    // Assert
    expect(userServiceSpy.login).toHaveBeenCalledWith({
      email: 'email',
      password: 'password',
    });
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(snackBarServiceSpy.error).toHaveBeenCalledWith('Sikertelen bejelentkezés.');
  });

  it('should login with google and navigate to the home page', async () => {
    // Act
    await component.loginWithGoogle();

    // Assert
    expect(userServiceSpy.loginWithGoogle).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    expect(snackBarServiceSpy.error).not.toHaveBeenCalled();
  });

  it('should show error message when the login with google was failed', async () => {
    // Arrange
    userServiceSpy.loginWithGoogle.and.throwError('error');

    // Act
    await component.loginWithGoogle();

    // Assert
    expect(userServiceSpy.loginWithGoogle).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(snackBarServiceSpy.error).toHaveBeenCalledWith('Sikertelen bejelentkezés.');
  });
});
