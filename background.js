/* 
  Copyright 2018. Jefferson "jscher2000" Scher. License: MPL-2.0.
*/
function windowize(tab) {
	// If new tab is first in window, don't move it
	if (tab.index == 0){
		return;
	}

	// Assemble basic new window data from tab object
	var createData = {
		tabId: tab.id,
		incognito: tab.incognito
		// Not yet supported in Firefox: focused: tab.active
	};
	
	// Obtain window state information to preserve fullscreen 
	var srcwin = browser.windows.get(tab.windowId); // returns promise
	
	// use result (currently not handling error)
	srcwin.then(function(result) {
		console.log("WindowType="+result.type);
		if (result.state == "fullscreen") {
			createData.state  = "fullscreen";
		}
		// Create new window and move tab
		browser.windows.create(
			createData
		);
	}, function(error) {
		console.log('browser.window.get(tab.windowID) returned error; unable to set state');
		// Create new window and move tab
		browser.windows.create(
			createData
		);
	});
}
browser.tabs.onCreated.addListener(windowize);

// TODO: on and off functions for toolbar button
 