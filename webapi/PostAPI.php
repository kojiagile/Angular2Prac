<?php
require_once('DBConnection.php');

class DBControl {
	function getAllPosts() {
		$conn = null;
		// $new_array[] = null;
		try {
			$conn = new DBConnection();
			$conn = $conn->getConn();

			$sql = "select id, title, content, datetime from post order by datetime desc, id asc;";
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
			    while($row = $result->fetch_assoc()) {
			    	$new_array[] = array(
					    'id' => $row['id'],
					    'title' => $row['title'],
					    'content' => $row['content'],
					    'date' => $row['datetime']
					);
			        // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
			    }
			} else {
			    echo "0 results";
			}
			$conn->close();
		} catch(Exception $e) {
			echo $e;
		} finally {
			if($conn != null) {
				mysql_close($conn);
			}
		}

		return $new_array;
	}

	function insert() {

		$conn = null;
		$ret = array("result" => "success");
		try {
			$conn = new DBConnection();
			$conn = $conn->getConn();

			$title = $_GET['title'];
			$content = $_GET['content'];
			// $datetime = $_GET['datetime'];
			$datetime = date("Y-m-d H:i:s");
			// echo $title;
			// echo $content;
			// echo $datetime;

			$sql = "insert into post (title, content, datetime)";
			$sql .= " values ('" . $title . "', '" . $content . "', '" . $datetime . "');";

			if ($conn->query($sql) === TRUE) {
				// echo "New record created successfully";
				// echo "good";
			} else {
				// echo "Error: " . $sql . "<br>" . $conn->error;
				$ret = array("result" => "error");
			}
			$conn->close();
		} catch(Exception $e) {
			echo $e;
		} finally {
			if($conn != null) {
				mysql_close($conn);
			}
		}

		return $ret;
		
	}

	function searchByTitle($title) {
		$conn = null;
		// $new_array[] = null;
		try {
			$conn = new DBConnection();
			$conn = $conn->getConn();

			$sql = "select id, title, content, datetime from post where title like '%" . $title . "%';";
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
			    while($row = $result->fetch_assoc()) {
			    	$new_array[] = array(
					    'id' => $row['id'],
					    'title' => $row['title'],
					    'content' => $row['content'],
					    'date' => $row['datetime']
					);
			        // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
			    }
			} else {
			    $new_array[] = [];
			}
			$conn->close();
		} catch(Exception $e) {
			echo $e;
		} finally {
			if($conn != null) {
				mysql_close($conn);
			}
		}

		return $new_array;

	}
}
?>