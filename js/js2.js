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
        lottery();


    }());
    function lottery() {
        $.ajax({
            type: 'POST',
            url: 'data.php',
            dataType: 'json',
            cache: false,
            error: function () {
                alert('出错了！');
                return false;
            },
            success: function (json) {
                $("#inner").unbind('click').css("cursor", "default");
                var a = json.angle; //角度
                var p = json.prize; //奖项
                $("#inner").rotate({
                    duration: 3000, //转动时间
                    angle: 0,
                    animateTo: 1800 + a, //转动角度
                    easing: $.easing.easeOutSine,
                    callback: function () {
                        var con = confirm('恭喜你，中得' + p + '\n还要再来一次吗？');
                        if (con) {
                            lottery();
                        } else {
                            return false;
                        }
                    }
                });
            }
        });
    }
}());
