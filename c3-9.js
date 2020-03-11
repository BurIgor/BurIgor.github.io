let askingCity = document.getElementById('askingCity');
let userCity = document.getElementById('userCity');
let yourCity = document.getElementById('yourCity');
let changeCity = document.getElementById('changeCity');

let savedCity = getCookie('userCity');

if (savedCity) {
	askingCity.style.display = 'none';
	yourCity.innerHTML = "Ваш город - " + savedCity;
	yourCity.style.display = 'block';
	changeCity.value = 'Очистить город';
} 
else {
	askingCity.style.display = 'block';
	yourCity.style.display = 'none';
	changeCity.value = 'Сохранить город';
}

changeCity.onclick = () => {
	if (savedCity) {
		savedCity = undefined;
		deleteCookie('userCity');
		askingCity.style.display = 'block';
		yourCity.style.display = 'none';
		changeCity.value = 'Сохранить город';
	}
	else {
		savedCity = userCity.value;
		setCookie('userCity', savedCity);
		askingCity.style.display = 'none';
		
		yourCity.style.display = 'block';
		changeCity.value = 'Очистить город';
	}
}


function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

	options = {
		path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  options.expires = new Date(Date.now() + 86400e3 * 365);

  if (options.expires instanceof Date) {
  	options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
  	updatedCookie += "; " + optionKey;
  	let optionValue = options[optionKey];
  	if (optionValue !== true) {
  		updatedCookie += "=" + optionValue;
  	}
  }

  document.cookie = updatedCookie;
  console.log(updatedCookie);
}

function deleteCookie(name) {
	setCookie(name, "", {
		'max-age': -1
	})
}