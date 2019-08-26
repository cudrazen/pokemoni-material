import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NameUrl, PokemonDetailsResponse, Pokemons } from '../data/pokemons';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'version1',
  templateUrl: './version1.component.html',
  styleUrls: ['./version1.component.css']
})



export class Version1Component implements OnInit, AfterViewInit{
  title = 'Version 1';

  filterName = new FormControl();
  filterType = new FormControl();
  filterValue: string;
  filterOn: boolean = false;

  errorMessage: string = "";
  
  pokemons: any = [];
  displayedColumns: string[] = ['name', 'types', 'heightWeight', 'abilities', 'base_experience'];
  public dataSource : MatTableDataSource<Pokemons>;
  view: Pokemons[] = [];
  count: number = 0;

  pageSize = 10;
  currentPage = 0;
  length: number = 0;

  loading = true;

  // MatPaginator Output
  pageEvent: PageEvent;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getData(this.currentPage * this.pageSize, this.pageSize);
    this.dataSource = new MatTableDataSource();
  }

  
  doFilter(){ // by specific name or type
    this.filterOn = true;
    this.loading = true;
    //if filters are null or empty then reset grid
    if ((isNullOrUndefined(this.filterName.value) || this.filterName.value == "") && (isNullOrUndefined(this.filterType.value) || this.filterType.value == "")) {
      
      this.filterOn = false;
      
      this.currentPage = 0;
      this.pageSize = 10;
      this.view = [];
      this.dataSource = new MatTableDataSource();
      this.getData(this.currentPage * this.pageSize, this.pageSize);
      this.paginator.length = this.dataSource.data.length;
      return;
    } 

    this.view = [];
    this.dataSource = new MatTableDataSource();

    if (!isNullOrUndefined(this.filterName.value) && this.filterName.value !== "") {
      
      this.filterValue = this.filterName.value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.getPokemonByName(this.filterValue);
    } else {
      
      if (!isNullOrUndefined(this.filterType.value) && this.filterType.value !== "") {
        
        this.filterValue = this.filterType.value;
        this.filterValue = this.filterValue.trim(); // Remove whitespace
        this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.getPokemonByType(this.filterValue);
        
      } else
        return;
    }
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.firstPage();

  }
  
  /*
  //with all data
  doFilter(){ 
    this.filterOn = true;
    
    //if filters are null or empty then reset grid
    if ((isNullOrUndefined(this.filterName.value) || this.filterName.value == "") && (isNullOrUndefined(this.filterType.value) || this.filterType.value == "")) {
      
      this.filterOn = false;
      
      this.currentPage = 0;
      this.pageSize = 10;
      this.view = [];
      this.dataSource = new MatTableDataSource();
      this.getData(this.currentPage * this.pageSize, this.pageSize);
      this.paginator.length = this.dataSource.data.length;
      return;
    } 

    //get all result for search without limit
    this.view = [];
    this.dataSource = new MatTableDataSource();
    
    this.getData(0, this.count);

    if (!isNullOrUndefined(this.filterName.value) && this.filterName.value !== "") {
      
      this.filterValue = this.filterName.value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = this.filterValue;

    } else {
      
      if (!isNullOrUndefined(this.filterType.value) && this.filterType.value !== "") {
        
        this.filterValue = this.filterType.value;
        this.filterValue = this.filterValue.trim(); // Remove whitespace
        this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = this.filterValue;
        this.dataSource.filterPredicate = (data, filter) => JSON.stringify(data.types).includes(filter);
        
      } else
        return;
    }
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.firstPage();

  }
  */

  enableDisableInput(){
    if(!isNullOrUndefined(this.filterName.value) && this.filterName.value !== "") {
      this.filterType.disable();
    } else {
      this.filterType.enable();
    }

    if(!isNullOrUndefined(this.filterType.value) && this.filterType.value !== "") {
      this.filterName.disable();
    } else {
      this.filterName.enable();
    }
  }

  ngAfterViewInit() {
    
  }

  public handlePage(e: any) {
    if (!this.filterOn){
      this.loading = true;
      this.currentPage = e.pageIndex;
      this.pageSize = e.pageSize;
      this.view = [];
      this.getData(this.currentPage * this.pageSize, this.pageSize);
    }
  }
  
  getData(offset: number, limit: number){
    
    this.rest.getPokemons(offset, limit).subscribe(response => {
      this.pokemons = response.results;
      this.count = response.count;
      
      this.length = this.count;
      this.paginator.length = this.length;
   
      this.pokemons.forEach(element => {
        this.rest.getPokemonDetails(element.url).subscribe((resp: any) => {
         this.view.push({
            name: resp['name'], 
            types: resp['types'], 
            heightWeight: resp['height'] + " / "+ resp['weight'], 
            abilities: resp['abilities'], 
            base_experience: resp['base_experience']
          });

          this.dataSource.data = this.view;
        });
 
      });
      this.loading = false;
    });
  }

  getPokemonByName(name: string){
    this.errorMessage = "";
    this.rest.getPokemonByName(name).subscribe(response => {
      this.pokemons = response;
      this.count = 1;
      
      this.length = this.count;
      this.paginator.length = this.length;
      this.view.push({
        name: response.name, 
        types: response.types, 
        heightWeight: response.height + " / "+ response.weight, 
        abilities: response.abilities, 
        base_experience: response.base_experience
      });

      this.dataSource.data = this.view;
      this.loading = false
    }
    , error => {
      //in case of error, add the callback to bring the item back and re-throw the error.
        this.loading = false;
        if(error['status'] == 404) {
          this.errorMessage = "No data to show with name: " + this.filterName.value;
        } else {
          this.errorMessage = error['message'];
        }
        throw error;
      }
    );
    ;
  }

  getPokemonByType(type: string){
    this.errorMessage = "";
    this.rest.getType(type).subscribe(response => {
      this.pokemons = response.pokemon;
      this.count = this.pokemons.length;
      
      this.length = this.count;
      this.paginator.length = this.length;
   
      this.pokemons.forEach(element => {
        this.rest.getPokemonDetails(element.pokemon.url).subscribe((resp: any) => {
         this.view.push({
            name: resp['name'], 
            types: resp['types'], 
            heightWeight: resp['height'] + " / "+ resp['weight'], 
            abilities: resp['abilities'], 
            base_experience: resp['base_experience']
          });

          this.dataSource.data = this.view;
        });
 
      });
      this.loading = false;
    }
    , error => {
      //in case of error, add the callback to bring the item back and re-throw the error.
      this.loading = false;
      if(error['status'] == 404) {
        this.errorMessage = "No data to show with type: " + this.filterType.value;
      } else {
        this.errorMessage = error['message'];
      }
      throw error;
      }
    );
    
  }
}

