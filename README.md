# Orbis MCP Server

[![npm version](https://img.shields.io/npm/v/@orbisapi/mcp.svg)](https://www.npmjs.com/package/@orbisapi/mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![x402](https://img.shields.io/badge/payments-x402-blue)](https://x402.org)
[![Base](https://img.shields.io/badge/network-Base-0052FF)](https://base.org)

Give Claude, Cursor, Windsurf, and any MCP-compatible agent instant access to **1,000+ APIs** — paid with **$0.01 USDC on Base** via the [x402 protocol](https://x402.org). No API key juggling. Agents browse, call, and pay autonomously.

---

## What agents can do with this

- Search 1,000+ live APIs by category or keyword
- Call any API — free tiers auto-subscribe, paid tiers settle via USDC on Base
- Pay per call with x402 (no monthly subscriptions required)
- Access weather, financial data, text utilities, crypto feeds, image tools, and more

---

## Quick Setup

### Claude Desktop (recommended — remote server, no install needed)

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "orbis": {
      "url": "https://orbisapi.com/api/mcp",
      "headers": {
        "x-orbis-key": "YOUR_ORBIS_KEY"
      }
    }
  }
}
```

No key? Remove the `headers` block — tools will prompt for credentials on first call, or call `register_agent` to create a free account.

---

### Cursor / Windsurf

Add to your `.cursor/mcp.json` or equivalent:

```json
{
  "mcp": {
    "servers": {
      "orbis": {
        "url": "https://orbisapi.com/api/mcp",
        "transport": "sse",
        "headers": {
          "x-orbis-key": "YOUR_ORBIS_KEY"
        }
      }
    }
  }
}
```

---

### npx (stdio mode — any MCP host)

```bash
npx @orbisapi/mcp
```

Or install globally:

```bash
npm install -g @orbisapi/mcp
orbis-mcp
```

Then add to your MCP host config:

```json
{
  "mcpServers": {
    "orbis": {
      "command": "npx",
      "args": ["-y", "@orbisapi/mcp"],
      "env": {
        "ORBIS_KEY": "YOUR_ORBIS_KEY"
      }
    }
  }
}
```

---

## Get an Orbis Key

1. Go to [orbisapi.com](https://orbisapi.com)
2. Sign up (free)
3. Copy your API key from the dashboard

No key required to try — use anonymous mode and register via the `register_agent` tool.

---

## Available Tools

| Tool | Description |
|------|-------------|
| `browse_apis` | Search 1,000+ APIs by keyword or category. Returns pricing, endpoints, and tier info. |
| `call_api` | Call any Orbis API. Free tiers auto-subscribe. x402 tiers pay $0.01 USDC on Base. |
| `register_agent` | Create a free Orbis account for your agent (one-time setup). |
| `subscribe_to_api` | Subscribe to a specific API tier and receive an API key. |

---

## Example — asking Claude to use Orbis

> "Search Orbis for a weather API and get the current conditions in London"

Claude will:
1. Call `browse_apis` with `search: "weather"`
2. Pick an API and call `call_api` with the slug and endpoint
3. Return the weather data

---

## x402 Payments

Orbis supports [x402](https://x402.org) — the open HTTP payment standard from Coinbase. Agents with a funded Base wallet can pay per API call in USDC with zero setup:

```
$0.01 USDC per call → settled on Base → no subscription required
```

Pass a signed EIP-3009 payment header as `x_payment` in `call_api` for autonomous agent payments.

---

## API Categories

- Weather & Environmental
- Financial Data & Markets  
- Text Processing & NLP
- Crypto & Blockchain
- Image & Media
- Developer Utilities
- Health & Science
- Business & B2B

Full catalog: [orbisapi.com/marketplace](https://orbisapi.com/marketplace)

---

## Links

- **Website:** [orbisapi.com](https://orbisapi.com)
- **Marketplace:** [orbisapi.com/marketplace](https://orbisapi.com/marketplace)
- **x402 Protocol:** [x402.org](https://x402.org)
- **Base Network:** [base.org](https://base.org)

---

## License

MIT
