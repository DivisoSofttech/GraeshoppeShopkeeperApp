import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings-option',
  templateUrl: './settings-option.component.html',
  styleUrls: ['./settings-option.component.scss'],
})
export class SettingsOptionComponent implements OnInit {

  constructor() { }
  @Input()
  option: any;

  ngOnInit() {}

}
