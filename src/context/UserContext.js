import { createContext } from 'react'
import TokenService from '../services/token-service'

const user = {
	isLogged: TokenService.hasAuthToken(),
	setIsLogged: () => (user.isLogged = true),
}
export const UserContext = createContext(user)
