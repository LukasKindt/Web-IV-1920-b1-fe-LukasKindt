import { Component, OnInit } from '@angular/core';
import { MonsterDataService } from '../monster-data.service';
import { Monster } from '../monster.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.css']
})
export class MonsterDetailComponent implements OnInit {
  public monster: Monster;

  constructor(
    private route: ActivatedRoute,
    private monsterDataService: MonsterDataService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => (this.monster = item['monster']));
  }

}
