import { exec } from "node:child_process";

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

export function registerSystemTools(server) {
  server.registerTool(
    "powerlink_lock",
    {
      title: "Lock Computer",
      description: "Locks the local Windows computer.",
    },
    async () => {
      try {
        await executeCommand(
          "rundll32.exe user32.dll,LockWorkStation"
        );

        return {
          content: [
            {
              type: "text",
              text: "Computer locked successfully.",
            },
          ],
        };
      } catch (error) {
        console.error("Lock command failed:", error);

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to lock the computer.",
            },
          ],
        };
      }
    }
  );

  server.registerTool(
  "powerlink_shutdown",
  {
    title: "Shutdown Computer",
    description:
      "Shuts down the local Windows computer. Requires explicit confirmation.",
    inputSchema: {
      confirmed: {
        type: "boolean",
        description:
          "Must be true to confirm that the computer should be shut down.",
      },
    },
  },
  async ({ confirmed }) => {
    if (confirmed !== true) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Shutdown cancelled. Explicit confirmation is required.",
          },
        ],
      };
    }

    try {
      await executeCommand("shutdown /s /t 0");

      return {
        content: [
          {
            type: "text",
            text: "Computer shutdown initiated.",
          },
        ],
      };
    } catch (error) {
      console.error("Shutdown command failed:", error);

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Failed to shut down the computer.",
          },
        ],
      };
    }
  }
);

server.registerTool(
  "powerlink_restart",
  {
    title: "Restart Computer",
    description:
      "Restarts the local Windows computer. Requires explicit confirmation.",
    inputSchema: {
      confirmed: {
        type: "boolean",
        description:
          "Must be true to confirm that the computer should be restarted.",
      },
    },
  },
  async ({ confirmed }) => {
    if (confirmed !== true) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Restart cancelled. Explicit confirmation is required.",
          },
        ],
      };
    }

    try {
      await executeCommand("shutdown /r /t 0");

      return {
        content: [
          {
            type: "text",
            text: "Computer restart initiated.",
          },
        ],
      };
    } catch (error) {
      console.error("Restart command failed:", error);

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Failed to restart the computer.",
          },
        ],
      };
    }
  }
);
}