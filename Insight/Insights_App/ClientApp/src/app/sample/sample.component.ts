import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {


  constructor(private auth: AuthService) { }

  data;

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    let data = await this.auth.getSampleData();
    this.data = data;
  }

}
