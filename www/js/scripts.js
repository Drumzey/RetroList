var consoleList = ["threedo", "amigacd32", "atari2600", "atari5200", "atari7800", "lynx", "jaguar", "st", "c64", "dreamcast", "gamecube", "gamegear", "gameboy", "mastersystem", "megadrive", "n64", "pcengine", "neogeo", "neogeocd", "nes", "pcfx", "playstation", "saturn", "snes", "turbografx16", "virtualboy"];

var consoleDisplayNameList = ["3D0 Interactive", "Amiga CD 32", "Atari 2600", "Atari 5200", "Atari 7800", "Atari Lynx", "Atari Jaguar", "Atari St", "Commodore 64", "Dreamcast", "Game Cube", "Game Gear", "Gameboy", "Master System", "Mega Drive", "N64", "NEC PC Engine", "Neo Geo", "Neo Geo CD", "NES", "PC-FX", "Playstation", "Saturn", "SNES", "TurboGrafx-16", "Virtualboy"];

var allGames;

var currentConsoleRecord;
var currentGameName = '';
var currentConsoleName = '';
var currentTab = '';

var ConsoleRecord = (function () {
	this.id = '';
    this.got = new Array();
	this.need = new Array();
});

function init()
{
	//window.localStorage.clear();
	SetNewThemeInUI();
	PopulateConsoleList();
	AddAllConsolesTile();
	PopulateUIWithConsolesIHave();	
	PopulateNumberOfGames();
}

function PopulateConsoleList()
{
	//remove all children
	var choice = document.getElementById("console-choice");	
	while (choice.firstChild) {
		choice.removeChild(choice.firstChild);
	};	
	
	var output = [];
	//Add the children back in
	for (var i = 0; i < consoleList.length; i++)
	{	
		var id = consoleList[i];		
		var name = consoleDisplayNameList[i];
		
		var got = window.localStorage.getItem(consoleList[i]);
		if (got != 1)
		{	
			//If we have the console already then dont add it to our available list
	       output.push('<option value="' + id + '">' + name + '</option>');	
		}					
	}
	$('#console-choice').append(output.join(''));
}

function PopulateNumberOfConsoles(totalConsoles)
{
	document.getElementById("numberConsoles").innerText = totalConsoles;
}

function PopulateNumberOfGames()
{
	var totalGames = 0;
	
	for (var i = 0; i < consoleList.length; i++)
	{
		var collection = JSON.parse(localStorage.getItem(consoleList[i] + "_collection"));
		
		if (collection)
		{
			totalGames = totalGames + collection.got.length;
		}
	}
	
	document.getElementById("numberGames").innerText = totalGames;
}

function PopulateUIWithConsolesIHave()
{
	var totalConsoles = 0;
	
	for (var i = 0; i < consoleList.length; i++)
	{	
		var got = window.localStorage.getItem(consoleList[i]);
		if (got == 1)
		{
			totalConsoles = totalConsoles + 1;
			AddNewConsoleByName(consoleList[i]);			
		}
	}
	PopulateNumberOfConsoles(totalConsoles);
}

function ReturnCorrectData(consoleName)
{
	if (consoleName =='threedo')
	{
		data = threedo;
	}
	else if (consoleName =='amigacd32')
	{
		data = amigacd32;
	}
	else if (consoleName =='atari2600')
	{
		data = atari2600;
	}
	else if (consoleName =='atari5200')
	{
		data = atari5200;
	}
	else if (consoleName =='atari7800')
	{
		data = atari7800;
	}
	else if (consoleName =='lynx')
	{
		data = lynx;
	}
	else if (consoleName =='jaguar')
	{
		data = jaguar;
	}
	else if (consoleName =='st')
	{
		data = st;
	}
	else if (consoleName =='c64')
	{
		data = c64;
	}
	else if (consoleName =='dreamcast')
	{
		data = dreamcast;
	}
	else if (consoleName =='gamecube')
	{
		data = gamecube;
	}
	else if (consoleName =='gamegear')
	{
		data = gamegear;
	}
	else if (consoleName =='gameboy')
	{
		data = gameboy;
	}	
	else if (consoleName =='mastersystem')
	{
		data = mastersystem;
	}
	else if (consoleName =='megadrive')
	{
		data = megadrive;
	}
	else if (consoleName =='n64')
	{
		data = n64;
	}
	else if (consoleName =='pcengine')
	{
		data = pcengine;
	}
	else if (consoleName =='neogeo')
	{
		data = neogeo;
	}
	else if (consoleName =='neogeocd')
	{
		data = neogeocd;
	}
	else if (consoleName =='nes')
	{
		data = nes;
	}
	else if (consoleName =='pcfx')
	{
		data = pcfx;
	}
	else if (consoleName =='playstation')
	{
		data = playstation;
	}
	else if (consoleName =='saturn')
	{
		data = saturn;
	}
	else if (consoleName =='snes')
	{
		data = snes;
	}
	else if (consoleName =='turbografx16')
	{
		data = turbografx16;
	}
	else if (consoleName =='virtualboy')
	{
		data = virtualboy;
	}
}

