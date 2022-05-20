import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {

  tipusok: any[] = [];
  errorMessage = ''
  model = {
    kategoriaId: 0,
    leiras: '',
    hirdetesDatuma: new Date().toISOString().substring(0, 10),   
    tehermentes: true,
    kepUrl: ''
  }


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.http.get<any[]>('http://localhost:5000/api/kategoriak').subscribe({
      next: (data: any[]) => this.tipusok = data,
      error: (err) => this.errorMessage = err.message
    })
  }

  post(): void {
    this.model.kategoriaId = Number(this.model.kategoriaId);
    this.http.post<any>('http://localhost:5000/api/ujingatlan', this.model).subscribe({
      next: () => this.router.navigate(['offers']),
      error: (err) => this.errorMessage = err.message
    })
  }
}
