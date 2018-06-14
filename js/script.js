var used_chadsvasc = false;
var filled_chadsvasc = false;
var filled_glasgow = false;

$(document).ready(function() {
	$('#modulo-historia-clinica').hide();
	$('#modulo-examen-fisico').hide();
});

function validate_info() {
	alert("Datos validados.");
	$('#modulo-historia-clinica').show();
	$('#CHA2DS2-VAS2C').hide();
	$('#anticoagulantes-orales').hide();
	$('#modulo-examen-fisico').hide();
}


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
        if (this !== prev_yes_no) {
            prev_yes_no = this;
            // Do stuff here
            if (this.value === 'yes'){
            	$('#CHA2DS2-VAS2C').show();
            	used_chadsvasc = true;
            }
            else {
            	$('#CHA2DS2-VAS2C').hide();
            	used_chadsvasc = false;
            }
        }
        $('#anticoagulantes-orales').show();

        // Taken from
		// https://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
		if (used_chadsvasc) {
	    	if (!filled_chadsvasc) {
	        	document.getElementById("continuar-examen-fisico").className =
						   document.getElementById("continuar-examen-fisico").className.replace
						      ( /(?:^|\s)active(?!\S)/g , ' disabled' );
	     	}
	     	else {
	        		document.getElementById("continuar-examen-fisico").className =
						   document.getElementById("continuar-examen-fisico").className.replace
						      ( /(?:^|\s)disabled(?!\S)/g , ' active' );
	    	}
	    }
        else {
        	document.getElementById("continuar-examen-fisico").className =
					   document.getElementById("continuar-examen-fisico").className.replace
					      ( /(?:^|\s)disabled(?!\S)/g , ' active' );
        }
    };
}

// Manage changes in CHADSVASC
function chadsvasc() {
	var radios = document.getElementById('CHA2DS2-VAS2C').getElementsByTagName('input');
	var questions = 7;
	var checked = 0;
	var score = 0;
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			checked += 1;
			score += parseInt(radios[i].value);
		}
	}

	$('#label-puntaje-chadsvasc').text(score.toString());
	if (checked === questions) {
		if ($('#chadsvasc-completado').text() !== 'Completa') {
			alert('Escala CHADSVASC fue completada. Puntaje: ' + score.toString());
			filled_chadsvasc = true;
		}
		$('#chadsvasc-completado').text('Completa');
	}

	// Change button from disabled to active or viceversa
	if (used_chadsvasc) {
    	if (!filled_chadsvasc) {
        	document.getElementById("continuar-examen-fisico").className =
					   document.getElementById("continuar-examen-fisico").className.replace
					      ( /(?:^|\s)active(?!\S)/g , ' disabled' );
     	}
     	else {
        		document.getElementById("continuar-examen-fisico").className =
					   document.getElementById("continuar-examen-fisico").className.replace
					      ( /(?:^|\s)disabled(?!\S)/g , ' active' );
    	}
    }
}

function list_anticoagulantes() {
	var cbs = document.getElementById('anticoagulantes-orales').getElementsByTagName('input');
	var elements = [];
	for (var i = 0; i < cbs.length; i++) {
		if (cbs[i].checked) {
			elements.push(cbs[i].value);
		}
	}
	if (elements.length === 0){
		// Empty array
		lista = 'Ninguno';
	}
	else {
		lista = elements.join(', ');
	}
	$('#lista_de_anticoagulantes').text(lista);
}

function continue_phys_exam() {
	console.log('phys exam')
	$('#modulo-examen-fisico').show();
}

function glasgow() {
	var radios = document.getElementById('glasgow').getElementsByTagName('input');
	var questions = 3;
	var checked = 0;
	var score = 0;
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			checked += 1;
			score += parseInt(radios[i].value);
		}
	}

	$('#label-puntaje-glasgow').text(score.toString());
	if (checked === questions) {
		if ($('#glasgow-completado').text() !== 'Completa') {
			alert('Escala Glasgow fue completada. Puntaje: ' + score.toString());
			filled_glasgow = true;
		}
		$('#glasgow-completado').text('Completa');
	}

}





