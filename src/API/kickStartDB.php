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


    public function __construct($host, $user, $password, $database){

        try {
            $this->db = new PDO('mysql:host='.$host.';dbname='.$database, $user, $password);
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    function __destruct() {
        //$this->db->query('SELECT pg_terminate_backend(pg_backend_pid());');
        $this->stmt = null;
        $this->db = null;
    }



    public function test()
    {
        try {
            $query = "SELECT * FROM USERS";
            $this->stmt = $this->db->query($query);

            $result = $this->stmt->fetchAll();
            return $result;

        }catch (PDOException $e){
            $this->stmt = null;
            return $e->getMessage();

        }

    }


    // Checks the user and password for match.
    public function checkUserPassword($user, $pass)
    {

        try {
            if ($user == "" || $pass == "")
                return "Wrong UserName Or Password";

            $c_pass = $this->calculatePassword($pass);
            $query = "SELECT UserName,UserAuthLvl FROM Users WHERE UserName=:user AND Password=:c_pass";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':user', $user);
            $this->stmt->bindParam(':c_pass', $c_pass);
            $this->stmt->execute();
            $res = $this->stmt->fetch();

            if ($this->stmt->rowCount() > 0)
                return $res;
            return "Wrong UserName Or Password";

        }catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();
        }


    }

    public function calculatePassword($pass)
    {
        $pass = $pass[0]. $pass. $pass[0] ;
        $pass = md5($pass);
        return $pass;
    }

    public function registerUser($user,$pass,$authLvl){

        try {

            $query = "SELECT UserName FROM Users WHERE UserName=:userName";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':userName', $user);
            $this->stmt->execute();

            if($this->stmt->rowCount() > 0)
                return "UserName Already Exist";
            else {

                $c_pass = $this->calculatePassword($pass);
                $query = "INSERT INTO Users (UserName, Password, UserAuthLvl) VALUES ( :userName, :c_pass, :authLvl )";
                $this->stmt = $this->db->prepare($query);
                $this->stmt->bindParam(':userName', $user);
                $this->stmt->bindParam(':c_pass', $c_pass);
                $this->stmt->bindParam(':authLvl', $authLvl);
                if($this->stmt->execute()) {

                    return "User Added Successfully";
                }
                else
                    return "Error Adding User";
            }

        }catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();
        }

    }


    public function addProject($name,$desc,$amount,$owner){

        try {
            $query = "INSERT INTO projects (Name, Description, AmountNeeded, Owner) VALUES ( :name, :desc, :amount, :owner )";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':name', $name);
            $this->stmt->bindParam(':desc', $desc);
            $this->stmt->bindParam(':amount', $amount);
            $this->stmt->bindParam(':owner', $owner);
            if($this->stmt->execute()) {

                return $this->db->lastInsertId();
            }
            else
                return "Error";


        }catch (PDOException $e) {
            $this->stmt = null;
            return $e->getMessage();
        }

    }

    public function updateMainPic($pid,$path){

        try {

            $query = "UPDATE projects SET MainPic = :path WHERE ID = :pid";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':path', $path);
            $this->stmt->bindParam(':pid', $pid);
            $this->stmt->execute();

        } catch (PDOException $e){
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }

    }

    public function addPic($pid,$path){

        try {

            $query = "INSERT INTO projectpic(ProjectId,Path) VALUES (:pid,:path)";
            $this->stmt = $this->db->prepare($query);
            $this->stmt->bindParam(':path', $path);
            $this->stmt->bindParam(':pid', $pid);
            $this->stmt->execute();

        } catch (PDOException $e){
            $this->stmt = null;
            $final_result['reason'] = $e->getMessage();
            return $final_result;
        }

    }

    public function getTopProjects()
    {
        try {
            $query = "SELECT id,MainPic as thumb, name, description, (30-DATEDIFF(CURDATE(),CreatedAt)) AS daysleft, coalesce(money.gatherd,0) as moneybacked
                      FROM projects
                      LEFT JOIN (
                      SELECT projectId , coalesce(sum(Amount),0) as gatherd FROM backers group by projectId) money ON money.projectId = projects.ID
                      WHERE DATE_SUB(CURDATE(),INTERVAL 30 DAY) <= CreatedAt
                      ORDER BY CreatedAt Asc
                      LIMIT 6";
            $this->stmt = $this->db->query($query);

            $result = $this->stmt->fetchAll();
            return $result;

        }catch (PDOException $e){
            $this->stmt = null;
            return $e->getMessage();

        }

    }





















    function makeDir($path){

        if (!file_exists($path)) {
           mkdir($path, true);
        }
    }


    function uploadFile($path, $fileName, $fileSize, $tempName){

        $allowedFileType = array(".jpeg", ".jpg", ".png");
        $filetype = strtolower(strrchr($fileName, '.'));

        if (in_array($filetype, $allowedFileType) && ($fileSize < 1048576))
        {

            $unique_id = md5(uniqid(rand(), true));
            $new_upload = $path."/".$unique_id.$filetype;
            if(move_uploaded_file($tempName, $new_upload))
            {
                return $unique_id.$filetype;
            }
            else
            {
                return "Fail";
            }

        }
        else
        {
            return "Fail";
        }


    }


}

?>




