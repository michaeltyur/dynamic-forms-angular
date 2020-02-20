
export interface Control {
    id: number;
    orderNumber:number;
    label: ControlLabel;
    controlType: string;
    controlStyle: ControlStyle;
    dataSource: DataSource;
    validatorConfig: ValidatorConfig;
    parameters: Parameters;
    inputType:string;
    bindingData:any;
}

export interface FormControlObject {
    report: Report;
    relationshipsList:Relationship[];
}

export interface Report {
    id: number;
    title: string;
    rdl: string;
    controls: Control[];
    relationshipsList: Relationship[];
}

export interface ControlBasic extends Control {

}

export interface nputeControl extends ControlBasic {
}

export interface SelectControl extends ControlBasic {
}

export interface DatePickerControl extends ControlBasic {
    bindingData:Date;
}


export interface ControlStyle {
    htmlClass: string;
    fontColor: string;
    backgroundColor: string;
    width:string;
    height:string;
    containerBorderStyle:string;
    containerWidth:string;
}

export interface ControlLabel {
    labelName: string;
    forControl: string;
}

export interface DataSource {
    id: string;
    singleData:any;
    data: any[];
}

export interface Parameters {
    id: string;
    paramDictionary: { [key: string]: string };
}

export interface Content {
    dataSource: string;
    displayColumn: string;
    orderColumn: string;
    table: string;
}

export interface ValidatorConfig {
    compareTo: string;
    restriction: string;
    isRequired: boolean;
    isNeedValidation: boolean;
    params: { [key: string]: string };
}

export interface Relationship
{
    ControlID: number;
    FKControlID: number;
    FKValuesIDs: RelationshipValue[];
}
export interface RelationshipValue
{
    ControlValueID: number;
    FKControlValueID: number;
}
