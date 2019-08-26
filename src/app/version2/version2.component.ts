import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Pokemons, NameUrl } from '../data/pokemons';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { DetailsDialogComponent } from './detailsDialog/detailsDialog.component';


@Component({
  selector: 'version2',
  templateUrl: './version2.component.html',
  styleUrls: ['./version2.component.css']
})
export class Version2Component implements OnInit{
  title = 'Version 2';

  filterName = new FormControl();
  filterValue: string;
  filterOn: boolean = false;


  displayedColumns: string[] = ['name', 'details'];
  public dataSource : MatTableDataSource<NameUrl>;
  view: NameUrl[] = [];
  count: number = 0;

  pageSize = 10;
  currentPage = 0;
  length: number = 0;

  // MatPaginator Output
  pageEvent: PageEvent;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.getData(this.currentPage * this.pageSize, this.pageSize);
    this.dataSource = new MatTableDataSource();
  }

  public handlePage(e: any) {
    if (!this.filterOn){
      this.currentPage = e.pageIndex;
      this.pageSize = e.pageSize;
      this.view = [];
      this.getData(this.currentPage * this.pageSize, this.pageSize);
    }
  }

  getData(offset: number, limit: number){
    
    this.rest.getPokemons(offset, limit).subscribe(response => {
      this.view = response.results;
      this.count = response.count;
      
      this.length = this.count;
      this.paginator.length = this.length;
   
      this.dataSource.data = this.view;
   
    });
  }

  doFilter(){
    this.filterOn = true;
    
    //if filters are null or empty then reset grid
    if ((isNullOrUndefined(this.filterName.value) || this.filterName.value == "")) {
      
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
      
    } 
    
    
  }

  getDetails(row: any){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = '70%'

    this.dialog.open(DetailsDialogComponent, dialogConfig);

      
  }
}
