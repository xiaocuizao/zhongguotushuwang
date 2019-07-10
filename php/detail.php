<?php
include "conn.php";

if (isset($_GET['sid'])) {
    $sid = $_GET['sid'];
    $result=$conn->query("select * from lunbodata where picid='$sid'");
    echo (json_encode(mysqli_fetch_array($result))); 
} else {
    exit('非法操作');
}
// $result=$conn->query("select * from  lunbodata where  picid=1");
// echo (json_encode(mysqli_fetch_array($result))); 
