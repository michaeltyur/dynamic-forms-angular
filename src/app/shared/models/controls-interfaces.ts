
export interface IControl {
    id: number;
    orderNumber:number;
    label: IControlLabel;
    controlType: string;
    controlStyle: IControlStyle;
    dataSource: IDataSource;
    validatorConfig: IValidatorConfig;
    parameters: IParameters;
    inputeType:string;
}

export interface IFormControlObject {
    report: IReport;
}

export interface IReport {
    id: number;
    title: string;
    rdl: string;
    controls: IControl[];
}

export interface IControlBasic extends IControl {

}

export interface InputeControl extends IControlBasic {
}

export interface ISelectControl extends IControlBasic {
}

export interface IControlStyle {
    htmlClass: string;
    fontColor: string;
    backgroundColor: string;
    width:string;
    height:string;
    containerBorderStyle:string;
    containerWidth:string;
}

export interface IControlLabel {
    labelName: string;
    forControl: string;
}

export interface IDataSource {
    id: string;
    singleData:any;
    data: any[];
}

export interface IParameters {
    id: string;
    paramDictionary: { [key: string]: string };
}

export interface IContent {
    dataSource: string;
    displayColumn: string;
    orderColumn: string;
    table: string;
}

export interface IValidatorConfig {
    compareTo: string;
    restriction: string;
    isRequired: boolean;
    isNeedValidation: boolean;
}


