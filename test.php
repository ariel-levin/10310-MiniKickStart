

<?php
require_once('kickStartDB.php');
$user = $_POST['user'];
$pass = $_POST['pass'];


var_dump(CheckUserPassword($user,$pass,0));