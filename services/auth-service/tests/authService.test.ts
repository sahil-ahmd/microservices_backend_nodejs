import { AuthService } from "../src/authService";

// Mock external dependencies
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

// import mocked modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  resetAllMocks,
  testJwtPayload,
  testRefreshToken,
  testUser,
} from "./setup";
import { ServiceError } from "../../../shared/types";

const mockedUuidv4 = uuidv4 as unknown as jest.Mock<string, []>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockedJwt = jwt as jest.Mocked<typeof jwt>;
