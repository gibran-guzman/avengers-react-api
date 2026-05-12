export type AvengerTeam = 'Avengers' | 'Guardians' | 'X-Men' | 'Fantastic Four' | 'Solo';
export type AvengerStatus = 'Active' | 'Inactive';

export interface AvengerDto {
  id: string;
  name: string;
  alias?: string;
  team?: string;
  role?: string;
  universe?: string;
  firstAppearance?: string;
  biography?: string;
  imageUrl?: string;
  powers?: string[];
  status?: string;
}

export interface Avenger {
  id: string;
  name: string;
  alias: string;
  team: AvengerTeam;
  role: string;
  universe: string;
  firstAppearance: string;
  biography: string;
  imageUrl: string;
  powers: string[];
  status: AvengerStatus;
}
