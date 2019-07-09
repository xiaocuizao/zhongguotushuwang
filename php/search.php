<?php
 require "conn.php";
 header('content-type:text/html;charset=utf-8');
if(isset($_GET['value'])){
    $value=$_GET['value'];
     $searchphp=file_get_contents("http://www.bookschina.com/book_find2/ajax/?action={$value}&keyword={$value}");
     echo  $searchphp;
}
