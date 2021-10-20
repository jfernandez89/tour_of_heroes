import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroDTO } from 'src/app/data/models/hero-dto';
import { HeroService } from 'src/app/data/services/hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  public heroDetails!: HeroDTO;

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.loadHeroes();
    this.getHeroDetails();
  }

  public goBack(): void {
    this.location.back();
  }

  public getHeroDetails(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.heroDetails = this.heroService.getHeroById(param.id);
    });
  }
}
