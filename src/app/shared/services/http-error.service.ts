import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorService {

    constructor() {
    }

    public getMessageError(error: HttpErrorResponse): string {
        switch (error.status) {
            case 0:
                return error.message;
            case 401:
                return 'El token de sesión ha expirado. Vuelva a iniciar sesión.';
            default:
                return error.error;
        }
    }
}
