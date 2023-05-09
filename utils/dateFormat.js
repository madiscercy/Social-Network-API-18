const addZero = (i) => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

const dateFormat = (date) => {
	const d = new Date(date);
	const yyyy = d.getFullYear();
	const mm = addZero(d.getMonth() + 1);
	const dd = addZero(d.getDate());
	const hh = addZero(d.getHours());
	const min = addZero(d.getMinutes());
	const ss = addZero(d.getSeconds());

	return `${mm}/${dd}/${yyyy} ${hh}:${min}:${ss}`;
};

module.exports = dateFormat;
