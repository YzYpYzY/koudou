import { AbstractControl } from '@angular/forms';

export function Password(control: AbstractControl) {
    if (
        control.value &&
        !control.value.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
    ) {
        return { password: true };
    } else {
        return null;
    }
}
