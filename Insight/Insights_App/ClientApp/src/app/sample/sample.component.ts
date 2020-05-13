import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {


  constructor(private http: HttpClient) { }

  data;
  title = 'ClientApp';

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    var header = new HttpHeaders({ 'content-type': 'application/json' });
    var apiUrl = environment.apiUrl + '/SampleData';
    //var d = await this.http.request('get', apiUrl , { headers: header, reportProgress: false }).toPromise();
    var d = await this.http.request('get', apiUrl , { headers: header, reportProgress: false }).toPromise();
    this.data = d;
  }

}
