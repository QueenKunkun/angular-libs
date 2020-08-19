// let ID = 0;
let EventSourceMap: { [key: string]: EventSource } = {};

export function getEventSource(url, options: EventSourceInit = {}) {
  if (!EventSourceMap[url]) {
    EventSourceMap[url] = new EventSource(url, options);
  }
  return EventSourceMap[url];
}

export function closeEventSource(url) {
  if (EventSourceMap[url]) {
    EventSourceMap[url].close();
    delete EventSourceMap[url];
  }
}
