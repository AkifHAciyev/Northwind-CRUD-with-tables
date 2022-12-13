let tbody = document.querySelector('#tbody');

function addList(element) {
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	td.innerHTML = element.customerId;

	let td1 = document.createElement('td');
	td1.innerHTML = element.employeeId;

	let td2 = document.createElement('td');
	td2.innerHTML = element.orderDate;

	tr.append(td);
	tr.append(td1);
	tr.append(td2);
	tbody.append(tr);
}

function showList() {
	network.getAll('/orders').then((response) => {
		response
			.sort(function (a, b) {
				if (a.orderDate > b.orderDate) {
					return -1;
				}
				if (a.orderDate < b.orderDate) {
					return 1;
				}
				return 0;
			})
			.forEach((element) => {
				addList(element);
			});
	});
}

window.addEventListener('load', () => {
	showList();
});
