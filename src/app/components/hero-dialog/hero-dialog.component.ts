import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroService } from 'src/app/data/services/hero.service';

@Component({
  selector: 'app-hero-dialog',
  templateUrl: './hero-dialog.component.html',
  styleUrls: ['./hero-dialog.component.scss']
})
export class HeroDialogComponent implements OnInit {
  public static readonly MODAL_ID = 'hero-dialog-id';
  public static readonly MODAL_PANEL_CLASS = 'hero-dialog';
  public static readonly ADD_MODE = 'add';
  public static readonly EDIT_MODE = 'edit';

  public heroFormGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; id: number },
    private dialog: MatDialog,
    private fb: FormBuilder,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  public save(): void {
    if (this.data.mode === HeroDialogComponent.ADD_MODE) {
      this.addHero();
    } else {
      this.updateHero();
    }
  }

  public addHero(): void {
    this.heroService.addHero(this.heroFormGroup.value);
    this.dialog.getDialogById(HeroDialogComponent.MODAL_ID)?.close();
    this.heroFormGroup.reset();
  }

  public updateHero(): void {
    this.heroService.updateHero({ ...this.heroFormGroup.value, id: this.data.id });
    this.dialog.getDialogById(HeroDialogComponent.MODAL_ID)?.close();
    this.heroFormGroup.reset();
  }

  private createFormGroup(): void {
    const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const minDescriptionLength = 15;

    this.heroFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.pattern(urlPattern)]],
      description: ['', [Validators.required, Validators.minLength(minDescriptionLength)]]
    });

    this.loadHeroData();
  }

  private loadHeroData(): void {
    if (this.data.mode === HeroDialogComponent.EDIT_MODE) {
      const hero = this.heroService.getHeroById(this.data.id);

      this.heroFormGroup.setValue({
        name: hero.name,
        image: hero.image,
        description: hero.description
      });
    }
  }
}
