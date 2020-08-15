import { FormGroup, AbstractControl } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatchPassword(control: AbstractControl) {
    const formGroup = control.parent as FormGroup;
    if (!formGroup || !formGroup.controls) {
        return null;
    }
    const matchingControl = formGroup.controls['password'];

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
        return { mustMatchPassword: true };
    } else {
        return null;
    }
}
