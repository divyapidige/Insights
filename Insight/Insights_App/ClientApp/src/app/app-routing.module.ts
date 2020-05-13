import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: environment.virtualDirectoryName, component: WelcomeComponent },
  { path: environment.virtualDirectoryName + '/Sample', component: SampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
