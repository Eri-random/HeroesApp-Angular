import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-heroe-page',
  templateUrl: './heroe-page.component.html',
  styles: [
  ]
})
export class HeroePageComponent implements OnInit{

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    ){}

  ngOnInit(): void {

    this.activatedRouter.params
      .pipe(
        //delay(30000),
        switchMap(({id}) => this.heroesService.getHeroById(id)),
      ).subscribe(hero =>{

        if(!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        return;
      })

  }

  
}
