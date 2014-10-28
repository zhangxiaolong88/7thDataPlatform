/**
 * 日期选择器
 */

/**
 * @param {String} inputId ID值
 * @param {object} options 参数配置
 */
function pickerDateRange(inputId, options) {
    /**
     * 默认参数
     */
    var defaults = {
        s_startDate: '', // 起始时间段的开始日期
        s_endDate: '', // 起始时间段的结束日期
        e_startDate: '', // 终止时间段的开始日期
        e_endDate: '', // 终止时间段的结束日期
        minValidDate: '315507600', //最小可用时间，控制日期选择器的可选力度
        maxValidDate: '', // 最大可用时间，与stopToday 配置互斥
        success: function(obj) {
            return true;
        }, //回调函数，选择日期之后执行何种操作
        s_startDateId: 's_startDate', // 起始时间段的开始日期输入框ID
        s_endDateId: 's_endDate', // 起始时间段的结束日期输入框ID
        e_startDateId: 'e_startDate', // 终止时间段的开始日期输入框ID
        e_endDateId: 'e_endDate', // 终止时间段的结束日期输入框ID
        target: '', // 日期选择框的目标，一般为 <form> 的ID值
        suffix: 'suffix', //相应控件的后缀
        inputTrigger : 'input_trigger',
        calendars: 2, // 展示的月份数，最大是2
        dayRangeMax: 0, // 日期最大范围(以天计算)
        monthRangeMax: 12, // 日期最大范围(以月计算)
        isSingle: false,
        countPeriod: 1, // 3:月 2:周 1:日
        dateTable: 'dateRangeDateTable', // 日期表格的CSS类
        s_selectCss: 'dateRangeSelected', // 起始时间段的样式
        e_selectCss: 'dateRangeCompare', // 终止时间段的样式
        coincideCss: 'dateRangeCoincide', // 重合部分的样式
        firstCss: 'first', //起始样式
        lastCss: 'last', //结束样式
        clickCss: 'today', //点击样式
        disableGray: 'dateRangeGray', // 非当前月的日期样式
        isToday: 'dateRangeToday', // 今天日期的样式
        joinLineId: 'joinLine',
        defaultText: ' 至 ',
        stopToday: true,
        isTodayValid: true,
        weekendDis: false, //灰掉周末不可选。
        disCertainDay: [], //不可用的周日期设置数组，如：[1,3]是要周一， 周三 两天不可选，每个周的周一，周三都不可选择。
        disCertainDate: [], //不可用的日期设置数组，如:[1,3]是要1号，3号 两天不可选，特别的，[true,1,3]则反之，只有1，3可选，其余不可选。
        theme: 'gri' //日期选择器的主题，目前支持 'gri' / 'ta'
    };
    //将对象赋给__method变量
    var __method = this;

    this.inputId = inputId;
    // 配置参数
    this.mOpts = $.extend({}, defaults, options);
    //默认日历参数最大是3
    this.mOpts.calendars = Math.min(this.mOpts.calendars, 3);
    //根据不同主题需要初始化的变量
    this.mOpts.e_selectCss = this.mOpts.theme == 'ta' ? this.mOpts.s_selectCss : this.mOpts.e_selectCss
    // 随机ID后缀
    var suffix = '' == this.mOpts.suffix ? (new Date()).getTime() : this.mOpts.suffix;
    // 日期选择框DIV的ID
    this.calendarId = 'calendar_' + suffix;
    // 日期列表DIV的ID
    this.dateListId = 'dateRangePicker_' + suffix;
    // 起始时间段日期选择层
    this.s_dateRangeDiv = 's_dateRangeDiv_' + suffix;
    // 终止时间段日期比较层
    this.e_dateRangeDiv = 'e_dateRangeDiv_' + suffix;
    // 时间选择的确认按钮
    this.submitBtn = 'submit_' + suffix;
    // 日期选择框关闭按钮
    this.closeBtn = 'closeBtn_' + suffix;
    // 上一个月的按钮
    this.preMonth = 'dateRangePreMonth_' + suffix;
    // 下一个月的按钮
    this.nextMonth = 'dateRangeNextMonth_' + suffix;
    // 表单中开始、结束、开始对比、结束对比时间
    this.s_startDateId = this.mOpts.s_startDateId + '_' + suffix;
    this.s_endDateId = this.mOpts.s_endDateId + '_' + suffix;
    this.e_startDateId = this.mOpts.e_startDateId + '_' + suffix;
    this.e_endDateId = this.mOpts.e_endDateId + '_' + suffix;
    // 初始化日期选择器面板的HTML代码串
    var wrapper = {
        ta: [
            '<div id="' + this.calendarId + '" class="ta_calendar ta_calendar2 cf">',
            '<div class="ta_calendar_cont cf" id="' + this.dateListId + '">',
            '</div>',
            '<div class="ta_calendar_footer cf">',
            '<div class="frm_msg">',
            '<div id="' + this.s_dateRangeDiv + '">',
            '<span id="o_d">单日：</span>',
            '<span id="o_w">单周：</span>',
            '<span id="o_m">单月：</span>',
            '<span id="s_d">开始日：</span>',
            '<span id="s_w">开始周：</span>',
            '<span id="s_m">开始月：</span>',
            '<input type="text" class="ta_ipt_text_s" name="' + this.s_startDateId + '" id="' + this.s_startDateId + '" value="' + this.mOpts.s_startDate + '" readonly />',
            '<span id="' + this.mOpts.joinLineId + '_1" class="' + this.mOpts.joinLineId + '"> - </span>',
            '<span id="e_d">结束日：</span>',
            '<input type="text" class="ta_ipt_text_s" name="' + this.s_endDateId + '" id="' + this.s_endDateId + '" value="' + this.mOpts.s_endDate + '" readonly /><br />',
            '</div>',
            '<div id="' + this.e_dateRangeDiv + '">',
            '<span id="e_w">结束周：</span>',
            '<span id="e_m">结束月：</span>',
            '<input type="text" class="ta_ipt_text_s" name="' + this.e_startDateId + '" id="' + this.e_startDateId + '" value="' + this.mOpts.e_startDate + '" readonly />',
            '<span id="' + this.mOpts.joinLineId + '_2" class="' + this.mOpts.joinLineId + '"> - </span>',
            '<input type="text" class="ta_ipt_text_s" name="' + this.e_endDateId + '" id="' + this.e_endDateId + '" value="' + this.mOpts.e_endDate + '" readonly />',
            '</div>',
            '</div>',
            '<div class="frm_btn">',
            '<input class="ta_btn ta_btn_primary" type="button" name="' + this.submitBtn + '" id="' + this.submitBtn + '" value="确定" />',
            '<input class="ta_btn" type="button" id="' + this.closeBtn + '" value="取消"/>',
            '</div>',
            '</div>',
            '</div>'
        ]
    };

    // 把时间选择框放到页面中
    $(document.body).append(wrapper[this.mOpts.theme].join(''));
    $('#' + this.calendarId).css('z-index', 9999);
    // 初始化目标地址的元素
    if (1 > $('#' + this.mOpts.s_startDateId).length) {
        $('' != this.mOpts.target ? '#' + this.mOpts.target : 'body').append('<input type="hidden" id="' + this.mOpts.s_startDateId + '" name="' + this.mOpts.s_startDateId + '" value="' + this.mOpts.s_startDate + '" />');
    } else {
        $('#' + this.mOpts.s_startDateId).val(this.mOpts.s_startDate);
    }
    if (1 > $('#' + this.mOpts.s_endDateId).length) {
        $('' != this.mOpts.target ? '#' + this.mOpts.target : 'body').append('<input type="hidden" id="' + this.mOpts.s_endDateId + '" name="' + this.mOpts.s_endDateId + '" value="' + this.mOpts.s_endDate + '" />');
    } else {
        $('#' + this.mOpts.s_endDateId).val(this.mOpts.s_endDate);
    }
    if (1 > $('#' + this.mOpts.e_startDateId).length) {
        $('' != this.mOpts.target ? '#' + this.mOpts.target : 'body').append('<input type="hidden" id="' + this.mOpts.e_startDateId + '" name="' + this.mOpts.e_startDateId + '" value="' + this.mOpts.e_startDate + '" />');
    } else {
        $('#' + this.mOpts.e_startDateId).val(this.mOpts.e_startDate);
    }
    if (1 > $('#' + this.mOpts.e_endDateId).length) {
        $('' != this.mOpts.target ? '#' + this.mOpts.target : 'body').append('<input type="hidden" id="' + this.mOpts.e_endDateId + '" name="' + this.mOpts.e_endDateId + '" value="' + this.mOpts.e_endDate + '" />');
    } else {
        $('#' + this.mOpts.e_endDateId).val(this.mOpts.e_endDate);
    }

    // 输入框焦点定在第一个输入框
    this.dateInput = this.s_startDateId;
    // 为新的输入框加背景色
    this.changeInput(this.dateInput);

    // 起始时间段 开始时间 input 的 click 事件
    $('#' + this.s_startDateId).bind('click', function() {
        //__method.removeCSS(1);
        //__method.addCSS(1);
        __method.changeInput(__method.s_startDateId);
        return false;
    });
    $('#' + this.calendarId).bind('click', function(event) {
        //event.preventDefault();
        // 防止冒泡
        event.stopPropagation();
    });
    // 终止时间段 开始时间 input 的 click 事件
    $('#' + this.e_startDateId).bind('click', function() {
        //__method.removeCSS(0);
        //__method.addCSS(0);
        __method.changeInput(__method.e_startDateId);
        return false;
    });
    /**
     * 设置回调句柄，点击成功后，返回一个时间对象，包含起始时间段的2个时间和终止时间段的2个时间
     */
    $('#' + this.submitBtn).bind('click', function() {
        __method.close();
        __method.mOpts.success({
            's_startDate': $('#' + __method.mOpts.s_startDateId).val(),
            's_endDate': $('#' + __method.mOpts.s_endDateId).val(),
            'e_startDate': $('#' + __method.mOpts.e_startDateId).val(),
            'e_endDate': $('#' + __method.mOpts.e_endDateId).val()
        });
        return false;
    });
    // 日期选择关闭按钮的 click 事件
    $('#' + this.closeBtn).bind('click', function() {
        __method.close();
        return false;
    });
    // 为输入框添加click事件
    $('#' + this.inputId).unbind("click").bind('click', function() {
        __method.init();
        __method.show();
        return false;
    });
    $('#' + this.mOpts.inputTrigger).unbind("click").bind('click', function() {
        __method.init();
        __method.show(false, __method);
        return false;
    });
    // 初始化开始
    this.init();
    // 关闭日期选择框，并把结果反显到输入框
    this.close();


    //让用户点击页面即可关闭弹窗
    $(document).bind('click', function() {
        __method.close();
    });
};

