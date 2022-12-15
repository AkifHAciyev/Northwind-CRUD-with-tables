let tbody = document.querySelector('#tbody');
let companyName = document.getElementById('companyName');
let contactName = document.getElementById('contactName');
let contactTitle = document.getElementById('contactTitle');
let btnPutUpdate = document.getElementById('btnPutUpdate');
let isUpdate = false;
const url = 'https://northwind.vercel.app/api/suppliers';
function addList(element) {
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	td.innerHTML = element.companyName;

	let td1 = document.createElement('td');
	td1.innerHTML = element.contactName;

	let td2 = document.createElement('td');
	td2.innerHTML = element.contactTitle;

	let td3 = document.createElement('td');
	td3.innerHTML = element.address?.region;

	let btnUpdate = document.createElement('button');
	btnUpdate.classList.add('btn');
	btnUpdate.innerHTML = 'Update';

	//modal
	let modal = document.querySelector('.modal');
	let closeButton = document.querySelector('.close-button');

	function toggleModal() {
		modal.classList.toggle('show-modal');
	}

	function removeModal() {
		modal.classList.remove('show-modal');
	}

	function windowOnClick(event) {
		if (event.target === modal) {
			toggleModal();
		}
	}

	btnUpdate.addEventListener('click', toggleModal);
	closeButton.addEventListener('click', removeModal);
	window.addEventListener('click', windowOnClick);

	btnUpdate.addEventListener('click', () => itemUpdate(element));

	btnPutUpdate.addEventListener('click', () => {
		add();
		tbody.innerHTML = '';
		removeModal();
	});

	tr.append(td);
	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	tr.append(btnUpdate);
	tbody.append(tr);
}

async function showList() {
	await network.getAll('/suppliers').then((response) => {
		response.forEach((element) => {
			addList(element);
		});
	});
}

async function add() {
	if (isUpdate) {
		await axios
			.put(`${url}/${idUpdateBtn}`, {
				companyName: companyName.value,
				contactName: contactName.value,
				contactTitle: contactTitle.value,
			})
			.then(() => {
				showList();
			});
		isUpdate = false;
	} else {
		addList();
		isUpdate = false;
	}
	companyName.value = ' ';
	contactName.value = ' ';
	contactTitle.value = ' ';
	tbody.innerHTML = '';
}

function itemUpdate(element) {
	isUpdate = true;
	idUpdateBtn = element.id;
	companyName.value = element.companyName;
	contactName.value = element.contactName;
	contactTitle.value = element.contactTitle;
	console.log(element.id);
}

window.addEventListener('load', () => {
	showList();
});
