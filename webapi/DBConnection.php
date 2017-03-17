<?php
class DBConnection
{
	// public DBConnection() {}

	public function getConn() {
		$servername = "127.0.0.1";
		$username = "koji";
		$password = "kabikira128!";

		// Create connection
		$conn = new mysqli($servername, $username, $password, "post");

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 
		// echo "Connected successfully";
		return $conn;
	}
}
?>