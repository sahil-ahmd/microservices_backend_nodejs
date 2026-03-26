import { Request, Response, RequestHandler } from "express";
import { asyncHandler } from "@shared/middleware";
import { AuthService } from "./authService";
import { createSuccessResponse } from "@shared/utils";

const authService = new AuthService();

export const register: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokens = await authService.register(email, password);

    res
      .status(201)
      .json(createSuccessResponse(tokens, "User registered successfully"));
  },
);

export const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);

    res
      .status(200)
      .json(createSuccessResponse(tokens, "User logged in successfully"));
  },
);
