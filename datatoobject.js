const _ = require("lodash");
const csv = require("csvtojson");
let CATAGORY = [];
let FINANCED = [];
let PROJECT = [];
let countryTable = [];
let currencyTable = [];
let data2018 = "./ks-projects-201801.csv";

csv()
    .fromFile(data2018)
    .on("csv", (csvrow) => {
        //Removes 3797 Bad Data Entries
        if(csvrow[11] == "N,0\""){
            return;
        }
        if (countryTable[String(csvrow[11])] == undefined) {
            countryTable[String(csvrow[11])] = _.values(countryTable).length
        }
        if (currencyTable[String(csvrow[4])] == undefined) {
            currencyTable[String(csvrow[4])] = _.values(currencyTable).length
        }
        CATAGORY['k'+String(csvrow[0])] = {
            'MAIN_CAT': String(csvrow[3]),
            'SUB_CAT': String(csvrow[2]),
            'PROJECT_KEY': Number(csvrow[0])
        };
        FINANCED['k'+String(csvrow[0])] = {
            'LAUNCH_DATE': String(csvrow[7]),
            'END_DATE': String(csvrow[5]),
            'COUNTRY': Number(countryTable[String(csvrow[11])]),
            'CURRENCY': Number(currencyTable[String(csvrow[4])]),
            'NR_INVESTORS': Number(csvrow[10]),
            'GOAL_SUM': Number(csvrow[6]),
            'ACHIVED_SUM': Number(csvrow[8])
        };
        PROJECT['k'+String(csvrow[0])] = {
            'PROJECT_KEY': Number(csvrow[0]),
            'PROJECT_NAME': String(csvrow[1]),
            'LAUNCH_DATE': String(csvrow[7]),
            'END_DATE': String(csvrow[5])
        };
    }).on("done", () => {
        console.log(countryTable);
        console.log(currencyTable);
    });