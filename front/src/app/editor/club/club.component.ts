import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { LandingService } from '../../services/landing.service';
import { Club } from '../../interfaces/landing';

@Component({
  selector: 'app-club-edit',
  standalone: true,
  imports: [EditorModule, FormsModule],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubEditComponent implements OnInit{
  text: string | undefined;

  club?:Club

  constructor(private landingService: LandingService){}

  ngOnInit(): void {
    this.showHistory()
  }

  
  showHistory() {
    this.landingService.showSection('history').subscribe({
      next: (club: Club | undefined) => {
        console.log(club)
        this.club = club
        this.text = club?.history
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update() {
    this.club!.history = this.text 
    this.landingService.updateClub(this.club!).subscribe({
      next: (club: Club | undefined) => {
        this.club = club
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
