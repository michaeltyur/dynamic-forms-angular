import { Component, OnInit } from '@angular/core';
import { FormsService } from './shared/services/forms.service';
import { Report, Content, ControlBasic, DataSource, Parameters, nputeControl, ControlLabel, Control, ControlStyle, FormControlObject, SelectControl, ValidatorConfig } from './shared/models/controls-interfaces';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  report: Report;
  controlsLoader: boolean;
  title = 'dynamic-forms';
  reportsTitles: string[] = []
  reportTitle: string;
  reportID;
  error: string;
  currentTheme = "cosmic";
  constructor(
    private formsService: FormsService,
    private themeService: NbThemeService
  ) {
    //this.getForms();
  }
  ngOnInit() {
    this.setTheme();
    this.getReportsTitles();
  }

  setTheme():void{
    this.themeService.changeTheme(this.currentTheme.toLowerCase());
  }

  getReportsTitles(): void {
    this.formsService.getReportsTitles().subscribe((res: string[]) => {
      if (res) {
        this.reportsTitles = res;
        this.reportID = 4;
       // this.reportID = this.reportsTitles[0];
        this.getForms();
      }
    })
  }

  getForms(): void {
    if (!this.reportID) {
      this.error = "Please select report";
      return;
    }
    else {
      this.error = null;
    }
    this.controlsLoader = true;
    let data = this.reportID;

    this.formsService.getForms(data).subscribe(res => {
      if (res) {
        try {
          res["report"].controls = this.sortArrayBy(res["report"].controls);
          this.report = <Report>res["report"];
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

  sortArrayBy(array: Control[]): Array<Control> {
    let resultArray: Control[] = [];
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

  testDates():void{

  }

}
