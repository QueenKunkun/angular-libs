# AngularSseClient

This library is a wrapper for SSE ([Server-sent events - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), An EventSource instance opens a persistent connection to an HTTP server, which sends events in text/event-stream format. The connection remains open until closed by calling EventSource.close().) in angular.

NOTE: requires typescript 2.7+, see [Support 'EventSource' in lib.dom.d.ts · Issue #13666 · microsoft/TypeScript[2.1k,63.6k:63.6k,8.4k]](https://github.com/Microsoft/TypeScript/issues/13666 )

## Usage

Install the lib via:

`npm install angular-sse-clint --save`

then in your code:

```ts
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

If you want to listen to the event source for only amount of time, set duration in the options, e.g. it will stop listening after 5000 miliseconds with below code:

```ts
this.sseClient.get('http://localhost:8181/sse', { duration: 5000 })
  .subscribe(data => {
    console.log('got data from EventSource', data);
  });
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
  keepOpenWhenUnsubscribe?: boolean,
} = {}): Observable<any>
```


## Code scaffolding

Run `ng generate component component-name --project angular-sse-client` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project angular-sse-client`.
> Note: Don't forget to add `--project angular-sse-client` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build angular-sse-client` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build angular-sse-client`, go to the dist folder `cd dist/angular-sse-client` and run `npm publish`.

## Running unit tests

Run `ng test angular-sse-client` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
