declare module "ejs-mate" {
  import { RequestHandler } from "express";

  interface EngineOptions {
    [key: string]: any;
  }

  function ejsMate(): RequestHandler;

  export = ejsMate;
}
