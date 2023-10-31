const {error}  = require("./src/constants")
const File = require("./src/file")
const assert = require("assert") 


//IFEE
;(async () =>{

    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath);

        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/invalid-headers.csv'
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath);

        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/fiveItems-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/threeItems-valid.csv'
        const expected = [
            {
                id:1,
                name: 'a',
                profession: 'p1',
                age: 11
            },
            {
                id:2,
                name: 'b',
                profession: 'p2',
                age: 22
            },
            {
                id:3,
                name: 'c',
                profession: 'p3',
                age: 33
            },
        ]
        const result = await File.csvToJSON(filePath);
        await assert.deepEqual(result, expected);
    }
})()