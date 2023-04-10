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
  // "/command2": {
  //   response: "This is the response for command2.",
  //   description: "Description for command2",
  //   fixed: true,
  // },
  "/delmano-chat": {
    description:
      'Get a response from Chat GPT. Write /delmano-chat "your question"',
    context: "Use the same language for response",
  },
};

module.exports = { commands };
