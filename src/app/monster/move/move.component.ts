import { Component, OnInit, Input } from '@angular/core';
import { Move } from '../move.model';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {
  @Input() move: Move;

  constructor() { }

  ngOnInit(): void {
  }

}
