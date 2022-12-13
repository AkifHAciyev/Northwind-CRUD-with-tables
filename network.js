const BASE_URL = 'https://northwind.vercel.app/api';

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 1000,
});

const network = {
	getAll: async (url) => {
		let responseData = [];
		await axiosInstance
			.get(`${url}`)
			.then((res) => {
				responseData = res.data;
			})
			.catch((err) => {
				console.log('Error', err);
				throw err;
			});

		return responseData;
	},
	add: async (url, data) => {
		let response = {};

		await axiosInstance.post(`${url}`, data).then((res) => {
			response = res.data;
		});

		return response;
	},
	getById: async (url, id) => {
		let response = {};
		await axiosInstance.get(`${url}/${id}`).then((res) => {
			response = res.data;
		});
		if (response == null) {
			throw '404 data not found!!';
		}
		return response;
	},
	delete: async (url, id) => {
		let response = {};
		await axiosInstance.delete(`${url}/${id}`).then((res) => {
			response = res.data;
		});
		return response;
	},

	// show in console
	getUpperPrice: async () => {
		await axiosInstance.get(`/products`).then((res) => {
			res.data.sort(function (a, b) {
				if (a.unitPrice > b.unitPrice) {
					return -1;
				}
				if (a.unitPrice < b.companyName) {
					return 1;
				}
				return 0;
			});

			console.log('en pahali', res.data[0].unitPrice);
		});
	},
	getMeanUnitsInStock: async () => {
		await axiosInstance.get(`/products`).then((res) => {
			let meanStock = res.data.reduce((acc, number) => acc + number.unitsInStock, 0);

			console.log('ortalama stok', meanStock / res.data.length);
		});
	},
	getStartC: async () => {
		let newC = [];
		await axiosInstance.get(`/products`).then((res) => {
			let startC = res.data.filter((e) => e.name.startsWith('C'));
			startC.forEach((element) => {
				newC.push(element.name);
			});
			console.log('C ile baslayan', newC);
		});
	},
	getLondon: async () => {
		let buyer = [];
		await axiosInstance.get(`/customers`).then((res) => {
			let filterBuyers = res.data.filter((e) => e.address.city === 'London');
			filterBuyers.forEach((element) => {
				buyer.push(element.contactName);
			});
			console.log('sehrindeki musterileri', buyer);
		});
	},
};

network.getUpperPrice();
network.getMeanUnitsInStock();
network.getStartC();
network.getLondon();
