declare module "ejs-mate" {
  import { RequestHandler } from "express";

  interface EngineOptions {
    // Add any known options here if you know them, otherwise make it generic.
    [key: string]: any;
  }

  function ejsMate(): RequestHandler;

  export = ejsMate;
}
