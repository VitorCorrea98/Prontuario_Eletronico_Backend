// Códigos de sucesso (2xx)
export const HTTPGoodStatus = {
	OK: 200, // Requisição bem-sucedida
	CREATED: 201, // Recurso criado
	ACCEPTED: 202, // Requisição aceita, processamento pendente
	NO_CONTENT: 204, // Requisição bem-sucedida, sem conteúdo
	PARTIAL_CONTENT: 206, // Conteúdo parcial retornado
} as const;

// Códigos de erro do cliente (4xx)
export const HTTPBadStatus = {
	BAD_REQUEST: 400, // Sintaxe inválida
	UNAUTHORIZED: 401, // Autenticação necessária
	FORBIDDEN: 403, // Acesso não permitido
	NOT_FOUND: 404, // Recurso não encontrado
	METHOD_NOT_ALLOWED: 405, // Método HTTP não permitido
	REQUEST_TIMEOUT: 408, // Tempo de requisição excedido
	CONFLICT: 409, // Conflito com estado do recurso
	UNPROCESSABLE_ENTITY: 422, // Entrada semanticamente inválida
	TOO_MANY_REQUESTS: 429, // Limite de requisições excedido
} as const;

// Códigos de erro do servidor (5xx)
export const HTTPServerErrorStatus = {
	INTERNAL_SERVER_ERROR: 500, // Erro interno genérico
	BAD_GATEWAY: 502, // Resposta inválida de upstream
	SERVICE_UNAVAILABLE: 503, // Servidor temporariamente indisponível
	GATEWAY_TIMEOUT: 504, // Timeout na comunicação com upstream
} as const;

export const HTTPStatusMap = {
	...HTTPGoodStatus,
	...HTTPBadStatus,
	...HTTPServerErrorStatus,
} as const;

export type TGoodStatus = keyof typeof HTTPGoodStatus;
export type TBadStatus = keyof typeof HTTPBadStatus;
export type TServerStatus = keyof typeof HTTPServerErrorStatus;
export type TStatus = keyof typeof HTTPStatusMap;

export const getHTTPStatus = (status: TStatus) => HTTPStatusMap[status];

export type ServiceSuccessResponse<T = unknown> = {
	status: TGoodStatus;
	message: string;
	data?: T;
};

export type ServiceErrorResponse<T = unknown> = {
	status: TBadStatus | TServerStatus;
	message: string;
	error: T;
};

export type ServiceResponse = ServiceSuccessResponse | ServiceErrorResponse;

export type ServiceFunction<TInput, TResponse> = (
	input: TInput,
) => Promise<TResponse>;
