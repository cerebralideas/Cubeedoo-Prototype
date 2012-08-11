/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'IcoMoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-spades' : '&#x73;',
			'icon-clubs' : '&#x63;',
			'icon-diamonds' : '&#x64;',
			'icon-heart' : '&#x68;',
			'icon-support' : '&#x6c;',
			'icon-home' : '&#x48;',
			'icon-pencil' : '&#x65;',
			'icon-compass' : '&#x43;',
			'icon-location' : '&#x29;',
			'icon-mobile' : '&#x49;',
			'icon-screen' : '&#x50;',
			'icon-tablet' : '&#x54;',
			'icon-equalizer' : '&#x53;',
			'icon-loading' : '&#x4c;',
			'icon-grid-view' : '&#x67;',
			'icon-trophy' : '&#x61;',
			'icon-arrow-down' : '&#x31;',
			'icon-arrow-right' : '&#x32;',
			'icon-arrow-up' : '&#x33;',
			'icon-arrow-left' : '&#x34;',
			'icon-twitter' : '&#x74;',
			'icon-info' : '&#x69;',
			'icon-star' : '&#x2a;',
			'icon-star-2' : '&#x6f;',
			'icon-download' : '&#x44;',
			'icon-droplet' : '&#x70;',
			'icon-cancel' : '&#x78;',
			'icon-checkmark' : '&#x79;',
			'icon-clipboard' : '&#x3d;',
			'icon-seven-segment' : '&#x38;',
			'icon-safari' : '&#x21;',
			'icon-bicycle' : '&#x4f;',
			'icon-cube' : '&#x62;',
			'icon-github' : '&#x47;',
			'icon-clock' : '&#x27;',
			'icon-play' : '&#x22;',
			'icon-pause' : '&#x23;',
			'icon-stop' : '&#x24;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^s'"]+/);
		if (c) {
			addIcon(el, icons[c[0]]);
		}
	}
};