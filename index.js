/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(arr) {
    return {
        firstName : arr[0],
        familyName : arr[1],
        title : arr[2],
        payPerHour : arr[3],
        timeInEvents : [],
        timeOutEvents : []
    }
};

function createEmployeeRecords(arr) {
    const retArr = [];
    for (let i=0; i < arr.length; i++) {
        retArr.push(createEmployeeRecord(arr[i]));
    }
    return retArr;
};

function createTimeInEvent(dateTimeString) {
    const arr = dateTimeString.split(' ');
    const obj = {
        type : 'TimeIn',
        hour : parseInt(arr[1]),
        date : arr[0]
    };
    this.timeInEvents.push(obj);
    return this;
}

function createTimeOutEvent(dateTimeString) {
    const arr = dateTimeString.split(' ');
    const obj = {
        type : 'TimeOut',
        hour : parseInt(arr[1]),
        date : arr[0]
    };
    this.timeOutEvents.push(obj);
    return this;
}

function hoursWorkedOnDate(dateStr) {
    const allPunchIns = this.timeInEvents;
    const allPunchOuts = this.timeOutEvents;
    // In the real world there could be more than one punch in and out in a day,
    //   but not in this example.
    const datePunchIn = allPunchIns.filter(punch => punch.date === dateStr);
    const punchIn = datePunchIn[0].hour;
    const datePunchOut = allPunchOuts.filter(punch => punch.date === dateStr);
    const punchOut = datePunchOut[0].hour;
    return (punchOut - punchIn)/100;
}

function wagesEarnedOnDate(dateStr) {
    const hours = hoursWorkedOnDate.call(this,dateStr);
    const rate = this.payPerHour;
    return rate * hours;
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// function calculatePayroll(ees) {
//     return ees.reduce( (acc, cur) => {
//         console.log(acc);
//         return acc + allWagesFor(cur);
//     }, 0);
// }

function calculatePayroll(ees) {
    return ees.reduce( (acc, cur) => acc + allWagesFor.call(cur), 0);
}

function findEmployeeByFirstName(ees, fn) {
    return ees.filter( ee => ee.firstName === fn )[0];  // Returns first result of the array returned by the filter
}




let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

let sTimeData = [
  ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
  ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
]

let rTimeData = [
  ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
  ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
]

sTimeData.forEach(function (d) {
  let [dIn, dOut] = d
  createTimeInEvent.call(sRecord, dIn)
  createTimeOutEvent.call(sRecord, dOut)
})

rTimeData.forEach(function (d, i) {
  let [dIn, dOut] = d
  createTimeInEvent.call(rRecord, dIn)
  createTimeOutEvent.call(rRecord, dOut)
})

let grandTotalOwed = [sRecord, rRecord].reduce((m, e) => m + allWagesFor.call(e), 0)

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
]

const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
]

const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
]

let employeeRecords = createEmployeeRecords(csvDataEmployees)
employeeRecords.forEach(function (rec) {
let timesInRecordRow = csvTimesIn.find(function (row) {
    return rec.firstName === row[0]
})

let timesOutRecordRow = csvTimesOut.find(function (row) {
    return rec.firstName === row[0]
})

timesInRecordRow[1].forEach(function(timeInStamp){
    createTimeInEvent.call(rec, timeInStamp)
})

timesOutRecordRow[1].forEach(function(timeOutStamp){
    createTimeOutEvent.call(rec, timeOutStamp)
})
}) 


// console.log(calculatePayroll(employeeRecords));