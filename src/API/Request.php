<?php
/**
 * Created by PhpStorm.
 * User: yoni
 * Date: 24/08/2015
 * Time: 10:01
 */

require 'kickStartDB.php';


$config = include(__DIR__ .'/config.php');
$projectsPath = '/../projects/';

//create a new object for db connection
$kickStartDB = new KickStartDB($config['host'],$config['username'],$config['password'],$config['dbname']);



$type = $_POST['request'];
$result = "ERROR";
switch($type){

    case "test":
        $result = $kickStartDB->test();
        break;
    case "login":
        $result = $kickStartDB->checkUserPassword($_POST['userName'],$_POST['pass']);
        break;
    case "registerUser":
        $result = $kickStartDB->registerUser($_POST['userName'],$_POST['pass'],$_POST['authLvl']);
        break;
    case "addProject":
        $result = $kickStartDB->addProject($_POST['name'],$_POST['description'],$_POST['amount'],$_POST['owner']);
        if($result == "Error")
            break;
        else{
            $kickStartDB->makeDir($projectsPath.$result);
            if(!isset($_FILES['mainPic']) || $_FILES['mainPic']['error'] == UPLOAD_ERR_NO_FILE)
                break;
            else{
                $temp = $kickStartDB->uploadFile($projectsPath.$result,$_FILES['mainPic']['name'],$_FILES['mainPic']['size'],$_FILES['mainPic']['tmp_name']);
                if($temp == "Fail") {
                    $result['ID'] = $result;
                    $result['error'] = "failed to upload file";
                }
                else
                    $kickStartDB->updateMainPic($result,'/projects/'.$result.'/'.$temp);
            }
        }
        break;
    case "topProjects":
        $result = $kickStartDB->getTopProjects();
        break;




}

echo json_encode($result);





?>