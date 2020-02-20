import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Control, ControlLabel, ControlStyle, DataSource, ValidatorConfig, Parameters, Relationship } from 'src/app/shared/models/controls-interfaces';
import { FormGroup } from '@angular/forms';
import { SelectService } from 'src/app/shared/services/select.service';
import { SelectEmitObject } from 'src/app/shared/models/selectEmitObject';

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
  selectSelected: number = 0;

  constructor(private selectService: SelectService) { }

  ngOnInit() {
    if (this.control) {
      this.control = <Control>this.control;
      this.controlLabel = <ControlLabel>this.control.label;
      this.controlStyle = <ControlStyle>this.control.controlStyle;
      this.dataSource = <DataSource>this.control.dataSource;
      this.validatorConfig = <ValidatorConfig>this.control.validatorConfig;
      this.parameters = <Parameters>this.control.parameters;
      //this.selectData = this.control.dataSource.data;
      
      // Emitters
      this.selectService.selectDataResetEmitter$.subscribe(()=>this.selectDataReset());
      this.selectService.selectDataFilterEmitter$.subscribe((data)=>this.selectDataFilter(data));
    }
  }

  setRelationShips(): void {
    let data = new SelectEmitObject(this.control.id, this.selectSelected);
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
