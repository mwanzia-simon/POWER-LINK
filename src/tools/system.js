import { exec } from "node:child_process";

export function registerSystemTools(server) {
  server.registerTool(
    "powerlink_lock",
    {
      title: "Lock Computer",
      description: "Locks the local Windows computer.",
    },
    async () => {
      exec("rundll32.exe user32.dll,LockWorkStation");

      return {
        content: [
          {
            type: "text",
            text: "Computer locked successfully.",
          },
        ],
      };
    }
  );
}