# @orbisapi/mcp

[![npm version](https://img.shields.io/npm/v/@orbisapi/mcp?color=000000)](https://www.npmjs.com/package/@orbisapi/mcp)
[![MCP Registry](https://img.shields.io/badge/MCP_Registry-listed-000000)](https://registry.modelcontextprotocol.io/servers/io.github.OrbisAPI/orbis-mcp)
[![GitHub Stars](https://img.shields.io/github/stars/OrbisAPI/orbis-mcp?style=flat&color=000000)](https://github.com/OrbisAPI/orbis-mcp/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-000000.svg)](LICENSE)

> MCP server for [Orbis](https://orbisapi.com) — gives Claude, Cursor, and any AI agent access to **1,000+ APIs** with x402 USDC micropayments on Base. **$0.01/call. No signup.**

---

## What this does

This MCP server connects your AI agent to the Orbis API marketplace. Your agent can:

- **Browse** 1,000+ APIs across data, AI, finance, and utilities
- **Call** any API directly — payment handled automatically via x402 on Base
- **No API keys** — agents pay per call in USDC, no accounts needed

---

## Quickstart

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "orbis": {
      "command": "npx",
      "args": ["-y", "@orbisapi/mcp"]
    }
  }
}
```

**Config file location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Cursor

Add to Cursor settings → MCP:

```json
{
  "mcpServers": {
    "orbis": {
      "command": "npx",
      "args": ["-y", "@orbisapi/mcp"]
    }
  }
}
```

### Any MCP-compatible agent

```bash
npx @orbisapi/mcp
```

---

## Available Tools

| Tool | Description |
|------|-------------|
| `browse_apis` | Search and list available APIs on Orbis |
| `call_api` | Call any API — x402 payment handled automatically |
| `register_agent` | Register your agent wallet for tracking |
| `subscribe_to_api` | Subscribe to an API for discounted access |

---

## How payments work

Orbis uses the [x402 protocol](https://x402.org) — an open HTTP payment standard built on Base. When your agent calls an API:

1. Orbis returns a `402 Payment Required` response with payment details
2. The MCP server handles the USDC payment on Base automatically
3. The API call completes — total cost: **$0.01**

No wallets to configure for browsing. To make paid calls, provide your Base wallet via `ORBIS_KEY`.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ORBIS_KEY` | No | Your Orbis API key from [orbisapi.com](https://orbisapi.com) — enables paid API calls |

---

## Links

- [Orbis Marketplace](https://orbisapi.com/marketplace)
- [For AI Agents](https://orbisapi.com/foragents)
- [x402 Protocol](https://x402.org)
- [MCP Registry listing](https://registry.modelcontextprotocol.io/servers/io.github.OrbisAPI/orbis-mcp)
- [npm package](https://www.npmjs.com/package/@orbisapi/mcp)

---

⭐ **If this is useful, star the repo** — it helps other developers find Orbis.

---

## License

MIT © [Orbis](https://orbisapi.com)
