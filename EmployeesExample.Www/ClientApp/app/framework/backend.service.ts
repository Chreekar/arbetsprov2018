import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Wrappar anrop till ServiceStack, alla anrop till backend ska göras via denna klass
 */
@Injectable()
export class BackendService
{
    private apiBaseUrl = '/api';

    constructor(private http: HttpClient)
    {
    }

    /**
     * Gör ett GET-anrop till en ServceStack-api-metod
     * @param partialRoute Exempelvis /projects/1
     * @param mapper Valfri metod som transformerar det deserialiserade svaret
     */
    get<T>(partialRoute: string, mapper?: (data: Object) => T): Observable<T>
    {
        return this.http.get(this.apiBaseUrl + partialRoute)
            .map(response => mapper ? mapper(response) : <T>response)
            .catch(error => this.handleError(error));
    }

    /**
     * Gör ett POST-anrop till en ServceStack-api-metod
     * @param partialRoute Exempelvis /projects
     * @param body Ett objekt med de parametrar som ska postas
     * @param mapper Valfri metod som transformerar det deserialiserade svaret
     */
    post<T>(partialRoute: string, body: any, mapper?: (data: any) => T): Observable<T>
    {
        return this.http.post(this.apiBaseUrl + partialRoute, body)
            .map(response => mapper ? mapper(response) : <T>response)
            .catch(error => this.handleError(error));
    }

    /**
     * Gör ett PUT-anrop till en ServceStack-api-metod
     * @param partialRoute Exempelvis /projects
     * @param body Ett objekt med de parametrar som ska postas
     * @param mapper Valfri metod som transformerar det deserialiserade svaret
     */
    put<T>(partialRoute: string, body: any, mapper?: (data: any) => T): Observable<T>
    {
        return this.http.put(this.apiBaseUrl + partialRoute, body)
            .map(response => mapper ? mapper(response) : <T>response)
            .catch(error => this.handleError(error));
    }

    /**
     * Gör ett DELETE-anrop till en ServceStack-api-metod
     * @param partialRoute Exempelvis /projects/1
     * @param mapper Valfri metod som transformerar det deserialiserade svaret
     */
    delete<T>(partialRoute: string, mapper?: (data: any) => T): Observable<T>
    {
        return this.http.delete(this.apiBaseUrl + partialRoute)
            .map(response => mapper ? mapper(response) : <T>response)
            .catch(error => this.handleError(error));
    }

    /**
     * Felhanterare vid anrop till en ServiceStack-api-metod 
     */
    private handleError(errorResponse: any)
    {
        let httpError: HttpResponseStatus;

        if (errorResponse instanceof HttpErrorResponse)
        {
            try
            {
                //Om ServiceStack har skickat med ett ResponseStatus-objekt
                httpError = {
                    ...errorResponse.error.responseStatus,
                    httpStatusCode: errorResponse.status,
                    httpStatusText: errorResponse.statusText
                };
            }
            catch (e)
            {
                //Om det inte finns något innehåll utan bara headers
                httpError = {
                    message: errorResponse.statusText,
                    httpStatusCode: errorResponse.status,
                    httpStatusText: errorResponse.statusText || 'Unknown error'
                };
            }
        }
        else
        {
            httpError = {
                message: 'Unknown error'
            };
        }

        return Observable.throw(httpError);
    }
}

interface ResponseError
{
    errorCode?: string;

    fieldName?: string;

    message?: string;

    meta?: { [index: string]: string; };
}

interface ResponseStatus
{
    errorCode?: string;

    /**
     * Felmeddelandet som ska skrivas ut i gränssnittet
     */
    message?: string;

    stackTrace?: string;

    errors?: ResponseError[];

    meta?: { [index: string]: string; };
}

/**
 * Felmeddelande från ServiceStack eller nätverket
 */
export interface HttpResponseStatus extends ResponseStatus
{
    httpStatusCode?: number;

    httpStatusText?: string;
}