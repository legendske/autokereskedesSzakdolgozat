import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Models } from 'src/app/shared/models/models';
import { AdvertisementService } from 'src/app/shared/services/advertisement.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AppNavBarComponent } from './app-navbar.component';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({}),
    };
  }
}

describe('NavBarComponent', () => {
  let fixture: ComponentFixture<AppNavBarComponent>;
  let component: AppNavBarComponent;

  let userServiceSpy: jasmine.SpyObj<UserService>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let advertisementServiceSpy: jasmine.SpyObj<AdvertisementService>;
  let matDialogMockSpy: jasmine.SpyObj<MatDialogMock>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('userService', [
      'logout',
      'updatePassword',
      'updateProfile',
    ]);
    userServiceSpy.logout.and.returnValue(Promise.resolve());
    userServiceSpy.updatePassword.and.returnValue(Promise.resolve());
    userServiceSpy.updateProfile.and.returnValue(Promise.resolve());

    snackBarServiceSpy = jasmine.createSpyObj('snackBarService', [
      'error',
      'success',
    ]);

    routerSpy = jasmine.createSpyObj('router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    advertisementServiceSpy = jasmine.createSpyObj('advertisementService', [
      'createAdvertisement',
    ]);
    advertisementServiceSpy.createAdvertisement.and.returnValue(
      Promise.resolve()
    );

    matDialogMockSpy = jasmine.createSpyObj('dialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AppNavBarComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AdvertisementService, useValue: advertisementServiceSpy },
        { provide: MatDialog, useValue: matDialogMockSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavBarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should logout and navigate to the home page', async () => {
    // Act
    await component.logout();

    // Assert
    expect(userServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    expect(snackBarServiceSpy.error).not.toHaveBeenCalled();
  });

  it('should show error message when logout was failed', async () => {
    // Arrange
    userServiceSpy.logout.and.throwError('error');

    // Act
    await component.logout();

    // Assert
    expect(userServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(snackBarServiceSpy.error).toHaveBeenCalledWith(
      'Sikertelen kijelentkezés.'
    );
  });

  it('should open advertisement create dialog', async () => {
    // Arrange
    matDialogMockSpy.open.and.returnValue({
      afterClosed: () =>
        of({
          userId: 'userId',
        } as Models.IAdvertisement),
    });

    // Act
    await component.openAdvertisementDialog();

    // Assert
    expect(matDialogMockSpy.open).toHaveBeenCalled();
    expect(advertisementServiceSpy.createAdvertisement).toHaveBeenCalledWith({
      userId: 'userId',
    } as Models.IAdvertisement);
    expect(snackBarServiceSpy.success).toHaveBeenCalledWith(
      'A hírdetés létrehozása sikeres.'
    );
  });

  it('should show error message when the advertisement creation was failed', async () => {
    // Arrange
    matDialogMockSpy.open.and.returnValue({
      afterClosed: () =>
        of({
          userId: 'userId',
        } as Models.IAdvertisement),
    });
    advertisementServiceSpy.createAdvertisement.and.throwError('error');

    // Act
    await component.openAdvertisementDialog();

    // Assert
    expect(matDialogMockSpy.open).toHaveBeenCalled();
    expect(advertisementServiceSpy.createAdvertisement).toHaveBeenCalledWith({
      userId: 'userId',
    } as Models.IAdvertisement);
    expect(snackBarServiceSpy.error).toHaveBeenCalledWith(
      'A hírdetés létrehozása sikertelen.'
    );
  });

  it('should open password change dialog', async () => {
    // Arrange
    matDialogMockSpy.open.and.returnValue({
      afterClosed: () => of('password'),
    });

    // Act
    await component.openPasswordDialog();

    // Assert
    expect(matDialogMockSpy.open).toHaveBeenCalled();
    expect(userServiceSpy.updatePassword).toHaveBeenCalledWith('password');
    expect(snackBarServiceSpy.success).toHaveBeenCalledWith(
      'A jelszómódosítás sikeres.'
    );
  });

  it('should show error message when the password update was failed', async () => {
    // Arrange
    userServiceSpy.updatePassword.and.throwError('error');
    matDialogMockSpy.open.and.returnValue({
      afterClosed: () => of('password'),
    });

    // Act
    await component.openPasswordDialog();

    // Assert
    expect(matDialogMockSpy.open).toHaveBeenCalled();
    expect(userServiceSpy.updatePassword).toHaveBeenCalledWith('password');
    expect(snackBarServiceSpy.error).toHaveBeenCalledWith(
      'A jelszómódosítás sikertelen.'
    );
  });

  it('should open profile update dialog', async () => {
    // Arrange
    matDialogMockSpy.open.and.returnValue({
      afterClosed: () =>
        of({
          userId: 'userId',
        } as Models.IProfile),
    });

    // Act
    await component.openProfileDialog();

    // Assert
    expect(matDialogMockSpy.open).toHaveBeenCalled();
    expect(userServiceSpy.updateProfile).toHaveBeenCalledWith({
      userId: 'userId',
    } as Models.IProfile);
    expect(snackBarServiceSpy.success).toHaveBeenCalledWith(
      'A profil módosítása sikeres.'
    );
  });

  it('should show error message when the profile update was failed', async () => {
    // Arrange
    userServiceSpy.updateProfile.and.throwError('error');
    matDialogMockSpy.open.and.returnValue({
      afterClosed: () =>
        of({
          userId: 'userId',
        } as Models.IProfile),
    });

    // Act
    await component.openProfileDialog();

    // Assert
    expect(matDialogMockSpy.open).toHaveBeenCalled();
    expect(userServiceSpy.updateProfile).toHaveBeenCalledWith({
      userId: 'userId',
    } as Models.IProfile);
    expect(snackBarServiceSpy.error).toHaveBeenCalledWith(
      'A profil módosítása sikertelen.'
    );
  });
});
