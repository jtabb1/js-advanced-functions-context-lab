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

function createTimeInEvent(employeeRecord,dateTimeString) {
    const arr = dateTimeString.split(' ');
    const obj = {
        type : 'TimeIn',
        hour : parseInt(arr[1]),
        date : arr[0]
    };
    employeeRecord.timeInEvents.push(obj);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord,dateTimeString) {
    const arr = dateTimeString.split(' ');
    const obj = {
        type : 'TimeOut',
        hour : parseInt(arr[1]),
        date : arr[0]
    };
    employeeRecord.timeOutEvents.push(obj);
    return employeeRecord;
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