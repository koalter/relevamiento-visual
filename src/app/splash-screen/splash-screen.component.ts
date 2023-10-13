import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.hide(3000);
  }

  hide(showDuration: number = 500) {
    setTimeout(() => {
      this.router.navigate(['home']);
    }, showDuration);
  }
}