/**
 * @description 日期选择器的初始化方法，对象原型扩展
 * @param {Boolean} isCompare 标识当前初始化选择面板是否是对比日期
 */
pickerDateRange.prototype.init = function(isCompare) {
    var __method = this;
    var minDate, maxDate;
    // 清空日期列表的内容
    $("#" + this.dateListId).empty();

    // 如果结束日期为空，则取当天的日期为结束日期
    var s_endDate = '' == this.mOpts.s_endDate ? (new Date()) : this.str2date(this.mOpts.s_endDate);
    // 日历结束时间
    this.calendar_s_endDate = new Date(s_endDate.getFullYear(), s_endDate.getMonth() + 1, 0);
    // 计算并显示以 s_endDate 为结尾的最近几个月的日期列表
    for (var i = 0; i < this.mOpts.calendars; i++) {
        var td = this.fillDate(s_endDate.getFullYear(), s_endDate.getMonth(), i);
        if (0 == i) {
            $("#" + this.dateListId).append(td);
        } else {
            var firstTd = $("#" + this.dateListId).find('table').get(0);
            $(firstTd).before(td);
        }
        s_endDate.setMonth(s_endDate.getMonth() - 1, 1);
    }

    // 上一个月
    $('#' + this.preMonth).bind('click', function() {
        __method.calendar_s_endDate.setMonth(__method.calendar_s_endDate.getMonth() - 1, 1);
        __method.mOpts.s_endDate = __method.date2ymd(__method.calendar_s_endDate).join('-');
        __method.init();
        //如果是单月选择的时候，要控制input输入框
        if (1 == __method.mOpts.calendars) {
            if ('' == $('#' + __method.s_startDateId).val()) {
                __method.changeInput(__method.s_startDateId);
            } else {
                __method.changeInput(__method.s_endDateId);
            }
        }
        return false;
    });
    // 下一个月
    $('#' + this.nextMonth).bind('click', function() {
        __method.calendar_s_endDate.setMonth(__method.calendar_s_endDate.getMonth() + 1, 1);
        __method.mOpts.s_endDate = __method.date2ymd(__method.calendar_s_endDate).join('-');
        __method.init();
        //如果是单月选择的时候，要控制input输入框 added by johnnyzheng 2011-12-19
        if (1 == __method.mOpts.calendars) {
            if ('' == $('#' + __method.s_startDateId).val()) {
                __method.changeInput(__method.s_startDateId);
            } else {
                __method.changeInput(__method.s_endDateId);
            }
        }
        return false;
    });
    // 日历开始时间
    this.calendar_s_startDate = new Date(s_endDate.getFullYear(), s_endDate.getMonth() + 1, 1);
    // 初始化时间选区背景
    __method.addCSS(0);

    // 让用户手动关闭或提交日历，每次初始化的时候绑定，关闭的时候解绑
    $(document).bind('click', function() {
        __method.close();
    });
};

