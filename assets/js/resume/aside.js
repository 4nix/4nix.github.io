define(['jquery'], function(jquery) {
	return {
		init: function() {
			var _this = this;
			jQuery("aside a").click(function(e) {
				e.preventDefault();
				jQuery("#personal, #skills, #experience, #aboutme").hide();
				jQuery("#"+jQuery(this).data("id")).show();
				if (jQuery(this).data("id") == "skills") {
					_this.initSkills();
				}
			});
		},

		initSkills: function() {
			jQuery("[id^='skills-']").hide();
			jQuery("#skills-main").show();
		}
	}
	
});