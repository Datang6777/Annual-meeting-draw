var dataObj = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
$(function () {
    $("#inner").on("click", function () {
        /***
         * ajax操作返回数据*
         * **/
        var oTel = eval(document.getElementById("tel")).value;

        if (!/^(13[0-9]{9}|15[012356789][0-9]{8}|18[0-9]{9}|147[0-9]{8}|17[0-9]{9})$/g.test(oTel)) {
            alert("填写正确的手机号才能抽奖噢！！");
            return;
        }
        var rotateFunc = function (num, type) {
//            type 是获奖类型，赋值给a  从数据库取优惠券
            a = type;
            rotating = true;
            $("#outer").rotate({
                angle: 0,
                duration: 4000,
                animateTo: num + 1440, //1440是我要让指针旋转4圈
                callback: function () {
                    rotating = false;
                    if (type == 0) {
                        alert("恭喜你获得一等奖为：华图公务员考试课程500优惠券。");
                    } else if (type == 4) {
                        alert("恭喜你获得二等奖为：华图公务员考试课程200优惠券。");
                    } else if (type == 8) {
                        alert("恭喜你获得三等奖为：华图公务员考试课程100优惠券。");
                    } else {
                        alert("再接再厉");
                    }
                }
            });

        };

        $.ajax({
            url: "prize.php",
            type: "get",
            async: true,
            data: {'phone': oTel},
            datatype: "json",
            success: function (msg) {

                if (msg < 100) {
                    type = msg[0];
                    console.log(type);
                    key = msg[0];
                    times = msg[1];

                } else {
                    type = msg[0] + msg[1];
                     console.log(type);
                    key = msg[0] + msg[1];

                    times = msg[2];

                }

                if ( times <= 2 ) {
                    var rotating = false;
                    //var key = getRandom(1, 12);
                    !rotating && rotateFunc(dataObj[key], key);
                } else {
                    alert("您的3次抽奖机会用完噢！感谢参与！");
                }
            }

        });


    });


}());
