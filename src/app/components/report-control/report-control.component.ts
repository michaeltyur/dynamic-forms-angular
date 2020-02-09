import { Component, OnInit, Input } from '@angular/core';
import { IControl, IControlLabel, IControlStyle, IDataSource, IValidatorConfig, IParameters } from 'src/app/shared/models/controls-interfaces';

@Component({
  selector: 'app-report-control',
  templateUrl: './report-control.component.html',
  styleUrls: ['./report-control.component.scss']
})
export class ReportControlComponent implements OnInit {

  @Input() control: IControl;

  controlLabel: IControlLabel;
  controlStyle: IControlStyle;
  dataSource: IDataSource;
  validatorConfig: IValidatorConfig;
  parameters: IParameters;

  constructor() { }

  ngOnInit() {
    if (this.control) {
      this.control = <IControl>this.control;
      this.controlLabel = <IControlLabel>this.control.label;
      this.controlStyle = <IControlStyle>this.control.controlStyle;
      this.dataSource = <IDataSource>this.control.dataSource;
      this.validatorConfig = <IValidatorConfig>this.control.validatorConfig;
      this.parameters = <IParameters>this.control.parameters;
    }
  }

}