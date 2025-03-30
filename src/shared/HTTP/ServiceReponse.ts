export const HTTPGoodStatus = {
	OK: 200,
	CREATED: 201,
	UPDATED: 202,
} as const;

export const HTTPBadStatus = {
	BAD: 400,
	NOT_FOUND: 404,
	NOT_AUTHORIZED: 401,
	INVALID_INPUT: 422,
} as const;

export const HTTPStatusMap = {
	...HTTPGoodStatus,
	...HTTPBadStatus,
} as const;

export type HTTPGoodStatus = keyof typeof HTTPGoodStatus;
export type HTTPBadStatus = keyof typeof HTTPBadStatus;
export type HTTPStatus = keyof typeof HTTPStatusMap;

export const getHTTPStatus = (status: HTTPStatus) => HTTPStatusMap[status];

export type ServiceSuccessResponse = {
	status: HTTPGoodStatus;
	message: string;
};

export type ServiceErrorResponse = {
	status: HTTPBadStatus;
	message: string;
	error: string;
};

export type ServiceResponse = ServiceSuccessResponse | ServiceErrorResponse;

export type ServiceFunction<TInput, TResponse> = (
	input: TInput,
) => Promise<TResponse>;