/** 
 * @description 销毁组件
 */
pickerDateRange.prototype.destroy = function() {
    var __method = this;
    $("#" + this.calendarId).remove();
    $('#' + this.inputId).unbind("click");
    $('#' + this.mOpts.inputTrigger).unbind("click");
}

/**
 * @description 移除选择日期面板的样式
 * @param {Boolean} isCompare 是否是对比日期面板
 * @param {String} specialClass 特殊的样式，这里默认是常规和对比日期两种样式的重合样式
 */
pickerDateRange.prototype.removeCSS = function(isCompare, specialClass) {
    // 初始化对比时间重合部分的样式类
    if ('undefined' == typeof(specialClass)) {
        specialClass = this.mOpts.theme + '_' + this.mOpts.coincideCss;
    }
    // 是否移除对比部分的样式:0 日期选择;1 对比日期选择
    if ('undefined' == typeof(isCompare)) {
        isCompare = 0;
    }

    // 整个日期列表的开始日期
    var bDate = new Date(this.calendar_s_startDate.getFullYear(), this.calendar_s_startDate.getMonth(), this.calendar_s_startDate.getDate());
    var cla = '';
    // 从开始日期循环到结束日期
    for (var d = new Date(bDate); d.getTime() <= this.calendar_s_endDate.getTime(); d.setDate(d.getDate() + 1)) {
        if (0 == isCompare) {
            // 移除日期样式
            cla = this.mOpts.theme + '_' + this.mOpts.s_selectCss;
        } else {
            // 移除对比日期样式
            cla = this.mOpts.theme + '_' + this.mOpts.e_selectCss;
        }
        // 移除指定样式
        $('#' + this.calendarId + '_' + this.date2ymd(d).join('-')).removeClass(cla);
        $('#' + this.calendarId + '_' + this.date2ymd(d).join('-')).removeClass(this.mOpts.firstCss).removeClass(this.mOpts.lastCss).removeClass(this.mOpts.clickCss);

    }
};

