/* Your Code Here */

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

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(ees) {
    return ees.reduce( (acc, cur) => acc + allWagesFor.call(cur), 0);
}

function findEmployeeByFirstName(ees, fn) {
    return ees.filter( ee => ee.firstName === fn )[0];  // Returns first result of the array returned by the filter
}