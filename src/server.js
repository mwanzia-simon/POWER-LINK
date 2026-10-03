import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerSystemTools } from "./tools/system.js";

const app = express();
const PORT = 3000;

const server = new McpServer({
  name: "powerlink",
  version: "0.1.0",
});

registerSystemTools(server);

app.get("/", (req, res) => {
  res.json({
    name: "PowerLink",
    status: "running",
  });
});

app.listen(PORT, () => {
  console.log(`PowerLink running on http://localhost:${PORT}`);
});