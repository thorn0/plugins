export class IsCjsPromiseMap {
  constructor() {
    this.map = new Map();
  }

  get(id) {
    let mapEntry = this.map.get(id);
    if (mapEntry) return mapEntry.promise;

    const promise = new Promise((resolve) => {
      mapEntry = {
        resolve,
        promise: null
      };
      this.map.set(id, mapEntry);
    });
    mapEntry.promise = promise;

    return promise;
  }

  set(id, resolution) {
    const mapEntry = this.map.get(id);
    if (mapEntry) {
      if (mapEntry.resolve) {
        mapEntry.resolve(resolution);
        mapEntry.resolve = null;
      }
    } else {
      this.map.set(id, { promise: Promise.resolve(resolution), resolve: null });
    }
  }
}
