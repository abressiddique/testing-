import { it, describe, expect, vi } from "vitest";
import { app } from "../index";
import request from "supertest";
import { PrismaClient } from "@prisma/client";

// Mock the PrismaClient and its request.create method
vi.mock("@prisma/client", () => {
  return {
    PrismaClient: class {
      request = {
        create: vi.fn()
      };
    }
  };
});

describe("tests the sum and multiply functions", () => {
  it("should return 3 when 1 + 2", async () => {
    const res = await request(app)
      .post("/sum")
      .send({
        a: 1,
        b: 2,
      });

    expect(res.body.answer).toBe(3);
    expect(res.statusCode).toBe(200);
  });

  it("should fail when a number is too big", async () => {
    const res = await request(app)
      .post("/sum")
      .send({
        a: 10000000,
        b: 2,
      });

    expect(res.body.message).toBe("Sorry, we don't support big numbers.");
    expect(res.statusCode).toBe(422);
  });

  it("should return 0 when 0 * 2", async () => {
    const res = await request(app)
      .post("/multiply")
      .send({
        a: 0,
        b: 2,
      });

    expect(res.body.answer).toBe(0);
    expect(res.statusCode).toBe(200);
  });
});
