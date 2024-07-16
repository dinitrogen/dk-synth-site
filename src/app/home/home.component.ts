import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  message: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMessage().subscribe(data => {
      this.message = data;
    });
  }

}
