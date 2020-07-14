import { IRegister } from 'src/modules/auth/models/IRegister';
import { ILogin } from '../modules/auth/models/ILogin';

export namespace KoudouActions {
    export class Loading {
        static readonly type = '[Store] Loading';
    }
    export class StopLoading {
        static readonly type = '[Store] Stop loading';
    }
    export class Login {
        static readonly type = '[LoginView] Login';
        constructor(public login: ILogin) {}
    }
    export class Register {
        static readonly type = '[LoginView] Register';
        constructor(public register: IRegister) {}
    }
    export class Logout {
        static readonly type = '[Sidebar] Logout';
    }
    export class ToggleDarkMode {
        static readonly type = '[Sidebar] Toggle dark mode';
    }
    export class LoadSectionOptions {
        static readonly type = '[App] Load section options';
    }
}
