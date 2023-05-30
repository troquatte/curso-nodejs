import express from 'express';
import { router } from 'router';

class Main {
  private _server;

  constructor() {
    this._server = express();
    this._middleware();
    this._router();
  }

  private _middleware() {
    this.server.use(express.json());
  }

  private _router() {
    this.server.use(router);
  }

  get server() {
    return this._server;
  }
}

export const main = new Main();
