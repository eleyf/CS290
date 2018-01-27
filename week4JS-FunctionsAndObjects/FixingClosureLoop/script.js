/*
**  eleyf
**  1/27/18
**  cs290 w2018
**  Activity Fixing Closure Loop
*/


function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        result[i] = function (x) {
            return function () {
                var item = 'item' + list[x];
                result.push(function () {
                    alert(item + ' ' + list[x])
                });
            };
        }(i);
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();
