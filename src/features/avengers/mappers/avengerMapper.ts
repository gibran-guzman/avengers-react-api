import type { Avenger, AvengerDto, AvengerStatus, AvengerTeam, MarvelCharacterData } from '../types/avenger';

const teamOptions: AvengerTeam[] = ['Avengers', 'Guardians', 'X-Men', 'Fantastic Four', 'Solo'];
const statusOptions: AvengerStatus[] = ['Active', 'Inactive'];

function resolveTeam(value: string | undefined): AvengerTeam {
  if (value && teamOptions.includes(value as AvengerTeam)) {
    return value as AvengerTeam;
  }

  return 'Avengers';
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

export function mapMarvelCharacterToAvengerDto(character: MarvelCharacterData): AvengerDto {
  return {
    id: String(character.id),
    name: character.name,
    alias: character.name,
    team: 'Avengers',
    role: 'Hero',
    universe: 'Marvel Cinematic Universe',
    firstAppearance: 'Marvel Comics',
    biography: character.description || `The hero known as ${character.name}.`,
    imageUrl: character.thumbnail.path.includes('image_not_available')
      ? ''
      : `${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`,
    powers: [],
    status: 'Active',
  };
}
