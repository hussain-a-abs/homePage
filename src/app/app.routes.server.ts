import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'project/:urlSlug', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
