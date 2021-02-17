import { createContext } from 'react'
import TokenService from '../services/token-service'
/**
 * context that checks the browser for a token
 * and includes a function that updates the context
 */
const user = {
	isLogged: TokenService.hasAuthToken(),
	setIsLogged: () => (user.isLogged = true),
}
export const UserContext = createContext(user)
