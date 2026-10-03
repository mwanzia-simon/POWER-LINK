#  PowerLink

> Control your local computer through ChatGPT.

**PowerLink** is a lightweight local application that connects ChatGPT with your computer, allowing AI commands to trigger actions on your machine.

The initial goal is simple: expose a small set of safe system-control tools that ChatGPT can call through a local Node.js application.

##  Initial Features

PowerLink will initially support:

* 🔒 **Lock** — Lock the computer
* ⏻ **Shutdown** — Shut down the computer
* 🔄 **Restart** — Restart the computer

More system controls may be added in future versions.

## 🧠 How It Works

The basic architecture is:

```text
┌──────────────┐
│   ChatGPT    │
└──────┬───────┘
       │
       │ Tool call
       ▼
┌──────────────┐
│   PowerLink  │
│  Node.js App │
└──────┬───────┘
       │
       │ System command
       ▼
┌──────────────┐
│   Your PC    │
└──────────────┘
```

For example:

```text
User:
"Lock my computer"

        ↓

ChatGPT
        ↓

PowerLink → lock()

        ↓

Windows locks the computer
```

## 🛠️ Tech Stack

* **Node.js**
* **JavaScript**
* **MCP (Model Context Protocol)**
* **Windows system commands**
* **npm**

## 📁 Project Structure

The initial project will remain intentionally simple:

```text
powerLink/
│
├── src/
│   ├── index.js
│   └── tools/
│       └── system.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

The structure can evolve as PowerLink gains more functionality.

## 🔐 Security

PowerLink can execute commands directly on the local computer, so security is an important part of the project.

The application should:

* Run locally on the user's machine
* Only expose explicitly defined tools
* Validate tool inputs
* Avoid exposing unrestricted shell access
* Require appropriate authorization for sensitive operations
* Keep secrets and configuration out of source control

PowerLink should **not** provide ChatGPT with unrestricted access to the operating system.

## 🎯 Project Goals

PowerLink is being built as both a useful tool and a learning project.

The main goals are to learn about:

* MCP servers
* AI tool calling
* Local AI integrations
* Node.js applications
* System-level commands
* API/tool security
* Environment configuration
* Communication between AI applications and local software

## 🗺️ Roadmap

### Version 1 — Basic System Control

* [ ] Set up Node.js project
* [ ] Set up MCP server
* [ ] Create `lock` tool
* [ ] Create `shutdown` tool
* [ ] Create `restart` tool
* [ ] Test tools locally
* [ ] Connect PowerLink to ChatGPT

### Version 2 — More Controls

Potential future tools:

* [ ] Sleep computer
* [ ] Log out
* [ ] Get system status
* [ ] Get battery information
* [ ] Get operating system information
* [ ] Open an application
* [ ] Open a website

### Version 3 — Advanced PowerLink

Potential future improvements:

* [ ] Permission system
* [ ] Command confirmation
* [ ] Action logging
* [ ] Configurable commands
* [ ] Cross-platform support
* [ ] Windows + Linux + macOS support

## 💡 Example Commands

Once configured, the goal is to be able to say things such as:

```text
"Lock my PC"

"Restart my computer"

"Shut down my computer"
```

PowerLink receives the corresponding tool call and performs the requested operation locally.

## ⚠️ Disclaimer

PowerLink is a local system-control project. Commands such as shutdown and restart directly affect the computer running the application.

Only run PowerLink on a computer you control, and carefully consider which system operations you expose as AI tools.

## 📜 License

This project is currently intended as a personal learning project.
