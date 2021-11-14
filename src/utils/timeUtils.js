export function count_Date_Difference_In_Days(date) {
    var date1 = new Date(date);
    var date2 = new Date();
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24))
    return Difference_In_Days
}


export function get30DaysAgoDate() {
    let today = new Date()
    var priorDate = new Date().setDate(today.getDate() - 30)
    let d = new Date(priorDate)

    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}