/**
 * @description 为选中的日期加上样式：1=比较时间；0=时间范围
 * @param {Boolean} isCompare 是否是对比日期面板
 * @param {String} specialClass 特殊的样式，这里默认是常规和对比日期两种样式的重合样式
 */
pickerDateRange.prototype.addCSS = function(isCompare, specialClass) {

    // 初始化对比时间重合部分的样式类
    if ('undefined' == typeof(specialClass)) {
        specialClass = this.mOpts.theme + '_' + this.mOpts.coincideCss;
    }
    // 是否移除对比部分的样式:0 日期选择;1 对比日期选择
    if ('undefined' == typeof(isCompare)) {
        isCompare = 0;
    }
    // 获取4个日期
    var s_startDate = this.str2date($('#' + this.s_startDateId).val());
    var s_endDate = this.str2date($('#' + this.s_endDateId).val());
    var e_startDate = this.str2date($('#' + this.e_startDateId).val());
    var e_endDate = this.str2date($('#' + this.e_endDateId).val());

    // 循环开始日期
    var sDate = 0 == isCompare ? s_startDate : e_startDate;
    // 循环结束日期
    var eDate = 0 == isCompare ? s_endDate : e_endDate;
    var cla = '';
    for (var d = new Date(sDate); d.getTime() <= eDate.getTime(); d.setDate(d.getDate() + 1)) {
        if (0 == isCompare) {
            // 添加日期样式
            cla = this.mOpts.theme + '_' + this.mOpts.s_selectCss;
            $('#' + this.calendarId + '_' + this.date2ymd(d).join('-')).removeClass(this.mOpts.firstCss).removeClass(this.mOpts.lastCss).removeClass(this.mOpts.clickCss);
            $('#' + this.calendarId + '_' + this.date2ymd(d).join('-')).removeClass(cla);
        } else {
            // 添加对比日期样式
            cla = this.mOpts.theme + '_' + this.mOpts.e_selectCss;
        }

        $('#' + this.calendarId + '_' + this.date2ymd(d).join('-')).attr('class', cla);
    }
    if (this.mOpts.theme == 'ta') {
        //为开始结束添加特殊样式
        $('#' + this.calendarId + '_' + this.date2ymd(new Date(sDate)).join('-')).removeClass().addClass(this.mOpts.firstCss);
        $('#' + this.calendarId + '_' + this.date2ymd(new Date(eDate)).join('-')).removeClass().addClass(this.mOpts.lastCss);
        //如果开始结束时间相同
        sDate.getTime() == eDate.getTime() && $('#' + this.calendarId + '_' + this.date2ymd(new Date(eDate)).join('-')).removeClass().addClass(this.mOpts.clickCss);
    }
};

/**
 * @description 判断开始、结束日期是否处在允许的范围内
 * @param {String} startYmd 开始时间字符串
 * @param {String} endYmd 结束时间字符串
 */
pickerDateRange.prototype.checkDateRange = function(startYmd, endYmd) {
    var sDate = this.str2date(startYmd);
    var eDate = this.str2date(endYmd);
    var sTime = sDate.getTime();
    var eTime = eDate.getTime();
    var minEDate, maxEDate;
    if (eTime >= sTime) {
        // 判断是否超过最大日期外
        maxEDate = this.str2date(startYmd);
        maxEDate.setMonth(maxEDate.getMonth() + this.mOpts.monthRangeMax);
        maxEDate.setDate(maxEDate.getDate() + this.mOpts.dayRangeMax - 1);
        if (maxEDate.getTime() < eTime) {
            alert('结束日期不能大于：' + this.date2ymd(maxEDate).join('-'));
            return false;
        }
    } else {
        // 判断是否超过最大日期外
        maxEDate = this.str2date(startYmd);
        maxEDate.setMonth(maxEDate.getMonth() - this.mOpts.monthRangeMax);
        maxEDate.setDate(maxEDate.getDate() - this.mOpts.dayRangeMax + 1);
        if (maxEDate.getTime() > eTime) {
            alert('开始日期不能小于：' + this.date2ymd(maxEDate).join('-'));
            return false;
        }
    }
    return true;
}

/**
 *  @description 选择日期
 *  @param {String} ymd 时间字符串
 */
