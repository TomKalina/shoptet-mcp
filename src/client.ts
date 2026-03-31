import { z } from "zod";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const API_BASE = "https://api.myshoptet.com";

function getToken(): string {
  const t = process.env.SHOPTET_API_TOKEN;
  if (!t) throw new Error("SHOPTET_API_TOKEN environment variable is required");
  return t;
}

export function safePath(segment: string | number): string {
  const s = String(segment);
  if (s.includes("/") || s.includes("?") || s.includes("#") || s.includes("..")) {
    throw new Error(`Invalid path segment: ${s}`);
  }
  return encodeURIComponent(s);
}

export async function shoptet(
  path: string,
  method: string = "GET",
  body?: unknown
): Promise<unknown> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Shoptet-Access-Token": getToken(),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    await new Promise((r) => setTimeout(r, (Number(retryAfter) || 2) * 1000));
    return shoptet(path, method, body);
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Shoptet API ${res.status}: ${errText}`);
  }

  return res.json();
}

export const pagingSchema = {
  page: z.number().optional().describe("Page number (starts at 1)"),
  itemsPerPage: z.number().optional().describe("Items per page (max 100)"),
};

export function buildQuery(params: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export function text(data: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

export function errorResult(err: unknown): CallToolResult {
  return {
    content: [{ type: "text", text: String(err) }],
    isError: true,
  };
}

export async function safeCall(fn: () => Promise<CallToolResult>): Promise<CallToolResult> {
  try {
    return await fn();
  } catch (err) {
    return errorResult(err);
  }
}
