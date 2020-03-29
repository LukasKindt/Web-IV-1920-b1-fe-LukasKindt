import { Component, OnInit, Input } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { Monster } from './monster.model';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {
  @Input() public monster: Monster;

  constructor() {}

  ngOnInit(): void {
  }

}
