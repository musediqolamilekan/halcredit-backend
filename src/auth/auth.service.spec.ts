import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { getModelToken } from "@nestjs/mongoose";
import * as nodemailer from "nodemailer";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { JwtService } from "@nestjs/jwt";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn(),
  }),
}));

describe("AuthService", () => {
  let service: AuthService;
  let userModel: any;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  beforeEach(async () => {
    const mockUserModel = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken("User"), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken("User"));
    jwtService = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should send an email when forgotPassword is called", async () => {
    const email = "test@test.com";

    userModel.findOne.mockResolvedValue({
      save: jest.fn().mockResolvedValue({}),
      email,
    });

    await service.forgotPassword(email);
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();
  });

  it("should throw an error when forgotPassword is called with an email that does not exist", async () => {
    const email = "test@test.com";
    userModel.findOne.mockResolvedValue(null);

    await expect(service.forgotPassword(email)).rejects.toThrow();
  });

  it("should reset password when resetPassword is called with a valid token", async () => {
    const token = "token";
    const newPassword = "newPassword";

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    userModel.findOne.mockResolvedValue({
      save: jest.fn().mockResolvedValue({}),
      passwordResetToken: hashedToken,
      passwordResetExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    await service.resetPassword(token, newPassword);
    expect(bcrypt.hash).toHaveBeenCalled();
  });

  it("should throw an error when resetPassword is called with an invalid token", async () => {
    const token = "invalidToken";
    const newPassword = "newPassword";

    userModel.findOne.mockResolvedValue(null);

    await expect(service.resetPassword(token, newPassword)).rejects.toThrow();
  });
});
