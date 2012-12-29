/**
 * Turns an element into a jquery datepicker.
 * Allows for the selection of multiple dates.
 * Links to a model
 * @example <div multipick ng:model="dates"></div>
 */
angular.module('picker', []).directive('multipick', function(){

	/**
	 * This directive creates a jQuery UI multi select calendar.
	 * You pass the model to this element and dates in that model will be prefilled.
	 * Selecting new dates updates the model
	 */
	return {
		link: function(scope, elm, attrs) {

			elm.multiDatesPicker();

			scope.$watch(attrs.ngModel, function(value) {
				if(typeof value == 'undefined') value = [];
				var options = {
					onSelect: function(date, inst){
						var dateIndex = $.inArray(date, value);
						if(dateIndex !== -1){
							value.splice(dateIndex, 1);
						} else {
							value.push(date);
						}
						log(value);
						scope.$apply();
					}
				};
				if(value.length !== 0) options.addDates = value;
				elm.multiDatesPicker(options);
			});
			
		}
	};

});
