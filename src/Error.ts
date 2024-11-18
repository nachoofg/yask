export default class CacheError extends Error {
    constructor(id: number, additionalInfo: string = '') {
      super();
      this.message = `YASK-${id} ${additionalInfo}`;
    }
  }
  