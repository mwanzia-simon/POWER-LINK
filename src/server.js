import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSystemTools } from "./tools/system.js";

const server = new McpServer({
  name: "powerlink",
  version: "0.1.0",
});

registerSystemTools(server);

const transport = new StdioServerTransport();

await server.connect(transport);