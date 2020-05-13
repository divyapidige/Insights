import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/services/auth.service';
import { PersistDataService } from '../../shared/services/persist-data.service';
import { common } from '../../shared/constants/commonConstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private persist: PersistDataService) { }

  ngOnInit() {
  }
}
