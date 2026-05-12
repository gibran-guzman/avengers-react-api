import type { Avenger, AvengerDto, AvengerStatus, AvengerTeam } from '../types/avenger';

const teamOptions: AvengerTeam[] = ['Avengers', 'Guardians', 'X-Men', 'Fantastic Four', 'Solo'];
const statusOptions: AvengerStatus[] = ['Active', 'Inactive'];

function resolveTeam(value: string | undefined): AvengerTeam {
  if (value && teamOptions.includes(value as AvengerTeam)) {
    return value as AvengerTeam;
  }

  return 'Solo';
}

function resolveStatus(value: string | undefined): AvengerStatus {
  if (value && statusOptions.includes(value as AvengerStatus)) {
    return value as AvengerStatus;
  }

  return 'Active';
}

export function mapAvengerDtoToAvenger(dto: AvengerDto): Avenger {
  return {
    id: dto.id,
    name: dto.name,
    alias: dto.alias ?? dto.name,
    team: resolveTeam(dto.team),
    role: dto.role ?? 'Unknown role',
    universe: dto.universe ?? 'Unknown universe',
    firstAppearance: dto.firstAppearance ?? 'Unknown appearance',
    biography: dto.biography ?? 'No biography available.',
    imageUrl: dto.imageUrl ?? '',
    powers: dto.powers ?? [],
    status: resolveStatus(dto.status),
  };
}

export function mapAvengerDtosToAvengers(dtos: AvengerDto[]) {
  return dtos.map(mapAvengerDtoToAvenger);
}
