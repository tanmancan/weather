
var renderPage = function(tpl, weatherData) {
	var getTemplate = new XMLHttpRequest();
	var source,
		template,
		page = document.getElementById('page')
		data = weatherData;

	getTemplate.onreadystatechange = function() {
		if (getTemplate.readyState === XMLHttpRequest.DONE) {
			switch (getTemplate.status) {
				case 200:
					source = getTemplate.responseText;
					template = Handlebars.compile(source);
					page.innerHTML = template(data);
					console.log(data);
					break;
				case 400:
				case 403:
				case 500:
					html.innerHTML = "Could not load weather info!";
					break;
			}
		}
	};
	getTemplate.open('GET', '/tpl/' + tpl + '.handlebars', true);
	getTemplate.send(null);
};
