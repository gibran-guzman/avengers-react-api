import type { AvengerDto } from '../types/avenger';

export const avengerMocks: AvengerDto[] = [
  {
    id: 'iron-man',
    name: 'Tony Stark',
    alias: 'Iron Man',
    team: 'Avengers',
    role: 'Founder',
    universe: 'Earth-616',
    firstAppearance: 'Tales of Suspense #39',
    biography:
      'A genius inventor and billionaire who built advanced armor to protect the world and his team.',
    imageUrl:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    powers: ['Powered armor', 'Strategic genius', 'Repulsors'],
    status: 'Active',
  },
  {
    id: 'captain-america',
    name: 'Steve Rogers',
    alias: 'Captain America',
    team: 'Avengers',
    role: 'Leader',
    universe: 'Earth-616',
    firstAppearance: 'Captain America Comics #1',
    biography:
      'The super-soldier emblem of courage, discipline, and unwavering moral leadership.',
    imageUrl:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
    powers: ['Super soldier serum', 'Vibranium shield', 'Tactical leadership'],
    status: 'Active',
  },
  {
    id: 'black-widow',
    name: 'Natasha Romanoff',
    alias: 'Black Widow',
    team: 'Avengers',
    role: 'Operative',
    universe: 'Earth-616',
    firstAppearance: 'Tales of Suspense #52',
    biography:
      'An elite spy and martial artist whose precision, discipline, and calm under pressure keep missions on track.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    powers: ['Espionage', 'Hand-to-hand combat', 'Tactical infiltration'],
    status: 'Active',
  },
  {
    id: 'thor',
    name: 'Thor Odinson',
    alias: 'Thor',
    team: 'Avengers',
    role: 'God of Thunder',
    universe: 'Earth-616',
    firstAppearance: 'Journey into Mystery #83',
    biography:
      'Asgardian prince and bearer of Mjolnir, Thor brings elemental force and battlefield presence.',
    imageUrl:
      'https://images.unsplash.com/photo-1518441902117-f0ecdf26a94d?auto=format&fit=crop&w=900&q=80',
    powers: ['Thunder control', 'Flight', 'Mjolnir'],
    status: 'Active',
  },
  {
    id: 'hulk',
    name: 'Bruce Banner',
    alias: 'Hulk',
    team: 'Avengers',
    role: 'Powerhouse',
    universe: 'Earth-616',
    firstAppearance: 'The Incredible Hulk #1',
    biography:
      'A scientific mind paired with overwhelming strength once gamma radiation triggers the Hulk.',
    imageUrl:
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=900&q=80',
    powers: ['Gamma strength', 'Durability', 'Rapid adaptation'],
    status: 'Active',
  },
  {
    id: 'scarlet-witch',
    name: 'Wanda Maximoff',
    alias: 'Scarlet Witch',
    team: 'Avengers',
    role: 'Mystic',
    universe: 'Earth-616',
    firstAppearance: 'X-Men #4',
    biography:
      'A reality-bending sorceress whose chaos magic can reshape the battlefield and the rules around it.',
    imageUrl:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
    powers: ['Chaos magic', 'Telekinesis', 'Reality manipulation'],
    status: 'Active',
  },
  {
    id: 'vision',
    name: 'Vision',
    alias: 'Vision',
    team: 'Avengers',
    role: 'Synthetic ally',
    universe: 'Earth-616',
    firstAppearance: 'Avengers #57',
    biography:
      'An android with logic, empathy, and density control that makes him a uniquely precise defender.',
    imageUrl:
      'https://images.unsplash.com/photo-1545239351-86c9bf1f5f45?auto=format&fit=crop&w=900&q=80',
    powers: ['Density manipulation', 'Solar beam', 'Synthetic cognition'],
    status: 'Inactive',
  },
  {
    id: 'wolverine',
    name: 'Logan',
    alias: 'Wolverine',
    team: 'X-Men',
    role: 'Lone wolf',
    universe: 'Earth-616',
    firstAppearance: 'The Incredible Hulk #180',
    biography:
      'A relentless mutant with adamantium claws and a habit of surviving impossible odds.',
    imageUrl:
      'https://images.unsplash.com/photo-1517202383675-eb0a6e27775f?auto=format&fit=crop&w=900&q=80',
    powers: ['Regeneration', 'Adamantium claws', 'Enhanced senses'],
    status: 'Inactive',
  },
];
