import readline from 'readline'
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chackTable from 'chalk-table'
import Person from './person.js'



export default class TerminalController{

    constructor(){
        this.print = {}
        this.data = {}
        this.ternimal = {}
    }

    initializeTerminar(database, language){
        DraftLog(console).addLineListener(process.stdin)   
        this.ternimal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }) 

        this.initializeTables(database, language);
    }

    initializeTables(database, language){
        const data = database.map(item => new Person(item).formatted(language))

        const table = chackTable(this.getTableOptions(), data)
        this.print = console.draft(table)
        this.data = data


    }

    updateTable(item){
        this.data.push(item)
        this.print(chackTable(this.getTableOptions(), this.data))

    }

    question(msg){       
        return new Promise(resolve => this.ternimal.question(msg, resolve)); 
        // this.ternimal.question('Qual é seu nome', msg =>{
        //     console.log('msg', msg.toString())
        // })
    }

    closeTerminal(){
        this.ternimal.close()
    }

    getTableOptions(){
        return {
            leftPad: 2,
            columns:[
                { field: "id", name: chalk.cyan("ID")},
                { field: "vehicles", name: chalk.magenta("Vehicles")},
                { field: "kmTraveled", name: chalk.cyan("KM Traveled")},
                { field: "from", name: chalk.cyan("From")},
                { field: "to", name: chalk.cyan("To")}
            ]
        }
    }
}