import { Monster } from './monster.model';

const JsonMonsters = [
  {
    id: 3,
    name: 'Venusaur',
    description: 'Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
    attack: 82,
    defense: 83,
    healthPoints: 80,
    speed: 80
    },
  {
    id: 6,
    name: 'Charizard',
    description: 'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.',
    attack: 84,
    defense: 78,
    healthPoints: 78,
    speed: 100
 }
];
export const MONSTERS: Monster[] = JsonMonsters.map(Monster.fromJSON);