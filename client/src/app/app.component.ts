import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';
import { PublicationService } from './services/publication.service';
import { Body } from '@angular/http/src/body';
import { from } from 'rxjs/observable/from';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, PublicationService]

})
export class AppComponent implements OnInit, DoCheck{
  public title:string;
  public identity;
  public url: string;
  public publication;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  	private _userService:UserService,
  	private _publicationService:PublicationService

  ){
  	this.title = 'TUCAN-G';
    this.url = GLOBAL.url;
  }

  //obtiene usuario
  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  }

  //setea this.identity
  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }

  //cerrar sesion
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }
//Funcion para buscar publicacion por titulo
//   onSubmit(busqueda) {
//     this._publicationService.getFilterPublications(busqueda).subscribe(
//       response => { 
//         console.log(response);
//         if (this.publication) {
//           this.status = 'success';
//         } else {
//           this.status = 'error';
//         }
//       },
//       error => {
//         console.log( < any > error);
//       }
//     );
//   }
// }
}


