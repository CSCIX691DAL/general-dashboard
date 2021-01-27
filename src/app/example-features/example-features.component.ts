import { Component, OnInit } from '@angular/core';
import {Feature} from './Feature';
import {Cats} from './Feature';

@Component({
  selector: 'app-example-features',
  templateUrl: './example-features.component.html',
  styleUrls: ['./example-features.component.css']
})
export class ExampleFeaturesComponent implements OnInit {
  features: Feature[] = Cats;
  constructor() { }

  ngOnInit(): void {
  }

}
