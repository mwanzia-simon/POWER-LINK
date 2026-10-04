import express from "express";
import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { registerSystemTools } from "./tools/system.js";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.POWERLINK_API_KEY;

app.use(express.json());

function createPowerLinkServer() {
  const server = new McpServer({
    name: "powerlink",
    version: "0.1.0",
  });

  registerSystemTools(server);

  return server;
}

// Health check
app.get("/", (req, res) => {
  res.json({
    name: "PowerLink",
    status: "running",
  });
});

// MCP endpoint
app.all("/mcp", async (req, res) => {
  const server = createPowerLinkServer();

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (error) {
    console.error("MCP request error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal MCP server error",
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`PowerLink running on http://localhost:${PORT}`);
  console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);
});