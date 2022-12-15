let tbody = document.querySelector('#tbody');

function addList(element) {
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	td.innerHTML = element.companyName;

	let td1 = document.createElement('td');
	td1.innerHTML = element.contactName;

	let btnDelete = document.createElement('button');
	btnDelete.classList.add('btn');
	btnDelete.innerHTML = 'delete';

	tr.append(td);
	tr.append(td1);
	tr.append(btnDelete);
	tbody.append(tr);
	btnDelete.addEventListener('click', () => {
		itemDelete(element.id);
		tbody.innerHTML = '';
	});
}

function showList() {
	network.getAll('/suppliers').then((response) => {
		console.log(response);
		response
			.sort(function (a, b) {
				if (a.companyName < b.companyName) {
					return -1;
				}
				if (a.companyName > b.companyName) {
					return 1;
				}
				return 0;
			})
			.forEach((element) => {
				addList(element);
			});
	});
}

function itemUpdate(element) {
	isUpdate = true;
	idUpdateBtn = element.id;
	companyName.value = element.companyName;
	contactName.value = element.contactName;
	contactTitle.value = element.contactTitle;
	console.log(element.id);
}

function itemDelete(id) {
	network.delete('/suppliers', id).then(() => {
		showList();
	});
}

window.addEventListener('load', () => {
	showList();
});