function RemoveAllChildrenFromGameList()
{
	var myNode = document.getElementById("gamelistul");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	};	
	
	myNode = document.getElementById("gamelistgotul");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	};	
	
	myNode = document.getElementById("gamelistwantul");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	};	
}

function PopulateListOfGamesForConsole(consoleName)
{
	ReturnCorrectData(consoleName);
	RemoveAllChildrenFromGameList();
	
	data = $($.parseXML(data));
	
	allGames = data.find('table');
	
    var output = [];
    allGames.each(function() {
        var name = jQuery(this).children('[name="name"]').text();
		
		var id = name.replace("&","");
		id = id.replace("'","");	
		id = id.replace("&apos;","");	
		id = id.replace("&amp;","");	
		
        //output.push('<li style="font-size:60%" onclick="GoToGame(this)" data-mini="true" id="' + id + '" class="ui-li ui-btn-up-c"><div class="checkBoxLeft"><input type="checkbox" name="checkbox-0" id="checkbox-0"/></div><a class="detailListText"><span class="detailListText">' + name + '</span></a></li>');
		
		output.push('<li style="font-size:60%" onclick="GoToGame(this)" data-mini="true" id="' + id + '" class="ui-li ui-btn-up-c"><a><span>' + name + '</span></a></li>');
    });
    $('#gamelist').children('ul').append(output.join('')).listview().listview('refresh');
    
}

function AllGamesPopulate()
{
	var gamenode = document.getElementById("allGamesul");
	while (gamenode.firstChild) {
		gamenode.removeChild(gamenode.firstChild);
	};	
	
	var totalConsoles = 0;
	var output = [];
	
	for (var i = 0; i < consoleList.length; i++)
	{	
		var got = window.localStorage.getItem(consoleList[i]);
		if (got == 1)
		{
			//We have the console to grab the console_collection object from
			//local storage and produce the games list
			var consoleCollection = JSON.parse(localStorage.getItem(consoleList[i] + "_collection"));
						
			var gots = consoleCollection.got;
		
			output.push('<li role="heading" data-role="list-divider" class="ui-li">' + consoleDisplayNameList[i] + '</li>');
		
			for (var j = 0; j < gots.length; j++)
			{
				var game = gots[j];
				
				var id = game.replace("&","");
				id = id.replace("'","");	
				id = id.replace("&apos;","");	
				id = id.replace("&amp;","");	
				
				output.push('<li style="font-size:60%" data-mini="true" id="' + id + '" class="ui-li ui-btn-up-c">' + game + '</li>');
			}			
		}
	}	
	
	$('#allGames').children('ul').append(output.join('')).listview().listview('refresh');
	
	window.location.href = '#Everything';
}

function AllGamesIHave()
{
	var theme = window.localStorage.getItem('theme');		
	
	if (theme == "mario")
	{
		theme = "d";				
	}
	else if (theme == "pacman")
	{
		theme = "e";				
	}
	else if (theme == "zelda")
	{
		theme = "f";				
	}
	else if (theme == "donkey")
	{		
		theme = "g";				
	}
	else
	{
		theme = "g";				
	}	
	
	$.mobile.loading( 'show', { theme: theme, text: "Loading...", textVisible: "true"});
    setTimeout(function(){
        AllGamesPopulate();       
    }, 1000);	
}

