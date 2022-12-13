const URL = 'https://northwind.now.sh/api/categories';
const URL_Vercel = 'https://northwind.vercel.app/api/customers';
const URL_Toastr = 'https://www.npmjs.com/package/toastr';

const succsesDiv = document.querySelector('.succsesDiv');
const inputName = document.querySelector('#inputName');
const inputDescr = document.querySelector('#inputDescr');
const btn_add = document.querySelector('#btn_add');

function add() {
	const p = document.createElement('p');
	p.classList.add('sucsessP');
	p.innerText = 'Success!';

	inputName.addEventListener('input', () => {
		console.log(inputName.value);
	});

	inputDescr.addEventListener('input', () => {
		console.log(inputName.value);
	});

	let info = {
		name: inputName.value,
		description: inputDescr.value,
	};
	network.add('/categories', info).then(() => {
		succsesDiv.appendChild(p);
	});
}

btn_add.addEventListener('click', () => {
	add();
});
