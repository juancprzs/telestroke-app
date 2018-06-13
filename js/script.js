$(document).ready(function() {
	$('#descripcion-sintomas').hide();
	// Validación de información
	$('#validar-informacion').on('click', function() {
		alert("Datos validados.");
		$('#descripcion-sintomas').show();
		$('#CHA2DS2-VAS2C').hide();
	});
});

// validate if input is number (prevent writing)
// Taken from 
// https://stackoverflow.com/questions/469357/html-text-input-allows-only-numeric-input
function validate_number(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]/;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

// Check for change in radio buttons of "antecedentes de fibrilación auricular"
// Taken from
// https://stackoverflow.com/questions/8838648/onchange-event-handler-for-radio-button-input-type-radio-doesnt-work-as-one
var rad = document.yes_no_radios.yes_no;
var prev_yes_no = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].onclick = function() {
        if(this !== prev_yes_no) {
            prev_yes_no = this;
            // Do stuff here
            if(this.value === 'yes'){
            	$('#CHA2DS2-VAS2C').show();
            }
            else {
            	$('#CHA2DS2-VAS2C').hide();
            }
        }
    };
}

// Manage changes in CHADSVASC
function chadsvasc(radio_names) {
	var radios = document.getElementById('CHA2DS2-VAS2C').getElementsByTagName('input');
	var score = 0;
	for (var i = 0; i < radios.length; i++) {
		if(radios[i].checked) {
			score += radios[i].value;
		}
	}
	// $('#label-puntaje-chadsvasc').empty();
	$('#label-puntaje-chadsvasc').text(score.toString());
}