pickerDateRange.prototype.selectDate = function(ymd) {
    // 点击日期点的时候添加对应输入框的样式，而不是之前的 聚焦到输入框时显示样式
    this.changeInput(this.dateInput);
    // 格式化日期
    var ymdFormat = this.formatDate(ymd);

    if (true == this.mOpts.isSingle) {
        // 单日 单周 单月
        //if (this.s_startDateId == this.dateInput) {
        // 移除样式
        this.removeCSS(0);
        // 为当前点加样式
        $('#' + this.calendarId + '_' + ymd).attr('class', this.mOpts.clickCss);
        // 更改对应输入框的值
        $('#' + this.dateInput).val(ymdFormat);
        // 切换输入框焦点
        //this.dateInput = this.s_startDateId;
        var dateObj = this.getFirEndDayByUnit(this.str2date(ymdFormat), this.mOpts.countPeriod);
        $('#' + this.s_startDateId).val(dateObj.startTime);
        $('#' + this.s_endDateId).val(dateObj.endTime);
        this.addCSS(0);
        //}
    } else if (false == this.mOpts.isSingle) {
        if (1 == this.mOpts.countPeriod) {
            // 开始日 到 结束日
            if (this.s_startDateId == this.dateInput) {
                // 移除样式
                this.removeCSS(0);
                // 为当前点加样式
                $('#' + this.calendarId + '_' + ymd).attr('class', this.mOpts.clickCss);
                // 更改对应输入框的值
                $('#' + this.dateInput).val(ymdFormat);
                // 切换输入框焦点
                this.dateInput = this.s_endDateId;
            } else if (this.s_endDateId == this.dateInput) {
                // 判断用户选择的时间范围
                if (false == this.checkDateRange($('#' + this.s_startDateId).val(), ymd)) {
                    return false;
                }
                // 如果结束时间小于开始时间
                if (-1 == this.compareStrDate(ymd, $('#' + this.s_startDateId).val())) {
                    // 更改对应输入框的值(结束时间)
                    $('#' + this.dateInput).val($('#' + this.s_startDateId).val());
                    // 更改对应输入框的值(开始时间)
                    $('#' + this.s_startDateId).val(ymdFormat);
                    ymdFormat = $('#' + this.dateInput).val();
                }
                // 更改对应输入框的值
                $('#' + this.dateInput).val(ymdFormat);
                // 切换输入框焦点
                this.dateInput = this.s_startDateId;
                this.removeCSS(0);
                this.addCSS(0);
            }
        } else if (2 == this.mOpts.countPeriod || 3 == this.mOpts.countPeriod) {
            // 开始周 到 结束周 或者 开始月 到 结束月
            if (this.s_startDateId == this.dateInput) {
                // 移除样式
                this.removeCSS(0);
                // 为当前点加样式
                $('#' + this.calendarId + '_' + ymd).attr('class', this.mOpts.clickCss);
                // 更改对应输入框的值
                $('#' + this.dateInput).val(ymdFormat);
                // 切换输入框焦点
                this.dateInput = this.e_startDateId;
                var dateObj = this.getFirEndDayByUnit(this.str2date(ymdFormat), this.mOpts.countPeriod);
                $('#' + this.s_startDateId).val(dateObj.startTime);
                $('#' + this.s_endDateId).val(dateObj.endTime);
                this.addCSS(0);
            } else if (this.e_startDateId == this.dateInput) {
                // 移除样式
                this.removeCSS(1);
                // 为当前点加样式
                $('#' + this.calendarId + '_' + ymd).attr('class', this.mOpts.clickCss);
                // 更改对应输入框的值
                $('#' + this.dateInput).val(ymdFormat);
                // 切换输入框焦点
                this.dateInput = this.s_startDateId;
                var dateObj = this.getFirEndDayByUnit(this.str2date(ymdFormat), this.mOpts.countPeriod);
                $('#' + this.e_startDateId).val(dateObj.startTime);
                $('#' + this.e_endDateId).val(dateObj.endTime);
                this.addCSS(1);
            }
        }
    }


    // 切换到下一个输入框
    //    this.changeInput(this.dateInput);
};

/**
 * @description显示日期选择框
 */
