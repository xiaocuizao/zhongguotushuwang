<?php
include "conn.php";
if (isset($_GET['username'])&& isset($_GET['password'])) {
    $user = $_GET['username'];
    $pass = sha1($_GET['password']);
    $conn->query("insert usertable values(null,'$user','$pass',NOW()) ");
} else {
    exit('非法操作');
}