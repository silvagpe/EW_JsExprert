//Para importar do mesmo diretório
//--experimental-specifier-resolution=node
// para importar o json usar a flag
//--experimental-json-modules
//import FluentSQLBuilder from './../fluentsql-jest-tdd-yt/index.js'
import FluentSQLBuilder from '@silvagpe/fluentsql';
import database from './database/data.json' assert { type: 'json'}


const result = FluentSQLBuilder
    .for(database)
    .where({ registered: /^(2020|2019)/ })
    .select(['name'])
    .limit(3)
    .CountBy('name')
    // .groupCount('name')
    .build();

console.log(result)