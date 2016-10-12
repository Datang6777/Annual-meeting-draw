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
        lottery();


    }());
    function lottery() {
        $.ajax({
            type: 'POST',
            url: 'data.php',
            dataType: 'json',
            cache: false,
            error: function () {
                alert('�����ˣ�');
                return false;
            },
            success: function (json) {
                $("#inner").unbind('click').css("cursor", "default");
                var a = json.angle; //�Ƕ�
                var p = json.prize; //����
                $("#inner").rotate({
                    duration: 3000, //ת��ʱ��
                    angle: 0,
                    animateTo: 1800 + a, //ת���Ƕ�
                    easing: $.easing.easeOutSine,
                    callback: function () {
                        var con = confirm('��ϲ�㣬�е�' + p + '\n��Ҫ����һ����');
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
