import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../login/services/auth.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {


  constructor(private http: HttpClient, private auth: AuthService) { }

  data;

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    debugger;
    let data = await this.auth.getSampleData();
    
    this.data = data;
  }

}
