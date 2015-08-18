<?php
$configs = include('config.php');
/**
 * Created by PhpStorm.
 * User: yoni
 * Date: 18/08/2015
 * Time: 20:25
 */
$dbh = new PDO('mysql:host='.$configs['host'].';dbname='.$configs['dbname'], $configs['username'], $configs['password']);
//echo 'mysql:host='.$configs['host'].';dbname='.$configs['dbname'].' '.$configs['username'].' '. $configs['password'];


    function test(){
        global $dbh;
        $query="SELECT * FROM USERS";
        $stmt = $dbh->query($query);

        $result = $stmt->fetchAll();
        return json_encode($result);

}


/* Checks the user and password for match. Returns a STRING of the password if authorized, FALSE if not allowed. */
function CheckUserPassword($user,$pass, $userGroup)
{
    global $dbh;

    if ($user=="" || $pass=="")
        return false;

    $c_pass=CalculatePassword($pass);
    $query ="SELECT UserName FROM Users WHERE UserAuthLvl =':userGroup' AND UserName=':user' AND Password=':c_pass')";
    $stmt = $dbh->prepare($query);
    $stmt->bindParam(':userGroup',$userGroup);
    $stmt->bindParam(':user',$user);
    $stmt->bindParam(':c_pass',$c_pass);
    $stmt->execute();
    $res = $stmt->fetch();

    if (!isset($res->UserName))
        return $c_pass;
    return false;


}

function CalculatePassword($pass)
{
    $pass=$pass[0].$pass.$pass[0];
    $pass=md5($pass);
    return $pass;
}

?>




