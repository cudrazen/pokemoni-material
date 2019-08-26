import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NameUrl, PokemonResponse, PokemonDetailsResponse } from './data/pokemons';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + limit );
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<PokemonDetailsResponse>(url);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get<PokemonDetailsResponse>('https://pokeapi.co/api/v2/pokemon/' + name);
  }

  getType(name: string): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/type/' + name);
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
