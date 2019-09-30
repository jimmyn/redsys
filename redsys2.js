var REDSYS_DOMAIN = 'https://sis-i.redsys.es:25443';
var IFRAME_REDSYS = 'redsys-hosted-pay-button';

function getRedsysDomain() {
	return REDSYS_DOMAIN;
}

function getCardInput(id, style){
var div = document.getElementById(id);
var frame = document.createElement('iframe');
	frame.setAttribute('id', 'redsys-hosted-field-number');
	frame.setAttribute('name','redsys-hosted-field-number');
	frame.setAttribute('style','width: 100%; height: 100%;');
	frame.setAttribute('frameborder', '0');
	frame.setAttribute('type', 'number');
	frame.setAttribute('scrolling', 'no');
	frame.setAttribute('sandbox','allow-same-origin allow-scripts');
	frame.setAttribute('src', REDSYS_DOMAIN +'/sis/getInputNC?style='+toHex(style)+'&frame=cardNumber');
	div.appendChild(frame);
}

function getExpirationYearInput(id, style){
var div = document.getElementById(id);
var frame = document.createElement('iframe');
	frame.setAttribute('id', 'redsys-hosted-field-expirationYear');
	frame.setAttribute('name','redsys-hosted-field-expirationYear');
	frame.setAttribute('style','width: 100%; height: 100%;');
	frame.setAttribute('frameborder', '0');
	frame.setAttribute('src', REDSYS_DOMAIN +'/sis/getInputNC?style='+toHex(style)+'&frame=expirationYear');
	frame.setAttribute('type', 'tel');
	frame.setAttribute('scrolling', 'no');
	frame.setAttribute('sandbox','allow-same-origin allow-scripts');
	div.appendChild(frame);
}

function getExpirationMonthInput(id, style){
var div = document.getElementById(id);
var frame = document.createElement('iframe');
	frame.setAttribute('id', 'redsys-hosted-field-expirationMonth');
	frame.setAttribute('name','redsys-hosted-field-expirationMonth');
	frame.setAttribute('style','width: 100%; height: 100%;');
	frame.setAttribute('frameborder', '0');
	frame.setAttribute('src', REDSYS_DOMAIN +'/sis/getInputNC?style='+toHex(style)+'&frame=expirationMonth');
	frame.setAttribute('type', 'tel');
	frame.setAttribute('scrolling', 'no');
	frame.setAttribute('sandbox','allow-same-origin allow-scripts');
	div.appendChild(frame);
}

function getCVVInput(id, style){
var div = document.getElementById(id);
var frame = document.createElement('iframe');
	frame.setAttribute('id', 'redsys-hosted-field-cvv');
	frame.setAttribute('name','redsys-hosted-field-cvv');
	frame.setAttribute('style','width: 100%; height: 100%;');
	frame.setAttribute('frameborder', '0');
	frame.setAttribute('type', 'number');
	frame.setAttribute('scrolling', 'no');
	frame.setAttribute('sandbox','allow-same-origin allow-scripts');
	frame.setAttribute('src',  REDSYS_DOMAIN +'/sis/getInputNC?style='+toHex(style)+'&frame=cvv');
	div.appendChild(frame);
}

function getPayButton(id, style, buttonValue, fuc, terminal, order){
var div = document.getElementById(id);
var frame = document.createElement('iframe');
	frame.setAttribute('id', IFRAME_REDSYS);
	frame.setAttribute('name',IFRAME_REDSYS);
	frame.setAttribute('style','width: 100%; height: 100%;');
	frame.setAttribute('frameborder', '0');
	frame.setAttribute('type', 'number');
	frame.setAttribute('scrolling', 'no');
	frame.setAttribute('sandbox','allow-same-origin allow-scripts allow-modals');
	frame.setAttribute('src', REDSYS_DOMAIN +'/sis/getInputNC?buttonValue='+toHex(buttonValue)+'&style='+toHex(style)+'&frame=button&fuc='+toHex(fuc)+'&terminal='+toHex(terminal)+'&order='+toHex(order));
	div.appendChild(frame);
	
	
}

function getInSiteForm(id, styleButton, styleBody, styleBox, styleBoxText, buttonValue, fuc, terminal, order){
	var div = document.getElementById(id);
	var frame = document.createElement('iframe');
		frame.setAttribute('id', IFRAME_REDSYS);
		frame.setAttribute('name',IFRAME_REDSYS);
		frame.setAttribute('style','width: 100%; height: 100%;');
		frame.setAttribute('frameborder', '0');
		frame.setAttribute('type', 'number');
		frame.setAttribute('scrolling', 'no');
		frame.setAttribute('sandbox','allow-same-origin allow-scripts allow-modals allow-popups');
		frame.setAttribute('src', REDSYS_DOMAIN +'/sis/getInputNC?buttonValue='+toHex(buttonValue)+'&styleButton='+toHex(styleButton)+'&styleBody='+toHex(styleBody)+'&styleBox='+toHex(styleBox)+'&styleBoxText='+toHex(styleBoxText)+'&frame=inSite&fuc='+toHex(fuc)+'&terminal='+toHex(terminal)+'&order='+toHex(order));
		div.appendChild(frame);
		
		
}
 function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

function storeIdOper(ev,id) {
	if(ev.data.idOper && ev.origin ==  REDSYS_DOMAIN){
		document.getElementById(id).value = ev.data.idOper;
	}
}
	
function loadRedsysForm() {
	if (window.frames[IFRAME_REDSYS]){
		window.frames[IFRAME_REDSYS].postMessage('domain', REDSYS_DOMAIN);
	}
}