pickerDateRange.prototype.show = function() {
    var __method = this;
    $('#' + __method.s_dateRangeDiv).css('display', '');
    $('#' + __method.e_dateRangeDiv).css('display', '');

    // 开始周 开始月 结束周 结束月 文字隐藏
    $("#o_d, #o_w, #o_m, #s_d, #e_d, #s_w, #s_m, #e_w, #e_m").css("display", "none");

    var pos = $('#' + this.inputId).offset();
    var offsetHeight = $('#' + this.inputId).height();
    var clientWidth = parseInt($(document.body)[0].clientWidth);
    var left = pos.left;
    $("#" + this.calendarId).css('display', 'block');

    if (true == this.mOpts.isSingle) {
        if (1 == this.mOpts.countPeriod) {
            $('#' + this.s_endDateId).css('display', 'none');
            $('#' + this.e_startDateId).css('display', 'none');
            $('#' + this.e_endDateId).css('display', 'none');
            $('.' + this.mOpts.joinLineId).css('display', 'none');
            $("#o_d").css("display", "");
        } else if (2 == this.mOpts.countPeriod) {
            $('#' + this.e_startDateId).css('display', 'none');
            $('#' + this.e_endDateId).css('display', 'none');
            $('#' + this.mOpts.joinLineId + "_2").css('display', 'none');
            $("#o_w").css("display", "");
        } else if (3 == this.mOpts.countPeriod) {
            $('#' + this.e_startDateId).css('display', 'none');
            $('#' + this.e_endDateId).css('display', 'none');
            $('#' + this.mOpts.joinLineId + "_2").css('display', 'none');
            $("#o_m").css("display", "");
        }
    } else if (false == this.mOpts.isSingle) {
        if (1 == this.mOpts.countPeriod) {
            $('#' + this.e_startDateId).css('display', 'none');
            $('#' + this.e_endDateId).css('display', 'none');
            $('#' + this.mOpts.joinLineId + "_2").css('display', 'none');
            $("#s_d, #e_d").css("display", "");
        } else if (2 == this.mOpts.countPeriod) {
            $("#s_w, #e_w").css("display", "");
        } else if (3 == this.mOpts.countPeriod) {
            $("#s_m, #e_m").css("display", "");
        }
    }
    // 如果和输入框左对齐时超出了宽度范围，则右对齐
    if (0 < clientWidth && $("#" + this.calendarId).width() + pos.left > clientWidth) {
        left = pos.left + $('#' + this.inputId).width() - $("#" + this.calendarId).width() + ((/msie/i.test(navigator.userAgent) && !(/opera/i.test(navigator.userAgent))) ? 5 : 0);
        __method.mOpts.theme == 'ta' && (left += 50);
    }
    $("#" + this.calendarId).css('left', left + 'px');
    $("#" + this.calendarId).css('top', pos.top + 35 + 'px');
    //第一次显示的时候，一定要初始化输入框
    this.changeInput(this.s_startDateId);
    return false;
};

/**
 * @description 关闭日期选择框
 * @param {Boolean} btnSubmit 是否是点击确定按钮关闭的
 */
pickerDateRange.prototype.close = function() {

    //关闭后就解绑了
    //$(document).unbind('click');

    var s_bDateTime = this.str2date($('#' + this.s_startDateId).val()).getTime();
    var s_eDateTime = this.str2date($('#' + this.s_endDateId).val()).getTime();
    var e_bDateTime = this.str2date($('#' + this.e_startDateId).val()).getTime();
    var e_eDateTime = this.str2date($('#' + this.e_endDateId).val()).getTime();

    //如果s_endDateTime小于bDateTime 相互交换
    if (s_eDateTime < s_bDateTime) {
        var tmp = $('#' + this.s_startDateId).val();
        $('#' + this.s_startDateId).val($('#' + this.s_endDateId).val());
        $('#' + this.s_endDateId).val(tmp);
    }

    var str = $('#' + this.s_startDateId).val() + this.mOpts.defaultText + $('#' + this.s_endDateId).val();
    if (false == this.mOpts.isSingle) {
        if (2 == this.mOpts.countPeriod || 3 == this.mOpts.countPeriod) {

            if (e_bDateTime < s_bDateTime) {
                var tmp = $('#' + this.s_startDateId).val();
                $('#' + this.s_startDateId).val($('#' + this.e_startDateId).val());
                $('#' + this.e_startDateId).val(tmp);

                var tmp_ = $('#' + this.s_endDateId).val();
                $('#' + this.s_endDateId).val($('#' + this.e_endDateId).val());
                $('#' + this.e_endDateId).val(tmp_);
            }
            str = $('#' + this.s_startDateId).val() + " - " + $('#' + this.s_endDateId).val() + this.mOpts.defaultText + $('#' + this.e_startDateId).val() + " - " + $('#' + this.e_endDateId).val();
        }
    }

    $('#' + this.inputId).html(str);

    // 计算相隔天数
    //var step = (bDateTime - eDateTime) / 86400000;

    // 更改目标元素值
    $('#' + this.mOpts.s_startDateId).val($('#' + this.s_startDateId).val());
    $('#' + this.mOpts.s_endDateId).val($('#' + this.s_endDateId).val());
    $('#' + this.mOpts.e_startDateId).val($('#' + this.e_startDateId).val());
    $('#' + this.mOpts.e_endDateId).val($('#' + this.e_endDateId).val());

    // 隐藏日期选择框
    $("#" + this.calendarId).css('display', 'none');
    return false;
};

/**
 * @description 日期填充函数
 * @param {Num} year 年
 * @param {Num} month 月
 */
