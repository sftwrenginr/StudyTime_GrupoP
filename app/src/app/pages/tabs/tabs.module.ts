import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { TabsPage } from './tabs.page';
// Cada import dinámico separa el código de una pantalla del contenedor tabs.
const routes: Routes = [{ path: '', component: TabsPage, children: [
  { path: 'inicio', loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule) },
  { path: 'plan', loadChildren: () => import('../plan/plan.module').then(m => m.PlanPageModule) },
  { path: 'entorno', loadChildren: () => import('../entorno/entorno.module').then(m => m.EntornoPageModule) },
  { path: 'recursos', loadChildren: () => import('../recursos/recursos.module').then(m => m.RecursosPageModule) },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
]}];
@NgModule({ declarations: [TabsPage], imports: [IonicModule, RouterModule.forChild(routes)] })
export class TabsPageModule {}
