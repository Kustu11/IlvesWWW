<?php


$txt1 = file_get_contents('top.php');
$txt1 .= "\n" . file_get_contents('index_body.php');
$txt1 .= "\n" . file_get_contents('bottom.php');


$fp = fopen('newcombined.php', 'w');
if (!$fp)
    die('Could not create / open text file for writing.');
if (fwrite($fp, $txt1) === false)
    die('Could not write to text file.');

echo 'Text files have been merged.';

?>

