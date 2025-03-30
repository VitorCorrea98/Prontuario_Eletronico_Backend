import type { Request } from "express";

export type DataSelector<TInput, TRequest extends Request = Request> = (
	req: TRequest,
) => TInput;
