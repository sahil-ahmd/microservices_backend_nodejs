import { logError, ServiceError } from "@shared/types";
import { createErrorResponse } from "@shared/utils";
import { Request, Response, NextFunction, RequestHandler } from "express";

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function validateRequest(schema: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors: Record<string, string[]> = {};
      
      error.details.forEach((detail: any) => {
        const field = detail.path.join(".");
        if (!errors[field]) { // Fixed: checked 'errors' object, not 'error'
          errors[field] = [];
        }
        errors[field].push(detail.message);
      });

      // We return here to stop execution, but the return value is 'void' for Express
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
      return; 
    }
    
    next();
  };
}

export function errorHandler(
  error: ServiceError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logError(error, {
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json(createErrorResponse(message));
}