<?php
require_once('PostAPI.php');
error_reporting(0);
$ctrl = new PostAPI();
$ret = $ctrl->insert();


header('Content-type: application/json');
// json format
// echo json_encode($userData);

// jsonp format
echo $_GET['callback'] . '(' . json_encode($ret). ')';

?>