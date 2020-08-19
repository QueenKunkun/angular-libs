import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { getEventSource, closeEventSource } from './event-source';

@Injectable({
  providedIn: 'root'
})
export class SseClient {

  constructor() { }

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
  } = {}): Observable<any> {
    const subject = new Observable<any>(subscriber => {
      const sse = getEventSource(url, options);
      if (!sse) {
        return subscriber.error(new Error(`failed to init EventSource for url ${url}`));
      }

      let stopped = false;

      /**
       * Stop listening to event source,
       * close and release it if options.keepOpenWhenUnsubscribe is set to falsy
       */
      const _stop = function () {
        console.log('stop function entered');
        if (stopped) return;
        stopped = true;

        sse.removeEventListener('message', _onMessage);
        sse.removeEventListener('error', _onError);

        if (options.keepOpenWhenUnsubscribe !== true) {
          closeEventSource(url);
        }
      }

      const _onMessage = function (message: MessageEvent) {
        const { type, data } = message;
        try {
          const json = JSON.parse(data);
          subscriber.next(json);
        } catch (error) {
          subscriber.next(data);
        }
      };

      const _onError = function (message: MessageEvent) {
        // unsubscribe will be called after then
        subscriber.error(message);
      };

      sse.addEventListener('message', _onMessage);
      sse.addEventListener('error', _onError);

      if (typeof options.duration === 'number') {
        setTimeout(() => {
          // unsubscribe will be called after then
          subscriber.complete();
        }, options.duration);
      }

      return {
        unsubscribe() {
          _stop();
        }
      };
    });

    return subject;
  }
}
