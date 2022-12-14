import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'portal-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: any = new Date().getFullYear();

  /**
   * Makes the footer transparent.
   */
  @Input() transparent: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
