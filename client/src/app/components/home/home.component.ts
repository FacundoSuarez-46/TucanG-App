import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';


@Component({
	selector: 'home',
 	styleUrls: ['./home.component.css'],
 	templateUrl: './home.component.html',
	providers: [UserService, PublicationService]
})
export class HomeComponent implements OnInit{
	public title: string;
	public identity;
	public token;
	public url: string;
	public status: string;
	public page;
	public total;
	public pages;
	public itemsPerPage;
	public publications: Publication[];
	public showImage;
	public publication;
	public res;
	// getAllPublications: any;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _publicationService: PublicationService
	){
		this.title = 'Encuentra aqui Tucan-G';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.page = 1;
	}

	ngOnInit(){
		console.log('home.component cargado correctamente!!');
		this.getAllPublications(this.page);
	}
	public noMore = false;
	viewMore(){
		this.page += 1;

		if(this.page == this.pages){
			this.noMore = true;
		}

		this.getAllPublications(this.page, true);
	}

	refresh(event = null){
		this.getAllPublications(1);
	}

	showThisImage(id){
		this.showImage = id;
	}

	hideThisImage(id){
		this.showImage = 0;
	}

	deletePublication(id){
		this._publicationService.deletePublication(this.token, id).subscribe(
			response => {
				this.refresh();
			},
			error => {
				console.log(<any>error);
			}
		);
	}
	getAllPublications(page, adding = false){
		this._publicationService.getAllPublications(this.token, page).subscribe(
			response => {
				if(response.publications){
					this.total = response.total_items;
					this.pages = response.pages;
					this.itemsPerPage = response.items_per_page;

					if(!adding){
						this.publications = response.publications;
					}else{
						var arrayA = this.publications;
						var arrayB = response.publications;
						this.publications = arrayA.concat(arrayB);

						$("html, body").animate({ scrollTop: $('body').prop("scrollHeight")}, 500);
					}

					if(page > this.pages){
						//this._router.navigate(['/home']);
					}
				}else{
					this.status = 'error';
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
	}
	onSubmit(busqueda) {
		this._publicationService.getFilterPublications(busqueda).subscribe(
		  response => { 
			console.log(response);
			if (response.publications) {
			  this.status = 'success';
			  this.publications = response.publications;
			}else {
			  this.status = 'error';
			}
		  },
		  error => {
			console.log( < any > error);
		  }
		);
	  }
}