function PopulateListOfGamesIHave()
{
	myNode = document.getElementById("gamelistgotul");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	};	
	
	var gots = currentConsoleRecord.got;
		
	var output = [];
    	
	for (var i = 0; i < gots.length; i++)
	{
		var game = gots[i];
		
		var id = game.replace("&","");
		id = id.replace("'","");	
		id = id.replace("&apos;","");	
		id = id.replace("&amp;","");	
		
		output.push('<li style="font-size:60%" onclick="GoToGame(this)" data-mini="true" id="' + id + '" class="ui-li ui-btn-up-c"><a><span>' + game + '</span></a></li>');
	}
	
	$('#gamelistgot').children('ul').append(output.join('')).listview().listview('refresh');
}

function PopulateListOfGamesIWant()
{	
	myNode = document.getElementById("gamelistwantul");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	};	
	
	var needs = currentConsoleRecord.need;
		
	var output = [];
    	
	for (var i = 0; i < needs.length; i++)
	{
		var game = needs[i];
		
		var id = game.replace("&","");
		id = id.replace("'","");	
		id = id.replace("&apos;","");	
		id = id.replace("&amp;","");	
		
		output.push('<li style="font-size:60%" onclick="GoToGame(this)" data-mini="true" id="' + id + '" class="ui-li ui-btn-up-c"><a><span>' + game + '</span></a></li>');
	}
	
	$('#gamelistwant').children('ul').append(output.join('')).listview().listview('refresh');
}

$(document).on("taphold",".tile",function(e){
    e.preventDefault();
    e.stopPropagation();
    
	currentConsoleName = this.id;
	
	for (var i = 0; i < consoleList.length; i++)
	{	
		var id = consoleList[i];		
		var name = consoleDisplayNameList[i];
	
		if(id == currentConsoleName)
		{
			document.getElementById("deleteMessage").innerText = 'Are you sure you want to delete your records for the ' + name + '?';	
			$( "#DeleteConsole").popup('open');
			return;
		}	
	}
});

// Dynamically changes the theme of all UI elements on all pages,
// also pages not yet rendered (enhanced) by jQuery Mobile.
$.mobile.changeGlobalTheme = function(theme)
{
    // These themes will be cleared, add more
    // swatch letters as needed.
    var themes = " a b c d e f g h";

    // Updates the theme for all elements that match the
    // CSS selector with the specified theme class.
    function setTheme(cssSelector, themeClass, theme)
    {
        $(cssSelector)
            .removeClass(themes.split(" ").join(" " + themeClass + "-"))
            .addClass(themeClass + "-" + theme)
            .attr("data-theme", theme);
    }

    // Add more selectors/theme classes as needed.
    setTheme(".ui-mobile-viewport", "ui-overlay", theme);
    setTheme("[data-role='popup']", "ui-page-theme", theme);	
	setTheme("[data-role='content']", "ui-body", theme);
    setTheme("[data-role='header']", "ui-bar", theme);
    setTheme("[data-role='listview'] > li", "ui-bar", theme);
    setTheme(".ui-btn", "ui-btn-up", theme);
    setTheme(".ui-btn", "ui-btn-hover", theme);	
	setTheme("[data-role='page']", "ui-page-theme", theme);
	
	var x = document.getElementsByClassName("tile");
	var i;
	for (i = 0; i < x.length; i++) {
		
		if(theme == "d")
		{
			x[i].style.backgroundColor = "#DBFCFF";
		}
		if(theme == "e")
		{
			x[i].style.backgroundColor = "#CC9B08";
		}
		if(theme == "f")
		{
			x[i].style.backgroundColor = "#CC9E48";
		}
		if(theme == "g")
		{
			x[i].style.backgroundColor = "#ffffff";
		}		
	}	
};

function UpdateTheme()
{
	//Want to store the chosen icon and colour theme 
	var choice;
	
	$("input[id*=rc-theme-]:checked").each(function() {
        choice = $(this).val();
    });
	
	if (choice == "mario")
	{
		window.localStorage.setItem('theme', 'mario');
	}
	if (choice == "pacman")
	{
		window.localStorage.setItem('theme', 'pacman');
	}
	if (choice == "zelda")
	{
		window.localStorage.setItem('theme', 'zelda');
	}
	if (choice == "donkey")
	{		
		window.localStorage.setItem('theme', 'donkey');
	}
		
	$("input[id*=rc-pic-]:checked").each(function() {
        choice = $(this).val();
    });
	
	if (choice == "logo")
	{
		window.localStorage.setItem('theme_art', 'logo');
	}
	if (choice == "console")
	{
		window.localStorage.setItem('theme_art', 'console');
	}
	if (choice == "pixel")
	{
		window.localStorage.setItem('theme_art', 'pixel');
	}	
	
	SetNewThemeInUI();
}

