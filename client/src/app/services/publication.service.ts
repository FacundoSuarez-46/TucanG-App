import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Publication } from '../models/publication';
import { Body } from '@angular/http/src/body';
import { format } from 'url';

@Injectable()
export class PublicationService{
	public url: string;

	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	//crear publicacion
	addPublication(token, publication):Observable<any>{
		let params = JSON.stringify(publication);
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);

	   return this._http.post(this.url+'publication', params, {headers: headers});
	}

	//obtener publicaciones de seguidos
	getPublications(token, page = 1):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);

		return this._http.get(this.url+'publications/'+page, {headers: headers});
	}

	//obtener todas las publicaciones para seccion home
	getAllPublications(token, page = 1):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);

		return this._http.get(this.url+'allpub/'+page, {headers: headers});
	}

	//obtener publicaciones por parametro body.word
	getFilterPublications(word: string): Observable <any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		//Enviamos el body
		return this._http.post(this.url + 'filterpub/', {word}, {headers: headers});
	  }


	//lista las publicaciones de un usuario
	getPublicationsUser(token, user_id, page = 1):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);

		return this._http.get(this.url+'publications-user/'+user_id+'/'+page, {headers: headers});
	}

	//elimina publicacion de usuario registrado
	deletePublication(token, id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',token);

		return this._http.delete(this.url + 'publication/' + id, {headers: headers});
	}
}