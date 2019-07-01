import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss']
})
export class ButtonLoadingComponent implements OnInit {
  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

}
