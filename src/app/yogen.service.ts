import { Injectable } from '@angular/core';
import { argument } from './argument';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YogenService {
  url = 'http://localhost:3000/technology';

 
constructor(private http: HttpClient) { }

  async getAllTechnologies(): Promise<string []> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
    
}


async getAllTechnologyGenarators(technology : string): Promise<string []> {
  const data = await fetch('http://localhost:3000/getAllGenerators/' + technology);
  return (await data.json()) ?? [];
}

async getArguments(generator : string): Promise<argument[]> {
  const data = await fetch('http://localhost:3000/getGeneratorByName/' + generator);
  return (await data.json()) ?? [];
}

 downloadFile(data: any, url: string): Observable<Blob> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Add any other headers as needed
  });

  // Make a POST request and set responseType to 'blob'
  return this.http.post<Blob>(`${url}`, data, {
    headers: headers,
    responseType: 'blob' as 'json',
  });
}

}