function SetNewThemeInUI()
{
	var theme = window.localStorage.getItem('theme');
	
	var theme_art = window.localStorage.getItem('theme_art');
	
	if (theme_art == "logo")
	{
		
	}
	if (theme_art == "console")
	{
		
	}
	if (theme_art == "pixel")
	{
		
	}	
	
	if (theme == "mario")
	{
		theme = "d";	
		set_jqm_radio_button("radio-choice" , "mario");	
		
		$('link[id="secondstyle"]').attr('href','css/mario.css');
	}
	else if (theme == "pacman")
	{
		theme = "e";		
		set_jqm_radio_button("radio-choice" , "pacman");
		$('link[id="secondstyle"]').attr('href','css/pacman.css');
	}
	else if (theme == "zelda")
	{
		theme = "f";		
		set_jqm_radio_button("radio-choice" , "zelda");
		$('link[id="secondstyle"]').attr('href','css/zelda.css');
	}
	else 
	{
		theme = "g";		
		set_jqm_radio_button("radio-choice" , "donkey");
		$('link[id="secondstyle"]').attr('href','css/donkey.css');
	}
	
	$.mobile.changeGlobalTheme(theme);
}

function AddAllConsolesTile()
{
	var myNode = document.getElementById("ConsolePanel");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	};	
	
	var consoleElement = document.getElementById('AllTemplate');
	var consoleList = document.getElementById('ConsolePanel');
		
	var newConsole = consoleElement.cloneNode(true);
	
	newConsole.id = "AllGames";
		
	newConsole.style.backgroundImage = "url('/AllGames.png')";
	
	consoleList.appendChild(newConsole);		
}

function AddNewConsoleByName(consoleChosen)
{
	var consoleElement = document.getElementById('AddConsoleTemplate');
	var consoleList = document.getElementById('ConsolePanel');
		
	var newConsole = consoleElement.cloneNode(true);
	
	newConsole.id = consoleChosen;
		
	newConsole.style.backgroundImage = "url('/" + consoleChosen + "_logo.png')";
	
	consoleList.appendChild(newConsole);		
	
	AddToXml(consoleChosen)
}

function DeleteConsole()
{
	var element = document.getElementById(currentConsoleName);
	element.parentNode.removeChild(element);
	
	window.localStorage.removeItem(currentConsoleName);
	window.localStorage.removeItem(currentConsoleName + "_collection");
	
	var currentConsoles = document.getElementById("numberConsoles").innerText;	
	var numberOfConsoles = parseInt(currentConsoles, 10) - 1;	
	document.getElementById("numberConsoles").innerText = numberOfConsoles;
	
	//Repopulate the console list to add back in the item we just removed
	PopulateConsoleList();	
	PopulateNumberOfGames();
}

function set_jqm_radio_button_off( button_name, value ) {

	$( 'input:radio[name="' + button_name + '"]' ).filter( '[value="' +value + '"]' ).prop( 'checked', false ).checkboxradio().checkboxradio( 'refresh' );
}

function set_jqm_radio_button( button_name, value ) {

	$( 'input:radio[name="' + button_name + '"]' ).filter( '[value="' +value + '"]' ).prop( 'checked', true ).checkboxradio().checkboxradio( 'refresh' );
}

function AddNewConsole()
{	
	var choice = document.getElementById('console-choice');	
    var consoleChosen = choice.value;	
	AddNewConsoleByName(consoleChosen);
	
	//Repopulate the console list to remove the item we just added
	PopulateConsoleList();	
}

function AddAllGames(console)
{
	window.location.href = '#Console';
		
	for (var i = 0; i < consoleList.length; i++)
	{	
		var id = consoleList[i];		
		var name = consoleDisplayNameList[i];
	
		if(id == console.id)
		{
			var consoleCollection = JSON.parse(localStorage.getItem(id + "_collection"));
			currentConsoleRecord = consoleCollection;

			document.getElementById('GameCollection').innerText = name;			
			PopulateListOfGamesForConsole(console.id);
			PopulateListOfGamesIHave();
			PopulateListOfGamesIWant();
			
			currentTab = "GotTab";
			
			$(".tabs").tabs().tabs( "option", "active", 0 );			
			$('#GotTab').addClass('ui-btn-active');
			$('#NeedTab').removeClass('ui-btn-active');
			$('#AllTab').removeClass('ui-btn-active');
			
			return;
		}	
	}
}

