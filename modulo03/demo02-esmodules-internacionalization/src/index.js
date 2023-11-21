import database from "./../database.json" assert { type: "json" };
import TerminalController from "./terminalController.js";
import Person from './person.js'

const DEFAULT_LANGUAGE = "pt-BR"
const STOP_TERM = ":q"

const terminalController = new TerminalController();
terminalController.initializeTerminar(database, DEFAULT_LANGUAGE);

async function mainLoop(){
    try {
        const answer = await terminalController.question("What?")
        console.log('Anwer:', answer)

        if (answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log("process finished!")
            return;
        }

        const person = Person.generateInstanceFromString(answer);
        console.log('person', person.formatted(DEFAULT_LANGUAGE))

        mainLoop();
    } catch (error) {
        console.error("Erro:", error)
        mainLoop();
    }
}

await mainLoop();