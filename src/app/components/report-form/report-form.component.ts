import { Component, OnInit, Input } from '@angular/core';
import { Report, Control, Relationship, SelectesFilteredData } from 'src/app/shared/models/controls-interfaces';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { SelectService } from 'src/app/shared/services/select.service';
import { SelectEmitObject } from 'src/app/shared/models/selectEmitObject';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  @Input() report: Report;
  formBuilder: FormBuilder;
  form: FormGroup;
  controls: Control[];
  relationShipsList: Relationship[];
  selectDataArray: SelectesFilteredData[] = [];

  constructor(
    private fb: FormBuilder,
    private nbToastrService: NbToastrService,
    private selectService: SelectService) {
    this.formBuilder = fb;
  }
  ngOnInit() {
    if (this.report) {
      this.form = this.formBuilder.group(this.getFormFromServerData(this.report));
      this.relationShipsList = this.report.relationshipsList;

      // Data for selects
      this.report.controls.forEach(element => {
        if (element.controlType === ControlType.select) {
          let item = new SelectesFilteredData();
          item.controlID = element.id;
          item.data = element.dataSource.data;
          this.selectDataArray.push(item);
        }
      });
    }
    this.selectService.setRelationShipsEmmitter$.subscribe(res => {
      if (res) {
        this.setSelectRelationShips(res);
      }
    });
  }

  getFormFromServerData(report: Report): FormGroup {

    this.controls = report.controls;
    let group: any = {};

    this.controls.forEach(element => {
      group[element.id] = element.validatorConfig.isRequired
        ? new FormControl(element.dataSource.singleData || '', Validators.required)
        : new FormControl(element.dataSource.singleData || '')
    });
    return group;

  }

  onSubmit(): void {
    this.controls;
    this.form;

    if (this.isDateValid()) {
      this.nbToastrService.success("", "Form is valid!!!");
    }
  }

  setSelectRelationShips(data: SelectEmitObject): void {

    // pressed control
    let control: Control = this.controls.filter(element => ControlType.select && +element.id === data.controlID)[0];

    let relationShipsData: Relationship[] = this.relationShipsList.filter(el => +el.controlID === +data.controlID);
    //let targetControls: Control[] = [];

    relationShipsData.forEach(relationShipsDataElement => {

      let mainControlID = relationShipsDataElement.controlID;
      let mainControlValueID = +data.value[0];
      let targetControl = this.controls.filter(el => el.id === relationShipsDataElement.fkControlID)[0];
      if (targetControl) {

        let targetControlNewValues = [];

        let fkValuesIDsFiltered = relationShipsDataElement.fkValuesIDs.filter(el => +el.controlValueID === mainControlValueID);

        if (fkValuesIDsFiltered.length) {

          fkValuesIDsFiltered.forEach(fkValuesIDsElement => {
            targetControlNewValues.push(targetControl.dataSource.data[fkValuesIDsElement.fkControlValueID]);
          });

          this.selectService.selectDataFilterEmitter$.emit({ controlID: targetControl.id, data: targetControlNewValues });

        }
        else{
          this.selectService.selectDataResetEmitter$.emit(true);
        }

      }
    })

  }


  isDateValid(): boolean {
    let result = true;
    this.controls.forEach(element => {
      if (element.controlType === ControlType.datepicker) {
        let validParams = element.validatorConfig.params;
        if (validParams["from"] && validParams["to"]) {

          let fromData = this.controls.filter(el => el.id === +validParams["from"])[0].bindingData;
          let toData = this.controls.filter(el => el.id === +validParams["to"])[0].bindingData;
          if (!fromData) {
            this.nbToastrService.warning("", "Must set date from!!!");

            result = false;
            return;
          }
          if (!toData) {
            this.nbToastrService.warning("", "Must set date to!!!");
            result = false;
            return;
          }
          let from = new Date(fromData.year, fromData.month, fromData.day);
          let to = new Date(toData.year, toData.month, toData.day);
          if (from > to) {
            this.nbToastrService.danger("", "Date To must be bigger than Date From");
            result = false;
            return;
          }

        }
      }
    });
    return result;
  }

}
export enum InputType {
  submit = "submit",
  button = "button",
  checkbox = "checkbox",
  date = "data",
  email = "email",
  file = "file",
  number = "number",
  password = "password",
  text = "text",
  time = "time"
}
export enum ControlType {
  select = "select",
  datepicker = "datepicker",
  input = "input"
}