<?php
	define('TITLE', 'Die epische Zusammenfassung');
	define('BASE_URL', 'http://aline.abler.ch/dw/');
	define('DATA_FILE', 'zufa.xml');
	define('MAX_ENTRIES', 10);
	
	$xml = simplexml_load_file(DATA_FILE);
	$entries = [];
	foreach ($xml->entry as $item) {
		$entries[] = [
			'title' => trim($item->tagline->__toString()),
			'text' => trim($item->text->__toString()),
			'link' => BASE_URL.'#'.rawurlencode(trim($item->location->__toString())),
		];
	}
	
	$entries = array_slice($entries, -MAX_ENTRIES);
	
	header('Content-Type: text/xml; charset=UTF-8');
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\" ?".">";
?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title><?= TITLE ?></title>
		<link><?= BASE_URL ?></link>
<?php
	foreach ($entries as $entry) {
		echo "<item>".PHP_EOL;
		echo "	<title><![CDATA[".$entry['title']."]]></title>".PHP_EOL;
		echo "	<link>".$entry['link']."</link>".PHP_EOL;
		echo "	<description>";
		echo '<![CDATA['.nl2br($entry['text']).']]>';
		echo "</description>".PHP_EOL;
		echo "</item>".PHP_EOL;
	}
?>
	</channel>
</rss>