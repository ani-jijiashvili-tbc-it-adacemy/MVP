// import { Component, computed, inject, signal, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EventCardComponent } from '../../components/event-card/event-card';
// import { EventFiltersComponent } from '../../components/event-filters/event-filters';
// import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
// import { EventService } from '../../services/event.service';
// import { EventServiceMock } from '../../services/event.service.mock';
// import { environment } from '../../../../../environments/environment';
// import { EventListItem, EventCategory } from '../../models/event.model';
// import { EventFilters, DEFAULT_EVENT_FILTERS } from '../../models/event-filters.model';
// import { PaginatorModule } from 'primeng/paginator';

// @Component({
//   selector: 'app-browse-events-page',
//   imports: [
//     CommonModule,
//     EventCardComponent,
//     EventFiltersComponent,
//     LoadingSpinner,
//     PaginatorModule,
//   ],
//   templateUrl: './browse-events-page.html',
//   styleUrl: './browse-events-page.scss',
// })
// export class BrowseEventsPageComponent implements OnInit {
//   private readonly eventService = environment.useMockApi
//     ? inject(EventServiceMock)
//     : inject(EventService);

//   readonly events = signal<EventListItem[]>([]);
//   readonly categories = signal<EventCategory[]>([]);
//   readonly locations = signal<string[]>([]);
//   readonly loading = signal(false);
//   readonly totalRecords = signal(0);
//   readonly currentFilters = signal<EventFilters>({ ...DEFAULT_EVENT_FILTERS });

//   readonly rows = computed(() => this.currentFilters().pageSize);
//   readonly first = computed(() => (this.currentFilters().page - 1) * this.currentFilters().pageSize);

//   ngOnInit(): void {
//     this.loadCategories();
//     this.loadLocations();
//     this.loadEvents();
//   }

//   loadCategories(): void {
//     this.eventService.getCategories().subscribe({
//       next: (response) => {
//         this.categories.set(response.categories);
//       },
//       error: (error) => {
//         console.error('Error loading categories:', error);
//       },
//     });
//   }

//   loadLocations(): void {
//     this.eventService.getLocations().subscribe({
//       next: (response) => {
//         this.locations.set(response.locations);
//       },
//       error: (error) => {
//         console.error('Error loading locations:', error);
//       },
//     });
//   }

// loadEvents(): void {
//   console.log('Loading events with filters:', this.currentFilters());
//   this.loading.set(true);
  
//   this.eventService.getEvents(this.currentFilters()).subscribe({
//     next: (response) => {
//       console.log('API Response:', response);
//       console.log('Response items:', response.items);
//       console.log('Items length:', response.items?.length);
      
//       this.events.set(response.items);
      
//       console.log('Events signal after set:', this.events());
//       console.log('Events signal length:', this.events().length);
      
//       this.totalRecords.set(response.totalCount);  
//       this.loading.set(false);
//     },
//     error: (error) => {
//       console.error('Error loading events:', error);
//       this.events.set([]);
//       this.loading.set(false);
//     },
//   });
// }
//   onFiltersChange(filters: EventFilters): void {
//     this.currentFilters.set({ ...filters, page: 1 });
//     this.loadEvents();
//   }

//   onPageChange(event: any): void {
//     this.currentFilters.update(filters => ({
//       ...filters,
//       page: event.page + 1,
//     }));
//     this.loadEvents();
//   }

//   onRegister(eventId: number): void {
//     this.eventService.registerForEvent(eventId).subscribe({
//       next: () => {
//         this.loadEvents();
//       },
//       error: (error) => {
//         console.error('Error registering for event:', error);
//       },
//     });
//   }
// }


import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../../components/event-card/event-card';
import { EventFiltersComponent } from '../../components/event-filters/event-filters';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { EventService } from '../../services/event.service';
import { EventServiceMock } from '../../services/event.service.mock';
import { environment } from '../../../../../environments/environment';
import { EventListItem, EventCategory } from '../../models/event.model';
import { EventFilters, DEFAULT_EVENT_FILTERS } from '../../models/event-filters.model';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-browse-events-page',
  imports: [
    CommonModule,
    EventCardComponent,
    EventFiltersComponent,
    LoadingSpinner,
    PaginatorModule,RouterModule
  ],
  templateUrl: './browse-events-page.html',
  styleUrl: './browse-events-page.scss',
})
export class BrowseEventsPageComponent implements OnInit {
  private readonly eventService = environment.useMockApi
    ? inject(EventServiceMock)
    : inject(EventService);

  readonly events = signal<EventListItem[]>([]);
  readonly categories = signal<EventCategory[]>([]);
  readonly locations = signal<string[]>([]);
  readonly loading = signal(false);
  readonly totalRecords = signal(0);
  readonly currentFilters = signal<EventFilters>({ ...DEFAULT_EVENT_FILTERS });
  

  readonly rows = computed(() => this.currentFilters().pageSize);
  readonly first = computed(() => (this.currentFilters().page - 1) * this.currentFilters().pageSize);

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('useMockApi:', environment.useMockApi);
    this.loadCategories();
    this.loadLocations();
    this.loadEvents();
    console.log(this.events)
  }

  loadCategories(): void {
    console.log('loadCategories called');
    this.eventService.getCategories().subscribe({
      next: (response) => {
        console.log('Categories response:', response);
        this.categories.set(response.categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  loadLocations(): void {
    console.log('loadLocations called');
    this.eventService.getLocations().subscribe({
      next: (response) => {
        console.log('Locations response:', response);
        this.locations.set(response.locations);
      },
      error: (error) => {
        console.error('Error loading locations:', error);
      },
    });
  }

  loadEvents(): void {
    console.log('=== loadEvents START ===');
    console.log('Current filters:', this.currentFilters());
    console.log('EventService:', this.eventService);
    
    this.loading.set(true);
    console.log('Loading set to true');
    
    const observable = this.eventService.getEvents(this.currentFilters());
    console.log('Observable created:', observable);
    
    observable.subscribe({
      next: (response) => {

        
        this.events.set(response.items);
        
        this.totalRecords.set(response.totalCount);
        
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.events.set([]);
        this.loading.set(false);
      },
      complete: () => {
      }
    });
    
  }

  onFiltersChange(filters: EventFilters): void {
    console.log('Filters changed:', filters);
    this.currentFilters.set({ ...filters, page: 1 });
    this.loadEvents();
  }

  onPageChange(event: any): void {
    console.log('Page changed:', event);
    this.currentFilters.update(filters => ({
      ...filters,
      page: event.page + 1,
    }));
    this.loadEvents();
  }

  onRegister(eventId: number): void {
    console.log('Register clicked:', eventId);
    this.eventService.registerForEvent(eventId).subscribe({
      next: () => {
        console.log('Registration successful');
        this.loadEvents();
      },
      error: (error) => {
        console.error('Error registering for event:', error);
      },
    });
  }
}