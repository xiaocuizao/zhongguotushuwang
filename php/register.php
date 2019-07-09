<?php
include "conn.php";
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from usertable where username='$user'");
    if ($result->fetch_assoc()) {
        echo true;
    } else { 
        echo false;
    }
} else {
    exit('非法操作');
}

