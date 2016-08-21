<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
	if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']) && isset($_POST['select'])) {
		date_default_timezone_set('America/Los_Angeles');
		$date = date('m/d/Y h:i:s a', time());
		$data =  $date . ',' . $_POST['name'] . ',' . $_POST['email'] . ',' . $_POST['select'] . ',' . $_POST['message'] . "\n";
	    $ret = file_put_contents('hidden/responses.txt', $data, FILE_APPEND | LOCK_EX);
	    if($ret === false) {
        	$msg = array("error"=>"couldn't");
	    }
	    else {
     	   $msg = array("success"=>"Your response was recorded. Thanks, " . $_POST['name'] . "!");
	    }
	}
	else {
        $msg = array("error"=>"no data");

	}
    echo json_encode($msg);die;

?>
