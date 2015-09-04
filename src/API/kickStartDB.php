<?php

/**
 * Created by PhpStorm.
 * User: yoni
 * Date: 18/08/2015
 * Time: 20:25
 */
class  KickStartDB
{
    private $db;
    private $stmt;


    public function __construct($host, $user, $password, $database)
    {

        try {
            $this->db = new PDO('mysql:host=' . $host . ';dbname=' . $database, $user, $password);
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    function __destruct()
    {
        //$this->db->query('SELECT pg_terminate_backend(pg_backend_pid());');
        $this->stmt = null;
        $this->db = null;
    }


    public function getAllUsers()
    {
        try {
            $query = "SELECT UserName, FirstName, LastName, Gender, UserAuthLvl, Active FROM USERS ORDER BY UserAuthLvl ASC, UserName ASC";
            $this->stmt = $this->db->query($query);
            $result = $this->stmt->fetchAll();
            return $result;

        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();

        }

    }


    // Checks the user and password for match.
    public function checkUserPassword($user, $pass)
    {
        $result['status'] = "Unauthorized";
        try {
            if ($user == "" || $pass == "")
                return "Wrong UserName Or Password";

            $c_pass = $this->calculatePassword($pass);
            $query = "SELECT Id, UserName, UserAuthLvl FROM Users WHERE UserName=:user AND Password=:c_pass AND Active = 1";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':user', $user);
            $this->stmt->bindParam(':c_pass', $c_pass);
            $this->stmt->execute();
            $res = $this->stmt->fetch();

            if ($this->stmt->rowCount() > 0)
                return $res;
            else {
                $result['reason'] = "Wrong UserName Or Password";
                return $result;
            }

        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();
        }


    }

    public function calculatePassword($pass)
    {
        $pass = $pass[0] . $pass . $pass[0];
        $pass = md5($pass);
        return $pass;
    }

    public function registerUser($user, $pass, $authLvl, $fName, $lName, $gen)
    {

        try {
            $result['status'] = "Forbidden";
            $query = "SELECT UserName FROM Users WHERE UserName=:userName";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':userName', $user);
            $this->stmt->execute();

            if ($this->stmt->rowCount() > 0) {
                $result['reason'] = "UserName Already Exist";
                return $result;
            } else {

                $c_pass = $this->calculatePassword($pass);
                $query = "INSERT INTO Users (UserName, Password, UserAuthLvl, FirstName, LastName, Gender) VALUES ( :userName, :c_pass, :authLvl, :fname, :lname, :gen )";
                $this->stmt = $this->db->prepare($query);
                $this->stmt->bindParam(':userName', $user);
                $this->stmt->bindParam(':c_pass', $c_pass);
                $this->stmt->bindParam(':authLvl', $authLvl);
                $this->stmt->bindParam(':fname', $fName);
                $this->stmt->bindParam(':lname', $lName);
                $this->stmt->bindParam(':gen', $gen);
                $this->stmt->execute();
                if ($this->stmt->rowCount() > 0) {
                    return "User Added Successfully";
                } else {
                    $result['status'] = "Error";
                    $result['reason'] = "Error Adding User";
                }
            }

        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();
        }

    }


