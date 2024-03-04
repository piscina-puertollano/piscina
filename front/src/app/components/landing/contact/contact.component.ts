import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../../services/landing.service';

/**
 * @author: badr
 */

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{


  constructor(private landingService: LandingService){}

  ngOnInit(): void {
      
  }

}
