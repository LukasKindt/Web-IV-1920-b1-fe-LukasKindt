import { Pipe, PipeTransform } from '@angular/core';
import { Monster } from './monster/monster.model';

@Pipe({
  name: 'monsterFilter',
  pure: false
})
export class MonsterFilterPipe implements PipeTransform {

  transform(monsters: Monster[], name: String): Monster[] {
    if (!name || name.length === 0) {
      return monsters;
    }
    return monsters.filter(rec =>
      rec.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }

}