pickerDateRange.prototype.fillDate = function(year, month, index) {
    var __method = this;
    // 当月第一天
    var firstDayOfMonth = new Date(year, month, 1);
    var dateBegin = new Date(year, month, 1);
    var w = dateBegin.getDay();
    // 计算应该开始的日期
    dateBegin.setDate(1 - w);

    // 当月最后一天
    var lastDayOfMonth = new Date(year, month + 1, 0);
    var dateEnd = new Date(year, month + 1, 0);
    w = dateEnd.getDay();
    // 计算应该结束的日期
    dateEnd.setDate(dateEnd.getDate() + 6 - w);

    var today = new Date();
    var dToday = today.getDate();
    var mToday = today.getMonth();
    var yToday = today.getFullYear();

    var table = document.createElement('table');
    table.className = this.mOpts.dateTable;

    cap = document.createElement('caption');
    $(cap).append(year + '年' + (month + 1) + '月');
    $(table).append(cap);

    thead = document.createElement('thead');
    tr = document.createElement('tr');
    var days = ['日', '一', '二', '三', '四', '五', '六'];
    for (var i = 0; i < 7; i++) {
        th = document.createElement('th');
        $(th).append(days[i]);
        $(tr).append(th);
    }
    $(thead).append(tr);
    $(table).append(thead);

    tr = document.createElement('tr');
    td = document.createElement('td');
    // 如果是最后一个月的日期，则加上下一个月的链接
    if (0 == index) {
        $(td).append('<a href="javascript:void(0);" id="' + this.nextMonth + '"><i class="i_next"></i></a>');
    }
    // 如果是第一个月的日期，则加上上一个月的链接
    if (index + 1 == this.mOpts.calendars) {
        $(td).append('<a href="javascript:void(0);" id="' + this.preMonth + '"><i class="i_pre"></i></a>');
    }
    //    $(td).append('<span style="font-size:16px">' + year + '年' + (month + 1) + '月' + '</span>');
    $(td).attr('colSpan', 7);
    $(td).css('text-align', 'center');
    $(tr).append(td);
    $(table).append(tr);
    // 当前月的所有日期(包括空白位置填充的日期)
    var tdClass = '',
        deviation = 0,
        ymd = '';
    for (var d = dateBegin; d.getTime() <= dateEnd.getTime(); d.setDate(d.getDate() + 1)) {
        if (d.getTime() < firstDayOfMonth.getTime()) { // 当前月之前的日期
            tdClass = this.mOpts.theme + '_' + this.mOpts.disableGray;
            deviation = '-1';
        } else if (d.getTime() > lastDayOfMonth.getTime()) { // 当前月之后的日期
            tdClass = this.mOpts.theme + '_' + this.mOpts.disableGray;
            deviation = '1';
        } else if ((this.mOpts.stopToday == true && d.getTime() > today.getTime()) || d.getTime() < __method.mOpts.minValidDate * 1000 || ('' !== __method.mOpts.maxValidDate && d.getTime() > __method.mOpts.maxValidDate * 1000)) { // 当前时间之后的日期，或者开启统计之前的日期
            tdClass = this.mOpts.theme + '_' + this.mOpts.disableGray;
            deviation = '2';
        } else { // 当前月日期
            deviation = '0';
            if (d.getDate() == dToday && d.getMonth() == mToday && d.getFullYear() == yToday) {
                if (true == this.mOpts.isTodayValid) {
                    tdClass = this.mOpts.theme + '_' + this.mOpts.isToday;
                } else {
                    tdClass = this.mOpts.theme + '_' + this.mOpts.disableGray;
                    deviation = '2';
                }
            } else {
                tdClass = '';
            }
            //让周末不可选不可选
            if (this.mOpts.weekendDis && (d.getDay() == 6 || d.getDay() == 0)) {
                tdClass = this.mOpts.theme + '_' + this.mOpts.disableGray;
                deviation = '3';
            }
            //让周几不可选
            if (this.mOpts.disCertainDay && this.mOpts.disCertainDay.length > 0) {
                for (var p in this.mOpts.disCertainDay) {
                    if (!isNaN(this.mOpts.disCertainDay[p]) && d.getDay() === this.mOpts.disCertainDay[p]) {
                        tdClass = this.mOpts.theme + '_' + this.mOpts.disableGray;
                        deviation = '4';
                    }
                }
            }
            //让几号不可选
            if (this.mOpts.disCertainDate && this.mOpts.disCertainDate.length > 0) {
                var isDisabled = false;

                for (var p in this.mOpts.disCertainDate) {
                    if (!isNaN(this.mOpts.disCertainDate[p]) || isNaN(parseInt(this.mOpts.disCertainDate[p]))) {
                        if (this.mOpts.disCertainDate[0] === true) {
                            isDisabled = !!(d.getDate() !== this.mOpts.disCertainDate[p]);
                            if (!isDisabled) {
                                break;
                            }
                        } else {
                            isDisabled = !!(d.getDate() === this.mOpts.disCertainDate[p]);
                            if (isDisabled) {
                                break;
                            }
                        }

                    }
                }

                if (isDisabled) {
                    tdClass = this.mOpts.theme + '_' + this.mOpts.disableGray;
                    deviation = '4';
                }

            }
        }

        // 如果是周日
        if (0 == d.getDay()) {
            tr = document.createElement('tr');
        }

        td = document.createElement('td');
        td.innerHTML = d.getDate();
        if ('' != tdClass) {
            $(td).attr('class', tdClass);
        }

        // 只有当前月可以点击
        if (0 == deviation) {
            ymd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            $(td).attr('id', __method.calendarId + '_' + ymd);
            $(td).css('cursor', 'pointer');
            (function(ymd) {
                $(td).bind("click", ymd, function() {
                    __method.selectDate(ymd);
                    return false;
                });
            })(ymd);
        }

        $(tr).append(td);

        // 如果是周六
        if (6 == d.getDay()) {
            $(table).append(tr);
        }
    }

    return table;
};

