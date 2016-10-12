<?php
$pdo = new  PDO("mysql:host=192.168.11.222; dbname=test", "zhaojianbin", "zhaojb321765");
//$pdo = new  PDO("mysql:host=localhost; dbname=test", "root", "");
@$tel = $_GET['phone'];
$sql = "select count(*) from user where tel ='" . $tel . "'";

$identy = $pdo->query($sql);

$row = $identy->fetch();

$times = intval($row[0]);
function seed()
{
    list($msec, $sec) = explode(' ', microtime());
    return (float)$sec;
}

srand(seed());

/*对奖项进行限制*/
$jiangyi = 'select count(*) from user where status = 0';
$jianger = 'select count(*) from user where status = 4';
$jiangsan = 'select count(*) from user where status = 8';
$result = $pdo->query($jiangyi);
$re = $result->fetch();
$result2 = $pdo->query($jianger);
$re2 = $result2->fetch();
$result3 = $pdo->query($jiangsan);
$re3 = $result3->fetch();
$a = $re[0];
$b = $re2[0];
$c = $re3[0];

if ($a < 5) {
    if ($b < 10) {
        if ($c < 15) {
            $key = rand(0, 12);
        } else {
            $key = rand(0, 7);
        }
    } else {
        if ($c < 15) {
            $key = rand(5, 12);
        } else {
            $key = rand(0, 3);
        }
    }

} else {
    if ($b < 10) {
        if ($c < 15) {
            $key = rand(1, 12);
        } else {
            $key = rand(1, 7);
        }
    } else {
        if ($c < 15) {
            $key = rand(5, 12);
        } else {
            $key = rand(9, 12);
        }
    }
}
/*生成奖品产生方式*/

echo $key . '' . $times;

if ($times <= 2) {
    $sql = "insert into user (tel,times,status) values(" . $tel. "," . $times . "," . $key . ")";
    $idre = $pdo->exec($sql);
} else {
//    次数用完，感谢关注
    echo "404";
}






