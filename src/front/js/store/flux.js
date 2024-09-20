const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listServices: [],
			username: localStorage.getItem('name'),
			resetEmail: "",
			clientInfo: null,
			providerInfo: null,
			dataUserLogin: {},
			user: null,
		},
		actions: {
			register: async (values) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/register", {
						method: "POST",
						body: JSON.stringify(values),
						headers: {
							"content-type": "application/json"
						}
					});
					let data = await response.json();
					console.log(data);

					return data;
				} catch (e) {
					console.error("Error in registration:", e);
				}
			},

			login: async (dataLogin) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						body: JSON.stringify(dataLogin),
						headers: { "content-type": "application/json" }
					});
					let data = await response.json();
					console.log(data);
					if (data.token) {
						console.log(`Welcome ${data.username}`);
						localStorage.setItem('token', data.token);
						localStorage.setItem('name', data.username);
						localStorage.setItem('user_id', data.user_id);
						setStore({ username: data.username });
					} else {
						console.log("Something went wrong");
					}
					return data;
				} catch (e) {
					console.error(e);
				}
			},

			logout: () => {
				localStorage.removeItem('token');
				localStorage.removeItem('name');
				localStorage.removeItem('user_id');
				setStore({
					username: "",
					user: null,
					clientInfo: null,
					providerInfo: null
				});
				console.log("Logged out successfully!");
			},

			sendCode: async (email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/request_reset_password", {
						method: "POST",
						body: JSON.stringify({ email }),
						headers: {
							"content-type": "application/json"
						}
					});
					let data = await response.json();
					console.log(data);

					if (response.ok) {
						setStore({ resetEmail: email });
						return { success: true, message: data.message };
					} else {
						return { success: false, message: data.message };
					}
				} catch (e) {
					console.error("Error al enviar el código:", e);
					return { success: false, message: "Error al enviar el código" };
				}
			},

			newPassword: async (email, reset_code, new_password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/reset_password", {
						method: "POST",
						body: JSON.stringify({ email, reset_code, new_password }),
						headers: {
							"content-type": "application/json"
						}
					});

					let data = await response.json();
					console.log(data);

					if (response.ok) {
						return { success: true, message: data.message };
					} else {
						return { success: false, message: data.message };
					}
				} catch (e) {
					console.error("Error in newPassword:", e);
					return { success: false, message: "Error al cambiar la contraseña" };
				}
			},

			// getClientInformation: async (clientId) => {
			// 	try {
			// 		const response = await fetch(`/api/client_information/${clientId}`, {
			// 			method: "GET",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				Authorization: `Bearer ${localStorage.getItem('token')}`
			// 			}
			// 		});
			// 		const data = await response.json();
			// 		if (response.ok) {
			// 			setStore({ clientInfo: data });
			// 		}
			// 		return data;
			// 	} catch (error) {
			// 		console.error("Error fetching client information:", error);
			// 	}
			// },

			getProviderInformation: async () => {
				let token = localStorage.getItem('token');
				if (!token) {
					console.log("First log in to get a token");
					return;
				}
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/provider_information", {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						}
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ providerInfo: data });
					}
					return data;
				} catch (error) {
					console.error("Error fetching provider information:", error);
				}
			},

			getUsers: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users');
					const data = await response.json();
					return data;
				} catch (err) {
					console.error(err);
				}
			},

			getPostsProviders: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/posts');
					const data = await response.json();
					setStore({ listServices: data });
					return data;
				} catch (err) {
					console.error(err);
				}
			},

			newPostProvider: async (dataPost) => {
				const actions = getActions();
				let token = localStorage.getItem('token');
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/create_posts', {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(dataPost)
					});

					const data = await response.json();
					console.log(data);
					actions.getPostsProviders();
				} catch (err) {
					console.error(err);
				}
			},

			setListServices: (newList) => {
				setStore({ listServices: newList });
			},

			editUserPersonalData: async (userData) => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/edit_profile", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(userData),
					});

					const data = await response.json();
					if (response.ok) {
						setStore({ dataUserLogin: data.new_data });
						return { success: true, message: data.msg };
					} else {
						return { success: false, message: data.msg };
					}
				} catch (error) {
					console.error("Error en editUserProfile:", error);
					return { success: false, message: "Error al actualizar el perfil" };
				}
			},

			editUserPassword: async (currentPassword, newPassword) => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/edit_profile", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							password: currentPassword,
							new_password: newPassword
						})
					});

					const data = await response.json();
					if (response.ok) {
						return { success: true, message: data.msg };
					} else {
						return { success: false, message: data.msg };
					}
				} catch (error) {
					console.error("Error en changePassword:", error);
					return { success: false, message: "Error al cambiar la contraseña" };
				}
			},

			// Payment 
			processPayment: async (paymentData) => {
			console.log("Este es el paymentData:" , paymentData);
				try {
					//const token = localStorage.getItem("token");
					const response = await fetch(process.env.BACKEND_URL + "/api/payments", {
						method: "POST",
						headers: {
							//"Authorization": `Bearer ${token}`,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(paymentData)
					});

					const data = await response.json();
					console.log("Payment response:", data);
					return data;
				} catch (error) {
					console.error("Error in processPayment:", error);
					return { success: false, message: "Error en el procesamiento del pago" };
				}
			},
			getUserInfoById: async (user_id) => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`
						}
					});

					const data = await response.json();
					if (response.ok) {

						setStore({
							user: data,
						});
						return { success: true, data: data };
					} else {
						console.error("Error obteniendo la información del usuario:", data.message);
						return { success: false, message: data.message };
					}
				} catch (error) {
					console.error("Error en getUserInfoById:", error);
					return { success: false, message: "Error al obtener la información del usuario" };
				}
			},

		}
	};
};

export default getState;
