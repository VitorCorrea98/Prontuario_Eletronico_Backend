import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import { router } from "./presentation/Routes";
import { ipFilter, verifyAPIKey } from "./shared/Security/application";

const app = express();

app.use(express.json());

app.use(verifyAPIKey);
app.use(ipFilter);

app.use("/api", router);

app.listen(3000);
