const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// message: null,
			listServices: []
		},
		actions: {
			register: async (values) => {
				try {
					const response = await fetch("https://potential-cod-4rxqgx7xx6whjg9g-3001.app.github.dev/api/register", {
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
					} else {
						console.log("Something went wrong")
					}
					return data
				} catch (e) {
					console.error(e)
				}
			},
			logout: () => {
				localStorage.removeItem('token')
				console.log("Logged out successfully!");
			},
			getUsers: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users')

					const data = await response.json()
					setStore({listServices: data})
					return data
					
				} catch(err){
					console.error(err)
				}
			},
			setListServices: (newList) => {
				setStore({listServices: newList})
			}
		}
	}
}

export default getState