function SetCurrentTab(name)
{
	currentTab = name;
}

function Rehighlight()
{
	if (currentTab == "GotTab")
	{
		$(".tabs").tabs().tabs( "option", "active", 0 );			
		$('#GotTab').addClass('ui-btn-active');
		$('#NeedTab').removeClass('ui-btn-active');
		$('#AllTab').removeClass('ui-btn-active');
	}
	else if (currentTab == "NeedTab")
	{
		$(".tabs").tabs().tabs( "option", "active", 1 );			
		$('#NeedTab').addClass('ui-btn-active');
		$('#GotTab').removeClass('ui-btn-active');
		$('#AllTab').removeClass('ui-btn-active');
	}
	else		
	{
		$(".tabs").tabs().tabs( "option", "active", 2 );			
		$('#AllTab').addClass('ui-btn-active');
		$('#NeedTab').removeClass('ui-btn-active');
		$('#GotTab').removeClass('ui-btn-active');
	}
}

function GoToConsole(console)
{
	var theme = window.localStorage.getItem('theme');		
	
	if (theme == "mario")
	{
		theme = "d";				
	}
	else if (theme == "pacman")
	{
		theme = "e";				
	}
	else if (theme == "zelda")
	{
		theme = "f";				
	}
	else if (theme == "donkey")
	{		
		theme = "g";				
	}
	else
	{
		theme = "g";				
	}	
	
	$.mobile.loading( 'show', { theme: theme, text: "Loading...", textVisible: "true"});
    setTimeout(function(){
        AddAllGames(console); //This takes 5 seconds to complete the operation        
    }, 1000);
}

function GoToGame(node)
{
	window.location.href = '#Game';
	PopulateInfoForGame(node);
}

function PopulateInfoForGame(node)
{	
	var nameOfGame = node.id;
	var trueName = node.innerText;
	
	currentGameName = nameOfGame;
	
	document.getElementById('GameName').innerText = trueName;		
	var $game = data.find("table[name='" + nameOfGame+ "']")
	
   	if ($game)
	{				
		var release = $game.attr("release");
		var region = $game.attr("region");
		var developer = $game.attr("developer");
		var genre = $game.attr("genre");
		var link = $game.attr("link");
		
		document.getElementById('release').innerText = release;
		document.getElementById('region').innerText = region;
		document.getElementById('developer').innerText = developer;
		document.getElementById('genre').innerText = genre;
		
		SetWikiPage(link);
		
		//Need to set the radio button for whether we have the game or not.
		
		var array = currentConsoleRecord.got;	
		var index = array.indexOf(currentGameName);

		if (index > -1)
		{
			set_jqm_radio_button_off("radio-view" , "need");
			set_jqm_radio_button_off("radio-view" , "dontwant");
			set_jqm_radio_button("radio-view" , "got");
			return;
		}
		
		array = currentConsoleRecord.need;	
		index = array.indexOf(currentGameName);

		if (index > -1)
		{
			set_jqm_radio_button_off("radio-view" , "got");
			set_jqm_radio_button_off("radio-view" , "dontwant");
			set_jqm_radio_button("radio-view" , "need");
			return;
		}
		
		set_jqm_radio_button_off("radio-view" , "got");
		set_jqm_radio_button_off("radio-view" , "need");
		set_jqm_radio_button("radio-view" , "dontwant");
		
	}        	
}

function AddToXml(consoleChosen)
{
	//We need to change the xml that records which consoles we have
	var present = window.localStorage.getItem(consoleChosen);
		
	var currentConsoles = document.getElementById("numberConsoles").innerText;
		
	var numberOfConsoles = parseInt(currentConsoles, 10) + 1;
		
	document.getElementById("numberConsoles").innerText = numberOfConsoles;
	
	if (present != 1)
	{
		window.localStorage.setItem(consoleChosen,'1');
		var console = new ConsoleRecord();	
		console.id = consoleChosen;
		window.localStorage.setItem(consoleChosen + "_collection", JSON.stringify(console));
	}	
}

function AddConsole()
{	
  $( "#NewConsole").popup('open');
}

function Setup()
{	
  $( "#Setup").popup('open');  
}

