const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// message: null,
			
		},
		actions: {
			register: async (formData) => {
				try{
					const response = await fetch("https://humble-fortnight-9xp6qp79977fxxpw-3001.app.github.dev/api/register", {
						method: "POST",
						body: JSON.stringify(formData),
						headers:{
							"Content-type": "application/json"
						}
					})
					let data = await response.json()
					return data
					
				}catch(e){
					console.error("Error in registration:", e)
				}
			}
		}
	}
}

export default getState
