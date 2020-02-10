import { Component } from '@angular/core';
import { FormsService } from './shared/services/forms.service';
import { IReport, IContent, IControlBasic, IDataSource, IParameters, InputeControl, IControlLabel, IControl, IControlStyle, IFormControlObject, ISelectControl, IValidatorConfig } from './shared/models/controls-interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  report: IReport;
  controlsLoader: boolean;
  title = 'dynamic-forms';
  reportNumber: number = 0;
  error: string;
  constructor(
    private formsService: FormsService
  ) {
    this.reportNumber = 1;
    this.getForms();
  }

  getForms(): void {
    if (!this.reportNumber) {
      this.error = "Please select report id";
      return;
    }
    else {
      this.error = null;
    }
    this.reportNumber
    this.controlsLoader = true;
    let data = this.reportNumber;
    this.formsService.getForms(data).subscribe(res => {
      if (res) {
        try {
          this.report = <IReport>res["report"];
          this.title =this.report.title;
          console.log(res);
        } catch (error) {
          debugger;
        }

      }
      this.controlsLoader = false;
    }, error => {
      this.controlsLoader = false;
    });
  }
}
