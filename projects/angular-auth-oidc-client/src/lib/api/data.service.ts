import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable()
export class DataService {
    constructor(private httpClient: HttpBaseService) {}

    get<T>(url: string, token?: string): Observable<T> {
        const headers = this.prepareHeaders(token);

        return this.httpClient.get<T>(url, {
            headers,
        });
    }

    post<T>(url: string, body: any, token?: string, headers?: HttpHeaders) {
        const headersToSend = headers || this.prepareHeaders(token);

        return this.httpClient.post<T>(url, body, {
            headersToSend,
        });
    }

    private prepareHeaders(token?: string) {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');

        if (!!token) {
            headers = headers.set('Authorization', 'Bearer ' + decodeURIComponent(token));
        }

        return headers;
    }
}
