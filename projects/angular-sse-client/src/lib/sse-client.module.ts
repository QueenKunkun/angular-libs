import { NgModule } from '@angular/core';
import { SseClientComponent } from './sse-client.component';
import { SseClient } from './sse-client';

@NgModule({
  declarations: [SseClientComponent],
  imports: [
  ],
  // exports: [AngularSseClientComponent]
  providers: [
    SseClient
  ]
})
export class SseClientModule { }
