<?php
// show error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);
 
// home page url
$home_url="https://sparcccode.000webhostapp.com/api/";
 
// page given in URL parameter, default page is one
$page = isset($_GET['page']) ? $_GET['page'] : 1;
 
// set number of records per page
$records_per_page = 5;
 
// calculate for the query LIMIT clause
// e.g. x = (5* page=2) -5           x = 5 (this is page 2)
$from_record_num = ($records_per_page * $page) - $records_per_page;
?>