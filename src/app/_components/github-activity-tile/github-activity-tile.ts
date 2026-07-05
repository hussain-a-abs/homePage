import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, computed, ElementRef, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GithubActivity } from '../../_data/models';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-github-activity-tile',
  imports: [],
  templateUrl: './github-activity-tile.html',
  styles: ``,
})
export class GithubActivityTile implements AfterViewInit {
  currentDate = new Date();
  private http = inject(HttpClient);
  weeks = computed(() => {
    let currentDate = new Date();
    const days = this.contribs()?.contributions.filter(i => i.date.startsWith(currentDate.getFullYear().toString())) ?? [];
    const chunks = [];
    for (let i = 0; i < days.length; i += 7)
      chunks.push(days.slice(i, i + 7));
    return chunks;
  });
  totalThisYear = computed(()=> {
    return this.contribs()?.total[new Date().getFullYear()]
  })

  readonly COLORS = [
    "--color-contribution-0",
    "--color-contribution-1",
    "--color-contribution-2",
    "--color-contribution-3"
  ]
  contribs = toSignal(
    this.http.get<GithubActivity>('https://github-contributions-api.jogruber.de/v4/hussain-a-abs')
  );
  constructor() {

  }

  async ngAfterViewInit(): Promise<void> {
    const url = "https://github-contributions-api.jogruber.de/v4/hussain-a-abs";
    // await fetch(url, { method: 'GET' }).then(async (val) => {
    //   const result = await val.json();
    //   const currentYear = new Date().getFullYear();
    //   const total = result.total[currentYear] as number;
    //   const contribArr = result.contributions as Array<{ date: string, count: number, level: number }>;
    //   this.contribs = {
    //     total: total,
    //     contributions: contribArr.filter(i => i.date.startsWith(currentYear.toString())).map((c) => { return { ...c, date: new Date(c.date) } })
    //   }

    // })
  }

  getColor(contrib: number) {
    const varName = this.COLORS[(contrib > 3) ? 3 : contrib];
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
  }



}
