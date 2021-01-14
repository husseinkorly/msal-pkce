import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.handleRedirect().subscribe({
    //   next: (resp) => console.log(resp)
    // }).unsubscribe();

    //this.authService.handleRedirect();
  }
}
