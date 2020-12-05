# AngularSseClient

This library is a wrapper for SSE for angular.


What is SSE?

> ([Server-sent events - Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), An EventSource instance opens a persistent connection to an HTTP server, which sends events in text/event-stream format. The connection remains open until closed by calling EventSource.close().).

NOTE: 
> This lib requires typescript 2.7+, see [Support 'EventSource' in lib.dom.d.ts · Issue #13666 · microsoft/TypeScript](https://github.com/Microsoft/TypeScript/issues/13666 )


## Supported Browsers

See [EventSource#Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/EventSource#Browser_compatibility )

NOTE: 

> You may need to use a polyfill to make it work on more versions of browsers: 
[EventSource/eventsource: EventSource client for Node.js and Browser (polyfill)](https://github.com/EventSource/eventsource )


## Usage

### Install

    npm install angular-sse-client --save

### Code examples

1. Inject the SseClient or create a new one, then call the `get` method with an SSE url:

    ```ts
    import { SseClient } from 'angular-sse-client';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.less']
    })
    export class AppComponent implements OnInit {
      constructor(private sseClient: SseClient) {
      }

      ngOnInit(): void {
        this.sseClient.get('http://localhost:8181/sse')
          .subscribe(data => {
            console.log('got data from EventSource', data);
          });
      }
    }
    ```

1. If you want to listen to the event source for only amount of time, set `duration` option, i.e. the Observable will be unsubscribed after `duration` time:

    ```ts
    this.sseClient.get('http://localhost:8181/sse', { duration: 5000 })
      .subscribe(data => {
        console.log('got data from EventSource', data);
      });
    ```

2. If you want to keep the event source alive after unsubscribing an sseClient, set `keepAlive` to true, so that other clients listening to the same url will not be affected, i.e. other calls of `sseClient.get(url, ...)` will still get response from the **only** one EventSource targeting to that url (by utilizing an event source pool internally):

    > This option can make sse clients share the same source, so the maxium connection limitation of SSE connections will be avoided in some extent. See [SSE suffers from a limitation to the maximum number of open connections, which can be specially painful when opening various tabs as the limit is per browser and set to a very low number (6)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)

    ```ts
    this.sseClient.get('http://localhost:8181/sse', { keepAlive: true })
      .subscribe(data => {
        console.log('got data from EventSource', data);
      });
    ```

    ---
    > **NOTE:** To close the `'alive'` event source manually, use:

    ```ts
      import { closeEventSource } from 'angular-sse-client';

      closeEventSource('http://localhost:8181/sse');
    ```


## API

```ts
// SseClient
get(url: string, options: {
  withCredentials?: boolean,
  /**
   * Complete the observable after a period of time automatically
   */
  duration?: number,
  /**
   * If set to true, keep event source open (i.e. will not close and keep it in a event source pool for reuse) after unsubscribing
   */
  keepAlive?: boolean,
} = {}): Observable<any>
```

## Build

Run `ng build angular-sse-client` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build angular-sse-client`, go to the dist folder `cd dist/angular-sse-client` and run `npm publish`.

## Running unit tests

Run `ng test angular-sse-client` to execute the unit tests via [Karma](https://karma-runner.github.io).