function DoYoutubeSearch()
{
	//search();
}

var currentLink;

function SetWikiPage(link)
{
	currentLink = link;
	
	if (link)
	{
		var button = document.getElementById("wikibutton");		
		//button.style.visibility = 'visible';
		
		var parent = $('embed#WikiPage').parent();
		var newElement = "<embed src='http://en.m.wikipedia.org" + link + "' id='WikiPage'>";

		$('embed#WikiPage').remove();
		parent.append(newElement);
	}	
}

function About()
{	
  $( "#About").popup('open');  
}

function NoWiki()
{	
  $( "#NoWikiPage").popup('open');  
}

function GoToWikipedia()
{
	if(currentLink)
	{
		if (NoConnection() == 'true')
		{
			window.location.href = '#Wikipedia';	
		}
		else
		{
			$( "#NoNet").popup('open');
		}			
		
	}
	else
	{
		NoWiki();
	}
}

function GoToYoutube()
{
	if (NoConnection() == 'true')
	{
		window.location.href = '#Youtube';
		DoYoutubeSearch();
	}
	else
	{
		$( "#NoNet").popup('open');  		
	}			
}

function AddToGot()
{
	var gotArray = currentConsoleRecord.got;	
	gotArray.push(currentGameName);	
	gotArray.sort();	
	currentConsoleRecord.got = gotArray;
	
	window.localStorage.setItem(currentConsoleRecord.id + "_collection", JSON.stringify(currentConsoleRecord));
	
	var consoleCollection = JSON.parse(localStorage.getItem(currentConsoleRecord.id + "_collection"));
	currentConsoleRecord = consoleCollection;
}

function AddToNeed()
{
	var needArray = currentConsoleRecord.need;	
	needArray.push(currentGameName);	
	needArray.sort();	
	currentConsoleRecord.need = needArray;
	
	window.localStorage.setItem(currentConsoleRecord.id + "_collection", JSON.stringify(currentConsoleRecord));
	
	var consoleCollection = JSON.parse(localStorage.getItem(currentConsoleRecord.id + "_collection"));
	currentConsoleRecord = consoleCollection;
}

function RemoveFromGot()
{
	var array = currentConsoleRecord.got;	
	var index = array.indexOf(currentGameName);

	if (index > -1) {
		array.splice(index, 1);
	}
	
	currentConsoleRecord.got = array;	
	window.localStorage.setItem(currentConsoleRecord.id + "_collection", JSON.stringify(currentConsoleRecord));	
	
	var consoleCollection = JSON.parse(localStorage.getItem(currentConsoleRecord.id + "_collection"));
	currentConsoleRecord = consoleCollection;
}

function RemoveFromNeed()
{
	var array = currentConsoleRecord.need;	
	var index = array.indexOf(currentGameName);

	if (index > -1) {
		array.splice(index, 1);
	}
	
	currentConsoleRecord.need = array;	
	window.localStorage.setItem(currentConsoleRecord.id + "_collection", JSON.stringify(currentConsoleRecord));	
	
	var consoleCollection = JSON.parse(localStorage.getItem(currentConsoleRecord.id + "_collection"));
	currentConsoleRecord = consoleCollection;
}

function ChangeGameStatus()
{
	var choice;
	
	$("input[id*=gndw-]:checked").each(function() {
        choice = $(this).val();
    });
	
	if (choice == "got")
	{
		RemoveFromNeed();		
		AddToGot()
		PopulateListOfGamesIHave(currentConsoleRecord);
		PopulateListOfGamesIWant(currentConsoleRecord);		
	}
	
	if (choice == "need")
	{
		RemoveFromGot();
		AddToNeed();		
		PopulateListOfGamesIHave(currentConsoleRecord);	
		PopulateListOfGamesIWant(currentConsoleRecord);
	}
	
	if (choice == "dontwant")
	{		
		RemoveFromGot();		
		RemoveFromNeed();
		PopulateListOfGamesIHave(currentConsoleRecord);
		PopulateListOfGamesIWant(currentConsoleRecord);
	}
}

function NoConnection()
{
	$.ajaxSetup({
    timeout: 1, // Microseconds, for the laughs.  Guaranteed timeout.
    error: function(request, status, maybe_an_exception_object) {
        if(status == 'timeout')
            return 'true';
    }
	});
	
	return 'false';
}