var dataObj = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
$(function () {
    $("#inner").on("click", function () {
        /***
         * ajax������������*
         * **/
        var oTel = eval(document.getElementById("tel")).value;

        if (!/^(13[0-9]{9}|15[012356789][0-9]{8}|18[0-9]{9}|147[0-9]{8}|17[0-9]{9})$/g.test(oTel)) {
            alert("��д��ȷ���ֻ��Ų��ܳ齱�ޣ���");
            return;
        }
        $.ajax({
            url: "prize.php",
            type: "get",
            async: true,
            data: {'phone': oTel},
            success: function (times) {
                if (times == 404) {
                    alert("����3�γ齱���������ޣ���л���룡");
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
//            type �ǻ����ͣ���ֵ��a  �����ݿ�ȡ�Ż�ȯ
                a = type;
                rotating = true;
                $("#outer").rotate({
                    angle: 0,
                    duration: 4000,
                    animateTo: num + 1440, //1440����Ҫ��ָ����ת4Ȧ
                    callback: function () {
                        rotating = false;
                        if (type == 0) {
                            alert("��ϲ����һ�Ƚ�Ϊ����ͼ����Ա���Կγ�500�Ż�ȯ��");
                        } else if (type == 4) {
                            alert("��ϲ���ö��Ƚ�Ϊ����ͼ����Ա���Կγ�200�Ż�ȯ��");
                        } else if (type == 8) {
                            alert("��ϲ�������Ƚ�Ϊ����ͼ����Ա���Կγ�100�Ż�ȯ��");
                        } else {
                            alert("�ٽ�����");
                        }
                    }
                });

            };

            var key = getRandom(0, 12);
            !rotating && rotateFunc(dataObj[key], key);
            function getRandom(min, max) {
                //x���ޣ�y����
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

