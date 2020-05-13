import { Component, OnInit } from '@angular/core';
import { PersistDataService } from '../../shared/services/persist-data.service';
import { common } from '../../shared/constants/commonConstants';
import { AuthService } from '../../login/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private persist: PersistDataService) { }

  userName = '';
  

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.userName = await this.auth.getUserId();
  }

}