    public function addProject($name, $desc, $amount, $endDate, $videoUrl, $owner)
    {

        try {
            $query = "INSERT INTO projects (Name, Description, AmountNeeded, VideoYouTubeID, EndAt, Owner) VALUES ( :name, :desc, :amount, :videoUrl, :endDate, :owner )";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':name', $name);
            $this->stmt->bindParam(':desc', $desc);
            $this->stmt->bindParam(':amount', $amount);
            $this->stmt->bindParam(':videoUrl', $videoUrl);
            $this->stmt->bindParam(':endDate', $endDate);
            $this->stmt->bindParam(':owner', $owner);
            if ($this->stmt->execute()) {

                return $this->db->lastInsertId();
            } else
                return "Error";


        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();
        }

    }

    public function updateMainPic($pid, $path)
    {

        try {

            $query = "UPDATE projects SET MainPic = :path WHERE ID = :pid";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':path', $path);
            $this->stmt->bindParam(':pid', $pid);
            $this->stmt->execute();

        } catch (PDOException $e) {
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }

    }

    public function addPic($pid, $path)
    {

        try {

            $query = "INSERT INTO projectpic(ProjectId,Path) VALUES (:pid,:path)";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':path', $path);
            $this->stmt->bindParam(':pid', $pid);
            $this->stmt->execute();

        } catch (PDOException $e) {
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }

    }

    public function getProjectList()
    {
        try {
            $query = "SELECT id,MainPic as thumb, name, description, AmountNeeded, ROUND(TIMESTAMPDIFF(MICROSECOND,NOW(),EndAt) / 1000) AS milliSec,
                      coalesce(money.gatherd,0) as moneybacked, (Now() <= EndAt) as Active, VideoYouTubeID
                      FROM projects
                      LEFT JOIN (
                      SELECT projectId , coalesce(sum(Amount),0) as gatherd FROM backers group by projectId) money ON money.projectId = projects.ID
                      ORDER BY Active Desc, EndAt Asc";
            $this->stmt = $this->db->query($query);
            $this->stmt->execute();
            $result = $this->stmt->fetchAll();
            return $result;

        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();

        }

    }

    public function getUserProjects($userName)
    {

        try {
            $query = "SELECT id,MainPic as thumb, name, description, AmountNeeded, ROUND(TIMESTAMPDIFF(MICROSECOND,NOW(),EndAt) / 1000) AS milliSec,
                      coalesce(money.gatherd,0) as moneybacked, (Now() <= EndAt) as Active, VideoYouTubeID
                      FROM projects
                      LEFT JOIN (
                      SELECT projectId , coalesce(sum(Amount),0) as gatherd FROM backers group by projectId) money ON money.projectId = projects.ID
                      WHERE Owner = :userName
                      ORDER BY Active Desc, EndAt Asc";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':userName', $userName);

            if ($this->stmt->execute()) {
                $result = $this->stmt->fetchAll();
                return $result;
            } else
                return "Error";


        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();

        }

    }

    public function getUserBackings($userName)
    {

        try {
            $query = "SELECT id,MainPic as thumb, name, description, AmountNeeded, ROUND(TIMESTAMPDIFF(MICROSECOND,NOW(),EndAt) / 1000) AS milliSec,
                      coalesce(money.gatherd,0) as moneybacked, (Now() <= EndAt) as Active, backers.Amount as UserInvestAmount
                      FROM backers, projects
                      LEFT JOIN (
                      SELECT projectId , coalesce(sum(Amount),0) as gatherd FROM backers group by projectId) money ON money.projectId = projects.ID
                      WHERE backers.projectId = projects.ID AND backers.UserName = :userName
                      ORDER BY Active Desc, EndAt Asc";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':userName', $userName);

            if ($this->stmt->execute()) {
                $result = $this->stmt->fetchAll();
                return $result;
            } else
                return "Error";


        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();

        }

    }

    public function getProjectById($pid)
    {

        try {
            $query = "SELECT *, (Now() <= EndAt) as Active FROM projects WHERE ID=:pid";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':pid', $pid);
            $this->stmt->execute();

            if ($this->stmt->rowCount() > 0) {
                $result = $this->stmt->fetch();
                $query = "SELECT path FROM projectpic WHERE ProjectId=:pid";
                $this->stmt = $this->db->prepare($query);
                $this->stmt->bindParam(':pid', $pid);
                $this->stmt->execute();
                $result['pics'] = $this->stmt->fetchAll();
                $query = "SELECT UserName, Amount FROM backers WHERE ProjectId=:pid";
                $this->stmt = $this->db->prepare($query);
                $this->stmt->bindParam(':pid', $pid);
                $this->stmt->execute();
                $result['backers'] = $this->stmt->fetchAll();
                $query = "SELECT ROUND(TIMESTAMPDIFF(MICROSECOND,NOW(),EndAt) / 1000) AS milliSec FROM projects WHERE ID=:pid";
                $this->stmt = $this->db->prepare($query);
                $this->stmt->bindParam(':pid', $pid);
                $this->stmt->execute();
                $result['timeLeft'] = $this->stmt->fetch();
                return $result;
            } else
                return "Error";


        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();

        }

    }


    public function backProject($pid, $userName, $amount)
    {

        try {
            $query = "SELECT Amount FROM backers WHERE UserName=:user";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':user', $userName);
            $this->stmt->execute();
            if ($this->stmt->rowCount() > 0) {
                $amount = $amount + $this->stmt->fetchColumn();
                $query = "UPDATE backers SET Amount = :amount WHERE ProjectId = :pid AND UserName = :user";
                $this->stmt = $this->db->prepare($query);
                $this->stmt->bindParam(':pid', $pid);
                $this->stmt->bindParam(':user', $userName);
                $this->stmt->bindParam(':amount', $amount);
                $this->stmt->execute();
                if ($this->stmt->rowCount() > 0)
                    return "OK";
                else
                    return "Error";
            } else {
                $query = "INSERT INTO backers(ProjectId,UserName,Amount) VALUES (:pid,:user,:amount)";
                $this->stmt = $this->db->prepare($query);
                $this->stmt->bindParam(':pid', $pid);
                $this->stmt->bindParam(':user', $userName);
                $this->stmt->bindParam(':amount', $amount);
                $this->stmt->execute();
                if ($this->stmt->rowCount() > 0) {
                    return "OK";
                } else
                    return "Error";
            }

        } catch (PDOException $e) {
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }

    }

    function updateProjectInfo($pid,$name,$desc,$url){
        try {
            $query = "UPDATE projects SET Name = :name, Description = :desc, VideoYouTubeID = :url WHERE ID = :pid";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':pid', $pid);
            $this->stmt->bindParam(':name', $name);
            $this->stmt->bindParam(':desc', $desc);
            $this->stmt->bindParam(':url', $url);
            if ($this->stmt->execute())
                return "OK";
            else
                return "Error";

        }catch (PDOException $e) {
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }
    }

    function deleteProject($pid){
        try {
            $query = "DELETE FROM projects WHERE ID = :pid";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':pid', $pid);
            $this->stmt->execute();
            if ($this->stmt->rowCount() > 0)
                return "OK";
            else
                return "Error";

        }catch (PDOException $e) {
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }
    }

    function changeUserStatus($user, $stat){
        try {
            $query = "UPDATE users SET Active = :stat WHERE UserName = :user";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':user', $user);
            $this->stmt->bindParam(':stat', $stat);

            if ($this->stmt->execute())
                return "OK";
            else
                return "Error";

        }catch (PDOException $e) {
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }
    }

    function updateUserInfo($user, $pass, $authLvl, $fName, $lName, $gen,$flag){
        try {
            if($flag) {
                $c_pass = $this->calculatePassword($pass);
                $query = "UPDATE users SET Password = :pass, UserAuthLvl =:auth, FirstName = :name, LastName =:lname, Gender = :gen  WHERE UserName = :user";
                $this->stmt = $this->db->prepare($query);
                $this->stmt->bindParam(':pass', $c_pass);
            }
            else {
                $query = "UPDATE users SET UserAuthLvl =:auth, FirstName = :name, LastName =:lname, Gender = :gen  WHERE UserName = :user";
                $this->stmt = $this->db->prepare($query);
            }
            $this->stmt->bindParam(':user', $user);
            $this->stmt->bindParam(':auth', $authLvl);
            $this->stmt->bindParam(':name', $fName);
            $this->stmt->bindParam(':lname', $lName);
            $this->stmt->bindParam(':gen', $gen);

            if ($this->stmt->execute())
                return "OK";
            else
                return "Error";

        }catch (PDOException $e) {
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }
    }

    public function getUserInfo($user)
    {
        try {

            $query = "SELECT Id, UserName, FirstName, LastName, Gender, UserAuthLvl, Active FROM USERS WHERE UserName = :user";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':user', $user);
            $this->stmt->execute();

            if ($this->stmt->rowCount() > 0) {
                $result = $this->stmt->fetch();
                return $result;
            } else
                return "Error";

        } catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();

        }
    }


    function makeDir($path)
    {

        if (!file_exists($path)) {
            mkdir($path, true);
        }
    }


    function uploadFile($path, $fileName, $fileSize, $tempName)
    {

        $allowedFileType = array(".jpeg", ".jpg", ".png");
        $filetype = strtolower(strrchr($fileName, '.'));

        if (in_array($filetype, $allowedFileType) && ($fileSize < 1048576)) {

            $unique_id = md5(uniqid(rand(), true));
            $new_upload = $path . "/" . $unique_id . $filetype;
            if (move_uploaded_file($tempName, $new_upload)) {
                return $unique_id . $filetype;
            } else {
                return "Fail";
            }

        } else {
            return "Fail";
        }


    }


}

?>