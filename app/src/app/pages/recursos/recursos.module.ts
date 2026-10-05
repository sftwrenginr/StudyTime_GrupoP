import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { RecursosPage } from './recursos.page';
import { MultimediaComponent } from '../../components/multimedia/multimedia.component';
import { DetallePage } from './detalle.page';
@NgModule({ declarations: [RecursosPage, DetallePage, MultimediaComponent], imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: RecursosPage }, { path: ':id', component: DetallePage }])] })
export class RecursosPageModule {}
