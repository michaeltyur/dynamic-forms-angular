import { Component, OnInit } from '@angular/core';
import { FormsService } from './shared/services/forms.service';
import { IReport, IContent, IControlBasic, IDataSource, IParameters, InputeControl, IControlLabel, IControl, IControlStyle, IFormControlObject, ISelectControl, IValidatorConfig } from './shared/models/controls-interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  report: IReport;
  controlsLoader: boolean;
  title = 'dynamic-forms';
  reportsTitles: string[] = []
  reportTitle: string;
  error: string;
  constructor(
    private formsService: FormsService
  ) {
    //this.getForms();
  }
  ngOnInit() {
    this.getReportsTitles();
  }

  getReportsTitles(): void {
    this.formsService.getReportsTitles().subscribe((res: string[]) => {
      if (res) {
        this.reportsTitles = res;
        this.reportTitle = this.reportsTitles[0];
        this.getForms();
      }
    })
  }

  getForms(): void {
    if (!this.reportTitle) {
      this.error = "Please select report";
      return;
    }
    else {
      this.error = null;
    }
    this.controlsLoader = true;
    let data = this.reportTitle;
    this.formsService.getForms(data).subscribe(res => {
      if (res) {
        try {
          res["report"].controls = this.sortArrayBy(res["report"].controls);
          this.report = <IReport>res["report"];
          this.title = this.report.title;
          console.log(res);
        } catch (error) {
          console.error(error);
          debugger;
        }

      }
      this.controlsLoader = false;
    }, error => {
      this.controlsLoader = false;
    });
  }

  sortArrayBy(array: IControl[]): Array<IControl> {
    let resultArray: IControl[] = [];
    let minOrderNumber = Number.MAX_VALUE;
    let currentIndex = 0;
    while (array.length) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (+element.orderNumber < minOrderNumber) {
          minOrderNumber = element.orderNumber;
          currentIndex = index;
        }
      }

      resultArray.push(array[currentIndex]);
      array = array.filter(el => +el.orderNumber !== minOrderNumber);
      minOrderNumber = Number.MAX_VALUE;
    }
    return resultArray;
  }

}
