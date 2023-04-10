function generateHelpMessage(commands) {
  const helpMessage = ["Here are the available commands:"];

  for (const command in commands) {
    helpMessage.push(`${command} - ${commands[command].description}`);
  }

  return helpMessage.join("\n");
}

const commands = {
  "/help": {
    response: () => generateHelpMessage(commands),
    description: "Show this help message",
    fixed: true,
  },
  "/command2": {
    response: "This is the response for command2.",
    description: "Description for command2",
    fixed: true,
  },
  "/dynamic": {
    description: "A dynamic command that goes through processMessage",
    context: "This is some context for the dynamic command.",
  },
};

module.exports = { commands };
