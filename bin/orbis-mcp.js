#!/usr/bin/env node
/**
 * Orbis MCP stdio bridge
 * Proxies MCP stdio messages to the Orbis remote MCP server (StreamableHTTP / SSE)
 */

import { createInterface } from "readline";
import https from "https";
import { URL } from "url";

const ORBIS_MCP_URL = process.env.ORBIS_MCP_URL || "https://orbisapi.com/api/mcp";
const ORBIS_KEY = process.env.ORBIS_KEY || "";

const rl = createInterface({ input: process.stdin });
let sessionId = null;
let sessionUrl = null;

async function initSession() {
  const url = new URL(ORBIS_MCP_URL);
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
  };
  if (ORBIS_KEY) headers["x-orbis-key"] = ORBIS_KEY;

  const initBody = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "orbis-mcp-bridge", version: "1.0.0" }
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: "POST",
      headers: { ...headers, "Content-Length": Buffer.byteLength(initBody) }
    }, (res) => {
      sessionId = res.headers["mcp-session-id"] || null;
      if (sessionId) sessionUrl = ORBIS_MCP_URL;
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          process.stdout.write(JSON.stringify(parsed) + "\n");
          resolve(parsed);
        } catch {
          resolve(null);
        }
      });
    });
    req.on("error", reject);
    req.write(initBody);
    req.end();
  });
}

async function sendMessage(message) {
  const url = new URL(ORBIS_MCP_URL);
  const body = JSON.stringify(message);
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
    "Content-Length": Buffer.byteLength(body),
  };
  if (ORBIS_KEY) headers["x-orbis-key"] = ORBIS_KEY;
  if (sessionId) headers["mcp-session-id"] = sessionId;

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: "POST",
      headers
    }, (res) => {
      sessionId = res.headers["mcp-session-id"] || sessionId;
      const ct = res.headers["content-type"] || "";

      if (ct.includes("text/event-stream")) {
        // SSE response — parse events
        let buf = "";
        res.on("data", d => {
          buf += d;
          const lines = buf.split("\n");
          buf = lines.pop();
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const json = JSON.parse(line.slice(6));
                process.stdout.write(JSON.stringify(json) + "\n");
              } catch {}
            }
          }
        });
        res.on("end", resolve);
      } else {
        let data = "";
        res.on("data", d => data += d);
        res.on("end", () => {
          if (data.trim()) {
            try {
              const parsed = JSON.parse(data);
              process.stdout.write(JSON.stringify(parsed) + "\n");
            } catch {}
          }
          resolve();
        });
      }
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// Boot
await initSession();

// Pipe stdin messages to the remote server
rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const msg = JSON.parse(trimmed);
    if (msg.method === "initialize") return; // already handled
    await sendMessage(msg);
  } catch (e) {
    process.stderr.write("Parse error: " + e.message + "\n");
  }
});

rl.on("close", () => process.exit(0));
