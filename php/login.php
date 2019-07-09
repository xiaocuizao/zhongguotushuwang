<?php
include "conn.php";

if (isset($_GET['username'])&& isset($_GET['password'])) {
    $user = $_GET['username'];
    $pass = sha1($_GET['password']);
    $result=$conn->query("select * from usertable where username='$user' and password='$pass'");
    if ($result->fetch_assoc()) { //存在
        echo true;
    } else { //不存在
        echo false;
    }
} else {
    exit('非法操作');
}