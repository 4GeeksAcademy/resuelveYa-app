const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listServices: [],
			username: localStorage.getItem('name'),
			resetEmail: ""
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
					})
					let data = await response.json()
					console.log(data);

					return data

				} catch (e) {
					console.error("Error in registration:", e)
				}
			},

			login: async (dataLogin) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						body: JSON.stringify(dataLogin),
						headers: { "content-type": "application/json" }
					})
					let data = await response.json()
					console.log(data)
					if (data.token) {
						console.log(`Welcome ${data.username}`)
						localStorage.setItem('token', data.token)
						localStorage.setItem('name', data.username)
						localStorage.setItem('user_id', data.user_id)
						setStore({ username: data.username })
					} else {
						console.log("Something went wrong")
					}
					return data
				} catch (e) {
					console.error(e)
				}
			},
			logout: () => {
				localStorage.removeItem('token');
				localStorage.removeItem('name');
				setStore({ username: "" });
				console.log("Logged out successfully!");
			},
			// Send password reset code
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
						// We save the email in the store and then display it in the NewPasswordForm component.
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
			// Change password using verification code
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
			getUsers: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users')

					const data = await response.json()
					setStore({ listServices: data })
					return data

				} catch (err) {
					console.error(err)
				}
			},
			getPostsProviders: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/posts')

					const data = await response.json()
					setStore({ listServices: data })
					return data
				} catch (err) {
					console.error(err)
				}
			},
			setListServices: (newList) => {
				setStore({ listServices: newList })
			},
			changeValueUsername: () => {
				setStore({ username: null })
			}
		}
	}
}

export default getState
