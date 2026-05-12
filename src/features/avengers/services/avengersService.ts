import { getAvengerById, getAvengers, type AvengersQueryParams } from '../api/avengersApi';
import { mapAvengerDtoToAvenger, mapAvengerDtosToAvengers } from '../mappers/avengerMapper';

export async function listAvengers(params: AvengersQueryParams = {}) {
  const dtos = await getAvengers(params);
  return mapAvengerDtosToAvengers(dtos);
}

export async function getAvengerDetails(id: string) {
  const dto = await getAvengerById(id);
  return dto ? mapAvengerDtoToAvenger(dto) : null;
}
