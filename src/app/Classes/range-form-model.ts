import { FormControl, FormGroup } from "@angular/forms";

export class RangeFormModel {
    private Min: FormControl;
    private Max: FormControl;
    private rangeForm : FormGroup = new FormGroup({});
    /**
     *
     */
    constructor() {
        this.Min = new FormControl(-10000)
        this.Max = new FormControl(10000)
        this.rangeForm.setControl("Min", this.Min);
        this.rangeForm.setControl("Max", this.Max)
    }

    public RangeForm() : FormGroup{
        return this.rangeForm
    }
}