/**
 * @description 把时间字串转成时间格式
 * @param {String} str 时间字符串
 */
pickerDateRange.prototype.str2date = function(str) {
    var ar = str.split('-');
    // 返回日期格式
    return new Date(ar[0], ar[1] - 1, ar[2]);
};

/**
 * @description 比较两个时间字串的大小:1 大于; 0 等于; -1 小于
 * @param {String} b 待比较时间串1
 * @param {String} e 待比较时间串2
 */
pickerDateRange.prototype.compareStrDate = function(b, e) {
    var bDate = this.str2date(b);
    var eDate = this.str2date(e);

    // 1 大于; 0 等于; -1 小于
    if (bDate.getTime() > eDate.getTime()) {
        return 1;
    } else if (bDate.getTime() == eDate.getTime()) {
        return 0;
    } else {
        return -1;
    }
};

/**
 * @description 把时间格式转成对象
 * @param {Date} d 时间
 */
pickerDateRange.prototype.date2ymd = function(d) {
    return [d.getFullYear(), (d.getMonth() + 1), d.getDate()];
};

/**
 * @description 切换焦点到当前输入框
 * @param {String} 日期框体ID
 */
pickerDateRange.prototype.changeInput = function(ipt) {
    // 强制修改为开始输入框
    if (true == this.mOpts.isSingle) {
        ipt = this.s_startDateId;
    }
    // 所有4个输入框
    var allInputs = [this.s_startDateId, this.e_startDateId, this.s_endDateId, this.e_endDateId];

    // 如果 ipt 是起始时间段的日期输入框，则为起始时间段的日期样式，否则为终止时间段的日期样式
    var cla = '';
    if (ipt == this.s_startDateId || ipt == this.s_endDateId) {
        cla = this.mOpts.theme + '_' + this.mOpts.s_selectCss;
    } else if (ipt == this.e_startDateId || ipt == this.e_endDateId) {
        cla = this.mOpts.theme + '_' + this.mOpts.e_selectCss;
    }

    // 移除所有输入框的附加样式
    for (var i = 0; i < allInputs.length; i++) {
        $('#' + allInputs[i]).removeClass(this.mOpts.theme + '_' + this.mOpts.s_selectCss);
        $('#' + allInputs[i]).removeClass(this.mOpts.theme + '_' + this.mOpts.e_selectCss);
    }

    // 为指定输入框添加样式
    $('#' + ipt).addClass(cla);
    if (true == this.mOpts.isSingle) {
        $('#' + this.s_endDateId).addClass(cla);
    } else if (false == this.mOpts.isSingle) {
        if (2 == this.mOpts.countPeriod || 3 == this.mOpts.countPeriod) {
            if (ipt == this.s_startDateId) {
                $('#' + this.s_endDateId).addClass(cla);
            } else if (ipt == this.e_startDateId) {
                $('#' + this.e_endDateId).addClass(cla);
            }
        }

    }
    //背景图repeat
    $('#' + ipt).css('background-repeat', 'repeat');
    // 把输入焦点移到指定输入框
    this.dateInput = ipt;
};

/**
 * @description 日期格式化，加前导零
 */
pickerDateRange.prototype.formatDate = function(ymd) {
    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d) {
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        return y + '-' + m + '-' + d;
    });
};

pickerDateRange.prototype.getFirEndDayByUnit = function(time, unit) {
    var y = time.getFullYear(),
        m = time.getMonth() + 1,
        dt = time.getDate(),
        dy = time.getDay();
    var st = {
            year: y
        },
        et = {
            year: y
        };
    switch (unit) {
        case 3:
            //month
            st.month = m;
            et.month = m;
            st.date = 1;
            et.date = new Date(y, m, 0).getDate();
            break;
        case 2:
            //week
            var stime = new Date(y, m - 1, dt - (dy == 0 ? 7 : dy) + 1);
            var etime = new Date(y, m - 1, dt + 7 - (dy == 0 ? 7 : dy));
            st.year = stime.getFullYear();
            et.year = etime.getFullYear();
            st.month = stime.getMonth() + 1;
            et.month = etime.getMonth() + 1;
            st.date = stime.getDate();
            et.date = etime.getDate();
            break;
        case 1:
            //day
            st.month = m;
            et.month = m;
            st.date = dt;
            et.date = dt;
            break;
    }
    st.month = String(st.month).length != 1 ? st.month : "0" + st.month;
    et.month = String(et.month).length != 1 ? et.month : "0" + et.month;
    st.date = String(st.date).length != 1 ? st.date : "0" + st.date;
    et.date = String(et.date).length != 1 ? et.date : "0" + et.date;
    return {
        startTime: st.year + "-" + st.month + "-" + st.date,
        endTime: et.year + "-" + et.month + "-" + et.date
    };
};