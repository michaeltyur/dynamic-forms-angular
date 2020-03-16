import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Control, ControlLabel, ControlStyle, DataSource, ValidatorConfig, Parameters, Relationship } from 'src/app/shared/models/controls-interfaces';
import { FormGroup } from '@angular/forms';
import { SelectService } from 'src/app/shared/services/select.service';
import { SelectEmitObject } from 'src/app/shared/models/selectEmitObject';
import { ControlType } from '../report-form/report-form.component';

@Component({
  selector: 'app-report-control',
  templateUrl: './report-control.component.html',
  styleUrls: ['./report-control.component.scss']
})
export class ReportControlComponent implements OnInit {

  @Input() control: Control;
  @Input() form: FormGroup;

  controlLabel: ControlLabel;
  controlStyle: ControlStyle;
  dataSource: DataSource;
  validatorConfig: ValidatorConfig;
  parameters: Parameters;
  orderNumber: number;
  relationships: Relationship[];
  selectData: any[];
  selectSelectedArray: number[] = [];

  constructor(private selectService: SelectService) { }

  ngOnInit() {
    if (this.control) {
      this.control = <Control>this.control;
      this.controlLabel = <ControlLabel>this.control.label;
      this.controlStyle = <ControlStyle>this.control.controlStyle;
      this.dataSource = <DataSource>this.control.dataSource;
      this.validatorConfig = <ValidatorConfig>this.control.validatorConfig;
      this.parameters = <Parameters>this.control.parameters;
      this.selectData = this.control.dataSource.data;

      if (this.control.controlType === ControlType.select) {
        this.selectSelectedArray[0] = 0;
      }

      // Emitters
      this.selectService.selectDataResetEmitter$.subscribe(() => this.selectDataReset());
      this.selectService.selectDataFilterEmitter$.subscribe((res) => {
        //this.selectDataFilter(res);
        if (+res.controlID === +this.control.id) {
          this.selectData = res.data;
        }
      });
    }
  }

  setRelationShips(): void {
    let data = new SelectEmitObject(this.control.id, this.selectSelectedArray);
    this.selectService.setRelationShipsEmmitter$.emit(data);
  }

  selectDataReset(): void {
    this.selectData = this.control.dataSource.data;
  }

  selectDataFilter(indexs: number[]): void {
    if (indexs) {
      this.selectData = [];
      indexs.forEach(element => {
        this.selectData.push(this.control.dataSource.data[element]);
      });
    }
  }

}
