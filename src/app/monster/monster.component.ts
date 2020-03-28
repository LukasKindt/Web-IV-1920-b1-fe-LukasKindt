import { Component, OnInit } from '@angular/core';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {
  id: number;
  name: string;
  description: string;
  attack: number;
  defense: number;
  healthPoints: number;
  speed: number;
  moves: string[];

  constructor() {
    this.id = 3;
    this.name = "Venusaur";
    this.description = "Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.";
    this.attack = 82;
    this.defense = 83;
    this.healthPoints = 80;
    this.speed = 80;
    this.moves = ['Petal Blizzard', 'Petal Dance', 'Tackle', 'Growl'];
  }

  ngOnInit(): void {
  }

}
