$( document ).ready(function() {
	$.each([ 15, 12, 10, 8 ], function( repIndex, repValue ) {
		$.each([ 5, 4, 3, 2, 1, 0 ], function( sofIndex, sofValue ) {
			$('table#chart > tbody').append('<tr class="selectable"><td>' + repValue + '</td><td class="sof-column">' + sofValue + '</td><td id="' + repValue + '-' + sofValue + '-weight"></td><td id="' + repValue + '-' + sofValue + '-weight-to-add"></td><td id="' + repValue + '-' + sofValue + '-split"></td></tr>');
	    });
	});

    $('.selectable').click(function() {
		$( this ).toggleClass('selected');
	});
});

$('#print-workout').click(function () {
	$('#chart-entry').toggle();
})
$('input#add').click(function () {
	$('#todays-workout > tbody').append('<tr><td colspan="4" class="title">'+$('#exercise-name').val() + '</td></tr>');
	$('.selected').each(function(index) {
		$( this ).toggleClass('selected');
		var row = $(this).clone();
		$('#todays-workout > tbody').append(row);
		$('#todays-workout tbody td').removeAttr('id');
	});
	$('#exercise-name').val('');
	$('#one-rep-max').val('');
	$('#machine-weight').val('');
	$('#todays-workout td.sof-column').hide();
});

$(".watch-for-change" ).change(function() {
	var reps = $('#reps').val();
	var repsWeight = $('#rep-weight').val();
	var oneRepMax = $('#one-rep-max').val();
	if (reps != "" && repsWeight != "") {
		oneRepMax = Math.round(repsWeight / (1.013 - (0.0267123 * reps)));
		$('#one-rep-max').val(oneRepMax);
	}
	var machineWeight = $('#machine-weight').val();
	
	$.each([ 15, 12, 10, 8 ], function( repIndex, repValue ) {
		$.each([ 5, 4, 3, 2, 1, 0 ], function( sofIndex, sofValue ) {
			var targetReps = repValue + sofValue;
			var pctOfMax = .5;
		
			if (targetReps >= 2 && targetReps <= 3)
			{
			   pctOfMax = .95;
			}
			else if (targetReps >= 4 && targetReps <= 5)
			{
			   pctOfMax = .9;
			}
			else if (targetReps >= 6 && targetReps <= 7)
			{
			   pctOfMax = .85;
			}
			else if (targetReps >= 8 && targetReps <= 9)
			{
			   pctOfMax = .8;
			}
			else if (targetReps >= 10 && targetReps <= 11)
			{
			   pctOfMax = .75;
			}
			else if (targetReps >= 12 && targetReps <= 13)
			{
			   pctOfMax = .7;
			}
			else if (targetReps >= 14 && targetReps <= 15)
			{
			   pctOfMax = .65;
			}
			else if (targetReps >= 16 && targetReps <= 17)
			{
			   pctOfMax = .6;
			}
			else if (targetReps >= 18 && targetReps <= 19)
			{
			   pctOfMax = .55;
			}
			else 
			{
			   pctOfMax = .5;
			}
			var weightKey = "#" + repValue + "-" + sofValue + "-weight";
			var weightToAddKey = "#" + repValue + "-" + sofValue + "-weight-to-add";
			var weightSplit = "#" + repValue + "-" + sofValue + "-split";
			var weightToLift = (pctOfMax * oneRepMax).toFixed();
			var weightToAdd = weightToLift;
			if (machineWeight > 0) {
				weightToAdd = weightToLift - machineWeight;
			}
			$(weightKey).text(weightToLift);
			$(weightToAddKey).text(weightToAdd);
			if ($('#split').is(':checked')) {
				$(weightSplit).text(weightToAdd / 2);
			} else {
				$(weightSplit).text('');
			}
	    });
  
	});
});
