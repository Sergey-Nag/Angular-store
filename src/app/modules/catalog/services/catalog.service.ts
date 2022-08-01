import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ENDPOINTS } from "@shared/constants/Api.constant";
import { Book } from "@shared/models/book.model";

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    constructor(private http: HttpClient) {}

    getBooks() {
        return this.http.get<Book[]>(API_ENDPOINTS.Books);
    }
}