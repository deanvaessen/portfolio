<?php
require("scripts/sendgrid-php/sendgrid-php.php");
  
$sendgrid = new SendGrid('removed, renewed as variable');

$name = $_POST['name'];
$mailadres = $_POST['mailadres'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$email = new SendGrid\Email();
$email
    ->addTo('hello@deanvaessen.com')
    //->addTo('bar@foo.com') //One of the most notable changes is how `addTo()` behaves. We are now using our Web API parameters instead of the X-SMTPAPI header. What this means is that if you call `addTo()` multiple times for an email, **ONE** email will be sent with each email address visible to everyone.
    ->setFrom("{$name}-{$mailadres}")
    ->setSubject($subject)
    ->setText($message)
    ->setHtml($message)
;

//Catch the error

try {
    $sendgrid->send($email);
    echo "<br /> <br /><h5>Thank you, I'll get back to you ASAP</h5>";
} catch(\SendGrid\Exception $e) {
    echo "<br /<br /><h5>Whoops! Something went wrong, here's the error:</h5><br />";
    $errorcode = $e->getCode();
    echo "<h6>$errorcode</h6>";
    foreach($e->getErrors() as $er) {
        echo "<h6>$er</h6>";
        echo "<br /> <br /> <br /> <button id=\"post__return\" class=\"msc-inline typo--light btn btn-red btn--size--20\">Return</button><br /><br />";
    }
}

?>
