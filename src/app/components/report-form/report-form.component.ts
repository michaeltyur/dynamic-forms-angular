import { Component, OnInit, Input } from '@angular/core';
import { IReport, IControl } from 'src/app/shared/models/controls-interfaces';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  @Input() report: IReport;
  formBuilder:FormBuilder;
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.formBuilder = fb;
  }
    ngOnInit() {
      if(this.report){
        this.form = this.formBuilder.group(this.getFormFromServerData(this.report));
       // this.form = this.getFormFromServerData(this.report);
      }
     }

  getFormFromServerData(report: IReport):FormGroup{
    let controls:IControl[] = report.controls;
    let group: any = {};

    controls.forEach(element => {
      group[element.id] = element.validatorConfig.isRequired 
      ? new FormControl (element.dataSource.singleData||'',Validators.required)
      : new FormControl (element.dataSource.singleData||'')
    });

    return group ;
 }

 onSubmit():void{
   
 }

}
