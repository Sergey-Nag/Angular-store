import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book } from "src/app/shared/book.model";

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    constructor(private http: HttpClient) {}

    getBooks() {
        return this.http.get<Book[]>('https://js-band-store-api.glitch.me/books');
    }
}