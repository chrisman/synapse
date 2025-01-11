import Program from "../src/Program.ts";

const program = new Program(
  "http://localhost:3000/orders",
  "http://localhost:3000/alerts",
  "http://localhost:3000/orders",
  console.log,
);

program.Main({ opts: "default" });
