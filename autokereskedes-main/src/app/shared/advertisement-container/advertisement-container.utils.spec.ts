import { User } from 'firebase/auth';
import { Models } from '../models/models';
import { ViewModels } from '../models/view-models';
import { filterModels } from './advertisement-container.utils';

describe('advertisement utils', () => {
  it('should filter', () => {
    // Arrange
    const advertisements = [
      {
        id: 'id1',
        userId: 'userId1',
        isActive: true,
        vehicle: {
          brandId: '1',
          colorId: '2',
          fuelTypeId: '1',
          conditionId: '2',
          typeId: '1',
        } as Models.IVehicle,
      } as Models.IAdvertisement,
      {
        id: 'id2',
        userId: 'userId2',
        isActive: true,
        vehicle: {
          brandId: '2',
          colorId: '1',
          fuelTypeId: '2',
          conditionId: '1',
          typeId: '2',
        } as Models.IVehicle,
      } as Models.IAdvertisement,
    ];

    const filter = {
      colorIds: ['2'],
      fuelTypeIds: ['1'],
      conditionIds: ['2'],
      typeIds: ['1'],
    } as unknown as ViewModels.IFilter;

    const user = {
      uid: 'userId1',
    } as User;

    // Act
    const result = filterModels(advertisements, filter, user);

    // Assert

    expect(result).toEqual([
      {
        id: 'id1',
        userId: 'userId1',
        isActive: true,
        vehicle: {
          brandId: '1',
          colorId: '2',
          fuelTypeId: '1',
          conditionId: '2',
          typeId: '1',
        } as Models.IVehicle,
      } as Models.IAdvertisement,
    ]);
  });
});
