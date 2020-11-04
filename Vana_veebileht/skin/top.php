<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="description" content="<?php echo $PageSetup["description"]; ?>" />
<meta name="WebsiteSpark" content="mJGGrRGhcn" />
<link rel="Shortcut Icon" href="<?php echo $Env["user_dir"]; ?>site.ico" />
<link rel="STYLESHEET" type="text/css" media="screen" href="<?php echo $PageSetup["skinURL"]; ?>style.css" />
<link rel="STYLESHEET" type="text/css" media="print"  href="<?php echo $PageSetup["skinURL"]; ?>style_print.css" />
<link rel="alternate" type="application/rss+xml" title="RSS <?php echo $PageSetup["name"]; ?>" href="<?php echo $Env["URL"]; ?>rss.php" />
<script type="text/javascript" src="<?php echo $Env["URL"].$Env["tools"]; ?>common.js" ></script>
<script type="text/javascript" src="<?php echo $Env["URL"].$Env["tools"]; ?>calendar.js" ></script>
<title><?php echo $PageSetup["name"]."::".$pageTitle;?></title>
</head>
<body class="ccmsPublic">
    <div class="ccmsBody">
    <div class="ccmsMain">
        <div class="ccmsHeader">
            <img src="<?php echo $PageSetup["skinURL"]; ?>ilves_logo.png" alt="" border="0" class="logo">
            <div class="ccmsBanner">&nbsp;
            </div>
    </div> <!--ccmsHeader-->
    <div class="ccmsSidebar left"> 
<?php
	$oMenu = new cMenu('ilvesMenu',$ccms_LANG) ;
	$oMenu->MenuItems	=  $MenuItems;
	$oMenu->Align		=  "Left" ;
	$oMenu->BaseUrl		=  $Env["dirURL"];
	$oMenu->CurrentPage	=  $ccms_pageId;
	$oMenu->MenuType	=  "veerg2";
	$oMenu->Create() ;
?>
                 <a href="<?php echo $Env["URL"]; ?>rss.php"><img src="<?php echo $Env["dirURL"].$Env["skin"];?>RSS.gif" border="0" width="34" height="14" alt="RSS"></a> 
<br />
<?php langList($PageSetup["languages"], $ccms_LANG); ?>
<br clear="all">
<img src="<?php echo $PageSetup["skinURL"]; ?>ilveskp.gif" alt="" border="0">

<?php
	$oKalender = new cPage('IlvesKalender') ;
	$oKalender -> env  = $Env;
	$oKalender -> dbds = $cDB;
	echo $oKalender -> vCalendar(0,array('vaade'=>'mini','filter'=>'ei'));
?>
</div> <!--ccmsSidebar left-->  
<div class="ccmsSidebar right">
</div><!--ccmsSidebar-->
<div class="ccmsContent">
<!-- content -->