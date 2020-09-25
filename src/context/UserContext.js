const { createContext } = require('react')
const { default: TokenService } = require('../services/token-service')

const user = {
	isLogged: TokenService.hasAuthToken(),
	setIsLogged: () => (user.isLogged = true),
}
export const UserContext = createContext(user)
