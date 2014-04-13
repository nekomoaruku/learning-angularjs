(function() {
  var calendar = function() {

    var value = {
      calendarDate: null,
      year: null,
      month: null,
      weeks: null
    };

    function _weeksArray(date) {

      // ついたちの曜日。Sunday:0 to Saturday:6
      var startDayOfTheWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

      // 月の最終日
      var lastDateOfTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

      // 日付を入れる配列を6週間分用意
      var dayArray = new Array(7 * 6);

      // 月の最初の曜日に注意して、日付を入れていく
      // 1日が火曜日なら、[undefined, undefined, 1, 2, ...] となる
      for (var day = 1; day <= lastDateOfTheMonth; day++) {
        dayArray[day - 1 + startDayOfTheWeek] = day;
      }

      // 7日毎に切り出して、weeksに代入。
      var weeks = [];
      for (var index = 0; index < dayArray.length; index += 7) {
        var week = dayArray.slice(index, index+7);
        // 第5週や第6週が空っぽでないかチェック。
        if (week[0] || week[6]) {
          weeks.push(week);
        }
      }

      return weeks;
    }

    function setCalendarDate(date) {
      value.calendarDate = date;
      value.year = date.getFullYear();
      value.month = date.getMonth() + 1;
      value.weeks = _weeksArray(date);
    }

    function getCalendarDate() {
      return value.calendarDate;
    }

    return {
      value: value,
      setCalendarDate: setCalendarDate,
      getCalendarDate: getCalendarDate
    }

  };
  app.factory('calendar', calendar);
})();