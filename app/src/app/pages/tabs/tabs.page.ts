import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, locationOutline, bookOutline } from 'ionicons/icons';
@Component({ selector: 'app-tabs', templateUrl: './tabs.page.html', standalone: false })
export class TabsPage { constructor() { addIcons({ homeOutline, listOutline, locationOutline, bookOutline }); } }
