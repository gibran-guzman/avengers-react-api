import { describe, expect, it } from 'vitest';
import { mapAvengerDtoToAvenger } from './avengerMapper';

describe('mapAvengerDtoToAvenger', () => {
  it('fills fallback values for missing fields', () => {
    const avenger = mapAvengerDtoToAvenger({ id: '1', name: 'Peter Parker' });

    expect(avenger.alias).toBe('Peter Parker');
    expect(avenger.team).toBe('Solo');
    expect(avenger.role).toBe('Unknown role');
    expect(avenger.imageUrl).toBe('');
  });
});
