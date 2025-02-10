<!DOCTYPE html>
<html lang="de">
<head>

		<title>Tippspiel</title>
</head>
	<body>

<?php
    // Zu starten wie folgt: php tippspiel.php [param1] [param2] [param3] [param4] [param5]
    // Beispiel 6 aus 49 mit 5 Ziehungen und 3 aus 10 Zusatzzahlen
    // param1 	= 6
    // param2	= 49
    // param3	= 5
    // param4	= 3
    // param5	= 10

    $wieviel	= $_POST["parameter1"];
    $aus		= $_POST["parameter2"];
    $ziehungen	= $_POST["parameter3"];
    $zusatzwieviel = $_POST["parameter4"];
    $zusatzaus 	= $_POST["parameter5"];

    //Array erzeugen
    $_zahlen = array();

    //Array mit Zahlen von 1 - 50 füllen
    for($i=0; $i<$aus; $i++)
    {
        $_zahlen[$i] = $i+1;
    }

    $_zusatz = array();

    for($y=0; $y<$zusatzaus; $y++)
    {
        $_zusatz[$y] = $y+1;
    }

    for($x=1; $x<=$ziehungen; $x++)
    {
        //5 zufällige Zahlen bzw. Indizes aus dem Zahlen-Array ausgeben
        $_zufallszahlen = array_rand($_zahlen, $wieviel);

        //2 zufällige Zahlen bzw. Indizes aus dem Zusatz-Array ausgeben
        $_zusatzzahlen = array_rand($_zusatz, $zusatzwieviel);

        //Ausgeben einer Zeile von Zufallszahlen
        $zeile = $x.". Ziehung: ";

        for($n=0; $n < ($wieviel-1); $n++)
        {
            $zeile .= $_zahlen[$_zufallszahlen[$n]].", ";
        }

        $zeile .= $_zahlen[$_zufallszahlen[($wieviel-1)]]." - ";

        for($m=0; $m < ($zusatzwieviel-1); $m++)
        {
            $zeile .= $_zusatz[$_zusatzzahlen[$m]].", ";
        }

        $zeile .= $_zusatz[$_zusatzzahlen[($zusatzwieviel-1)]];

        echo $zeile. "\r\n";
    }
?>
	</body>
</html>