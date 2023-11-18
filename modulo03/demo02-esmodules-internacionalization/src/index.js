import DraftLog from 'draftlog'
import chalk from 'chalk'
import chackTable from 'chalk-table'
import database from "./../database.json" assert { type: "json" };
import readline from 'readline'
import Person from './person.js';

DraftLog(console).addLineListener(process.stdin)
Person

const options = {
    leftPad: 2,
    columns:[
        { field: "id", name: chalk.cyan("ID")},
        { field: "vehicles", name: chalk.magenta("Vehicles")},
        { field: "kmTraveled", name: chalk.cyan("KM Traveled")},
        { field: "from", name: chalk.cyan("From")},
        { field: "to", name: chalk.cyan("To")}
    ]
}

const table = chackTable(options, database.map(item => new Person(item).formatted("pt-BR")))
const print = console.draft(table)

const ternimal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

ternimal.question('Qual é seu nome', msg =>{
    console.log('msg', msg.toString())
})



