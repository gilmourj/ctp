/*
* To run, select the data you would like to uppercase/lowercase/titlecase/clean NAs and then select 
* the appropriate action from the COVID Tracking menu.
* 
* much credit to https://webapps.stackexchange.com/questions/123706/making-select-columns-uppercase
*/

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('COVID Tracking')
        .addItem('to uppercase', 'upper')
        .addItem('to lowercase', 'lower')
        .addItem('to titlecase', 'proper')
        .addItem('clean na', 'cleanna')
        .addToUi();
}
function lower() {
    run(toLowerCase)
}
function upper() {
    run(toUpperCase)
}
function proper() {
    run(toTitleCase)
}
function cleanna() {
    run(tocleanna)
}
function run(fn) {
    var r, s, v, f;
    s = SpreadsheetApp.getActiveSheet(),
    r = s.getActiveRange()
    v = r.getValues();
    f = r.getFormulas()
    r.setValues(
        v.map(function (ro) {
            return ro.map(function (el) {
                return !el ? null : typeof el !== 'string' && el ? el : fn(el);
            })
        })
    )
    keepFormulas(s, r, f);
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toLowerCase(str) {
    return str.toLowerCase();
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0)
            .toUpperCase() + txt.substr(1)
            .toLowerCase();
    });
}
function tocleanna(str) {
    return str == "#N/A" ? "" : str;
}
function keepFormulas(sheet, range, formulas) {
    var startRow, startColumn, ui, response;
    startRow = range.getRow();
    startColumn = range.getColumn();
    if (hasFormulas(formulas)) {
        ui = SpreadsheetApp.getUi();
        response = ui.alert('FORMULAS FOUND', 'Keep formulas ?', ui.ButtonSet.YES_NO);
        if (response == ui.Button.YES) {
            formulas.forEach(function (r, i) {
                r.forEach(function (c, j) {
                    if (c) sheet.getRange((startRow + i), (startColumn + j))
                        .setFormula(formulas[i][j])
                })
            })
        }
    }
}
function hasFormulas(formulas) {
    return formulas.reduce(function (a, b) {
        return a.concat(b);
    })
        .filter(String)
        .length > 0
}
