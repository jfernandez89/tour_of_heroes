import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { RouteConstants } from 'src/app/core/constants/route.constants';
import { heroesAppError } from 'src/app/core/types/error';
import { HeroDTO } from 'src/app/data/models/hero-dto';
import { HeroService } from 'src/app/data/services/hero.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { HeroDialogComponent } from '../hero-dialog/hero-dialog.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

const WAITING_TIME_IN_MS = 1000;

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searcher!: ElementRef;
  public loading = true;

  constructor(
    public heroService: HeroService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searcher.nativeElement, 'keyup')
      .pipe(
        debounceTime(WAITING_TIME_IN_MS),
        distinctUntilChanged(),
        tap(() => {
          this.heroService.getHeroByName(this.searcher.nativeElement.value);
        })
      )
      .subscribe();
  }

  public loadHeroes(): void {
    this.heroService.loadHeroes().subscribe({
      next: (heros: HeroDTO[]) => {
        this.loading = false;
      },
      error: (error: heroesAppError) => {
        this.snackBar.open(error.message, '', {
          duration: 1500
        });
      }
    });
  }

  public removeHero(heroId: number, heroName: string): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      panelClass: UserDialogComponent.MODAL_PANEL_CLASS,
      id: UserDialogComponent.MODAL_ID,
      data: { name: heroName }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroService.removeHeroById(heroId);
      }
    });
  }

  public addHero(): void {
    this.dialog.open(HeroDialogComponent, {
      panelClass: HeroDialogComponent.MODAL_PANEL_CLASS,
      id: HeroDialogComponent.MODAL_ID,
      data: { mode: HeroDialogComponent.ADD_MODE, id: '' }
    });
  }

  public editHero(heroId: number): void {
    this.dialog.open(HeroDialogComponent, {
      panelClass: HeroDialogComponent.MODAL_PANEL_CLASS,
      id: HeroDialogComponent.MODAL_ID,
      data: { mode: HeroDialogComponent.EDIT_MODE, id: heroId }
    });
  }

  public viewHeroDetails(heroId: number): void {
    this.router.navigate([`/${RouteConstants.HERO}/${heroId}`]);
  }
}
