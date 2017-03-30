import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {HeroService} from '../shared/services/hero.service';
import {Hero} from '../shared/classes/hero';

@Component({
  selector: 'app-my-heroes',
  providers: [HeroService],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private router: Router,
              private heroService: HeroService) {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  };

  ngOnInit(): void {
    this.getHeroes();
  };

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  };

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  };

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  };
}