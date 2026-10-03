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

  server.registerTool(
    "powerlink_shutdown",
    {
      title: "Shutdown Computer",
      description: "Shuts down the local Windows computer.",
    },
    async () => {
      exec("shutdown /s /t 0");

      return {
        content: [
          {
            type: "text",
            text: "Computer shutdown initiated.",
          },
        ],
      };
    }
  );

  server.registerTool(
    "powerlink_restart",
    {
      title: "Restart Computer",
      description: "Restarts the local Windows computer.",
    },
    async () => {
      exec("shutdown /r /t 0");

      return {
        content: [
          {
            type: "text",
            text: "Computer restart initiated.",
          },
        ],
      };
    }
  );
}