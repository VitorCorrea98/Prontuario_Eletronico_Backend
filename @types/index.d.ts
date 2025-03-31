import * as express from "express";
import { User } from "../src/core/User/Entities/User_Entity";

declare global {
  namespace Express{
    interface Request {
      user?: User
    }
  }
}