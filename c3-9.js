const askingCity = document.getElementById('askingCity');
const userCity = document.getElementById('userCity');
const yourCity = document.getElementById('yourCity');
const changeCity = document.getElementById('changeCity');

const dontCallMe = document.getElementById('dontCallMe');
const readIt = document.getElementById('readIt');
const dontChoose = document.getElementById('dontChoose');
const freedom = document.getElementById('freedom');
const years12 = document.getElementById('years12');
const wellDone = document.getElementById('wellDone');
const saveIt = document.getElementById('saveIt');

const clearCookies = document.getElementById('clearCookies');

let savedCity = getCookie('userCity');
let attractFixed = getCookie('attractives');

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

if (attractFixed) {
	dontCallMe.checked = getCookie('dontCallMe') == 'true';
	dontCallMe.disabled = true;
	readIt.checked = getCookie('readIt') == 'true';
	readIt.disabled = true;
	dontChoose.checked = getCookie('dontChoose') == 'true';
	dontChoose.disabled = true;
	freedom.checked = getCookie('freedom') == 'true';
	freedom.disabled = true;
	years12.checked = getCookie('years12') == 'true';
	years12.disabled = true;
	wellDone.checked = getCookie('wellDone') == 'true';
	wellDone.disabled = true;
	saveIt.value = 'Сохранено';
	saveIt.disabled = true;
	clearCookies.style.display = 'block';
}
else {
	dontCallMe.disabled = false;
	readIt.disabled = false;
	dontChoose.disabled = false;
	freedom.disabled = false;
	years12.disabled = false;
	wellDone.disabled = false;
	clearCookies.style.display = 'none';
}

// Обработка нажатий команды сохранения/очистки города
// Если город был сохранен (не пустое savedCity):
//       - очистить, подготовить ввод нового значения
// Иначе - сохранить в cookie новое значение
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

// Сохранить значения предпочтений. 
// Закрыть возможность корректировки.
saveIt.onclick = () => {
	setCookie('attractives', true);
	setCookie('dontCallMe', dontCallMe.checked);
	setCookie('readIt', readIt.checked);
	setCookie('dontChoose', dontChoose.checked);
	setCookie('freedom', freedom.checked);
	setCookie('years12', years12.checked);
	setCookie('wellDone', wellDone.checked);
}

// Очистить cookies (для экспериментов)
clearCookies.onclick = () => {
	deleteCookie('userCity');
	deleteCookie('attractives');
	deleteCookie('dontCallMe');
	deleteCookie('readIt');
	deleteCookie('dontChoose');
	deleteCookie('freedom');
	deleteCookie('years12');
	deleteCookie('wellDone');
}

//  Получить значение cookie
function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

//  Установить значение cookie
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

//  Удалить заданный cookie
function deleteCookie(name) {
	setCookie(name, "", {
		'max-age': -1
	})
}