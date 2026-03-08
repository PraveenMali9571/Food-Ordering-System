export class HttpError extends Error {
  statusCode: number;
  timeStamp: Date;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.timeStamp = new Date();

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}
export class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message = "Method Not Allowed") {
    super(message, 405);
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

export class ValidationError extends HttpError {
  constructor(message = "Validation Error") {
    super(message, 422);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = "Too Many Requests") {
    super(message, 429);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

export class NotImplementedError extends HttpError {
  constructor(message = "Not Implemented") {
    super(message, 501);
  }
}
export class BadGatewayError extends HttpError {
  constructor(message = "Bad Gateway") {
    super(message, 502);
  }
}
export class ServiceUnavailableError extends HttpError {
  constructor(message = "Service Unavailable") {
    super(message, 503);
  }
}
export class GatewayTimeoutError extends HttpError {
  constructor(message = "Gateway Timeout") {
    super(message, 504);
  }
}