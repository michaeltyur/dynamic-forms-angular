
export interface IControl {
    Id: number;
    Label: IControlLabel;
    Type: string;
    ControlStyle: IControlStyle;
    DataSource: IDataSource;
    ValidatorConfig: IValidatorConfig;
    Parameters: IParameters;
}

export interface IFormControlObject {
    Report: IReport;
}

export interface IReport {
    Id: number;
    Title: string;
    RDL: string;
    Controls: IControl[];
}

export interface IControlBasic extends IControl {

    Id: number;
    Type: string;
    ControlStyle: IControlStyle;
    DataSource: IDataSource;
    ValidatorConfig: IValidatorConfig;
    Parameters: IParameters;
    Label: IControlLabel;
    ControlType: string;
}

export interface InputeControl extends IControlBasic {
    InputType: string;
}

export interface ISelectControl extends IControlBasic {

}
export interface ICheckBoxControl extends IControlBasic {

}

export interface IControlStyle {
    HtmlClass: string;
    FontColor: string;
    BackgroundColor: string;
}

export interface IControlLabel {
    Label: string;
    For: string;
}

export interface IDataSource {
    Id: string;
    Data: any[];
}

export interface IParameters {
    Id: string;
    ParamDictionary: { [key: string]: string };
}

export interface IContent {
    DataSource: string;
    displayColumn: string;
    orderColumn: string;
    table: string;
}

export interface IValidatorConfig {
    CompareTo: string;
    Restriction: string;

    IsRequired: boolean;
}


