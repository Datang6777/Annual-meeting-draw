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
        $.ajax({
            url: "prize.php",
            type: "get",
            async: true,
            data: {'phone': oTel},
            success: function (times) {
                if (times == 404) {
                    alert("您的3次抽奖机会用完噢！感谢参与！");
                    window.location.reload();
                    //return false;
                    //    setTimeout(function () {
                    //        window.location = "13.html";
                    //    }, 1);
                }
            }

        });
        var rotating = false;
        if (times !== 404) {
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

            var key = getRandom(0, 12);
            !rotating && rotateFunc(dataObj[key], key);
            function getRandom(min, max) {
                //x上限，y下限
                var x = max;
                var y = min;
                if (x < y) {
                    x = min;
                    y = max;
                }
                var rand = parseInt(Math.random() * (x - y + 1) + y);
//        var rand = parseInt(Math.random() * (12 - 5) + 5);
                return rand;
            }
        } else {
            alert(2222222222222222222222);
        }


    });


}());

