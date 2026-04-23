import { Command } from "commander";

const program = new Command();

program
	.name("specforge")
	.description(
		"SpecForge is a CLI-first tool that bootstraps and adapts software projects for Spec-Driven Development (SDD), enabling efficient AI-assisted development with minimal setup.",
	)
	.version("0.0.0");

program.parse(process.argv);
