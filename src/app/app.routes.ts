import { Routes } from '@angular/router';
import { authGuard } from './_guards/auth-guard';

export const routes: Routes = [
    { path: "", loadComponent: () => import('./_components/bento-grid/bento-grid').then(m => m.BentoGrid) },
    // { path: "admin", loadComponent: () => import('./_components/admin/admin').then(m => m.Admin), canActivate: [authGuard] },
    { path: "admin", loadComponent: () => import('./_components/admin/admin').then(m => m.Admin), }, //removed guard for dev

    { path: 'project/:urlSlug', loadComponent: () => import('./_components/project-component/project-component').then(m => m.ProjectComponent) },

];
