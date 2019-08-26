import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'detailsDialog',
  templateUrl: './detailsDialog.component.html',
  styleUrls: ['./detailsDialog.component.css']
})

export class DetailsDialogComponent implements OnInit{
  
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest:RestService
  ) {}
    
  pokemonName: string = "";

  type: Array<any>;
  weight: number;
  height: number;
  signature_ability: Array<any>;
  
  types: Array<any>;

  double_damage_from: Array<{name: string}>;
  double_damage_to: Array<{name: string}>;
  half_damage_from: Array<{name: string}>;
  half_damage_to: Array<{name: string}>;
  no_damage_from: Array<{name: string}>;
  no_damage_to: Array<{name: string}>;
  
  ngOnInit() {
    
    this.pokemonName = this.data['name'];

    this.types = [];
    this.double_damage_from = [];
    this.double_damage_to = [];
    this.half_damage_from = [];
    this.half_damage_to = [];
    this.no_damage_from = [];
    this.no_damage_to = [];
    
    this.rest.getPokemonDetails(this.data['url']).subscribe((resp: any) => {
      this.type = resp['types'];
      this.signature_ability = resp['abilities'];
      this.weight = resp['weight'];
      this.height = resp['height'];


      this.type.forEach(element => {
        
        this.rest.getData(element.type.url).subscribe((response: any) => {
          
          //Double Damage To
          const ddt = response.damage_relations.double_damage_to;
          ddt.forEach(element => {
            this.double_damage_to.push(element.name);
          });
          this.double_damage_to = this.double_damage_to.filter((el, i, a) => i === a.indexOf(el))

          //Double damage From
          const ddf = response.damage_relations.double_damage_from;
          ddf.forEach(element => {
            this.double_damage_from.push(element.name);
          });
          this.double_damage_from = this.double_damage_from.filter((el, i, a) => i === a.indexOf(el))
          
          //Half Damage To
          const hdt = response.damage_relations.half_damage_to;
          hdt.forEach(element => {
            this.half_damage_to.push(element.name);
          });
          this.half_damage_to = this.half_damage_to.filter((el, i, a) => i === a.indexOf(el))

          //Half Damage From
          const hdf = response.damage_relations.half_damage_from;
          hdf.forEach(element => {
            this.half_damage_from.push(element.name);
          });
          this.half_damage_from = this.half_damage_from.filter((el, i, a) => i === a.indexOf(el))

          //No Damage To
          const ndt = response.damage_relations.no_damage_to;
          ndt.forEach(element => {
            this.no_damage_to.push(element.name);
          });
          this.no_damage_to = this.no_damage_to.filter((el, i, a) => i === a.indexOf(el))

          //No Damage From
          const ndf = response.damage_relations.no_damage_from;
          ndf.forEach(element => {
            this.no_damage_from.push(element.name);
          });
          this.no_damage_from = this.no_damage_from.filter((el, i, a) => i === a.indexOf(el))
        });
      });
   });
  }

  onCloseClick(){
    this.dialogRef.close();
  }
  
  
}
