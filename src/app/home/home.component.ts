import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title = 'pokemon world';

  constructor(private router: Router) {
   
 }
  ngOnInit(){}

  onClickMeV1() {
    this.router.navigate(['version1']);
    
  }

  onClickMeV2() {
    this.router.navigate(['version2']);
    
  }
}
