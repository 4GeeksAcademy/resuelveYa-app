const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// message: null,

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

				} catch (error) {
					console.error(error)
				}
			}
		}
	}
}

export default getState
