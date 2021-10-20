import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ENV } from 'src/app/core/constants/global.constants';
import { Env } from 'src/app/core/types/env';
import { heroesAppError } from 'src/app/core/types/error';
import { HeroDTO } from '../models/hero-dto';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly HEROES_PATH = 'heroes';
  private readonly LOCAL_STORAGE_KEY = 'heroes';

  public heroList$: Observable<HeroDTO[]>;
  private heroes = new BehaviorSubject<HeroDTO[]>([]);

  constructor(@Inject(ENV) private env: Env, private http: HttpClient) {
    this.heroList$ = this.heroes.asObservable();
  }

  public loadHeroes(): Observable<HeroDTO[]> {
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY) != null) {
      this.heroes.next(JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)!));
      return this.heroList$;
    }

    return this.http.get<HeroDTO[]>(`${this.env.apiBaseUrl}${this.HEROES_PATH}`).pipe(
      tap((response) => {
        this.heroes.next(response);
        this.saveData();
      }),
      catchError((error) => throwError(error as heroesAppError))
    );
  }

  public addHero(newHero: HeroDTO): void {
    const currentHeroes = this.heroes.value;

    const updatedHeroes = [...currentHeroes, { ...newHero, id: this.heroes.value.length }];

    this.heroes.next(updatedHeroes);

    this.saveData();
  }

  public removeHeroById(heroId: number): void {
    const currentHeroes = this.heroes.value;

    const updatedHeroes = currentHeroes.filter((hero) => {
      return hero.id !== heroId;
    });

    this.heroes.next(updatedHeroes);

    this.saveData();
  }

  public updateHero(heroToUpdate: HeroDTO): void {
    this.heroes.value.forEach((hero) => {
      if (hero.id === heroToUpdate.id) {
        hero!.name = heroToUpdate.name;
        hero!.image = heroToUpdate.image;
        hero!.description = heroToUpdate.description;
        this.saveData();
      }
    });
  }

  public getHeroById(heroId: number): HeroDTO | any {
    return this.heroes.value.find((hero) => {
      return hero.id == heroId;
    });
  }

  public getHeroByName(term: string): void {
    const availableHeroes: HeroDTO[] = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)!);
    const matchingHeroes: HeroDTO[] = [];

    availableHeroes.forEach((hero) => {
      if (hero.name.trim().toLocaleLowerCase().includes(term.trim().toLocaleLowerCase())) {
        matchingHeroes.push(hero);
      }
    });

    this.heroes.next(matchingHeroes);
  }

  private saveData(): void {
    const currentHeroes = this.heroes.value;
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(currentHeroes));
  }
}
