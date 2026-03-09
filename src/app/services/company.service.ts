import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private apiUrl = 'http://localhost:3000/companies';

    constructor(private http: HttpClient) { }

    getCompanyById(id: number): Observable<Company> {
        return this.http.get<Company>(`${this.apiUrl}/${id}`);
    }

    // Mock login: fetch companies and check credentials manually or use filtering
    login(email: string): Observable<Company[]> {
        return this.http.get<Company[]>(`${this.apiUrl}?email=${email}`);
    }

    register(company: Company): Observable<Company> {
        return this.http.post<Company>(this.apiUrl, company);
    }
}
