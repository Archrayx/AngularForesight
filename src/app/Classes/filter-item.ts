import { FormControl, FormGroup } from '@angular/forms';


export interface FilterItem {
    key : string;
    header: string;
    search : string;
    filterOptions : number[];
    form : FormControl;
    RangeForm : FormGroup;
    Colors? : Array<{}>[4];
    hide: FormControl;
}
