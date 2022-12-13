let tbody = document.querySelector('#tbody');

function addList(element) {
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	td.innerHTML = element.companyName;

	let td1 = document.createElement('td');
	td1.innerHTML = element.contactName;

	let td2 = document.createElement('td');
	td2.innerHTML = element.contactTitle;

	let td3 = document.createElement('td');
	td3.innerHTML = element.address.region;

	tr.append(td);
	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	tbody.append(tr);
}

function showList() {
	network.getAll('/suppliers').then((response) => {
		response.forEach((element) => {
			addList(element);
		});
	});
}

window.addEventListener('load', () => {
	showList();
});
