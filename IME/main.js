function handleKeydown(event) {
	console.log('[TestApp] handleKeydown : ' + event.keyCode);

	log(event.keyCode);

	switch(event.keyCode) {
		case 65376: // Done
			document.getElementById('input').blur();
		break;
		case 65385: // Cancel
			document.getElementById('input').blur();
		break;	
		case 10009:
			console.log('[TestApp] return');
			tizen.application.getCurrentApplication().exit();
			
		break;
        default:

            break;
	}
}

var result = '';
var text = '';

function main() {
	console.log('[TestApp] onload');
	
	document.getElementById('input').addEventListener('focus', function() {
		log('input element is focused and ready to get user input.');
	});

	document.getElementById('input').addEventListener('blur', function() {
		log('input element loses focus.');
	});

	document.getElementById('input').addEventListener('change', function() {
		log('input element value is changed. value is : ' + document.getElementById('input').value);
	});
}

function log(string) {
	result = result +' ' + string;
	document.getElementById('result').innerHTML = result;
}

function logClear() {
	result = '';
	document.getElementById('result').innerHTML = '';
}
