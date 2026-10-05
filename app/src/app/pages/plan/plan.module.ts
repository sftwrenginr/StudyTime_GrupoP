import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { PlanPage } from './plan.page';
@NgModule({ declarations: [PlanPage], imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: PlanPage }])] })
export class PlanPageModule {}
