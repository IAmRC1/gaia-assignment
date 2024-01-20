import {
    Link,
    Outlet,
    Router,
    Route,
    RootRoute,
} from '@tanstack/react-router';
import { Box } from '@mui/material'
import Register from '../routes/index.component'

export const AppRoute = new RootRoute({
  component: () => <Outlet />,
})

const indexRoute = new Route({
    getParentRoute: () => AppRoute,
    path: '/',
    component: Register,
})

const loginRoute = new Route({
    getParentRoute: () => AppRoute,
    path: '/login',
    component: function Login() {
        return (
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <span>You have registered successfully!</span>
                <Link to='/'>New Register</Link>
            </Box>
        )
    },
})

const mainRouteTree = AppRoute.addChildren([indexRoute, loginRoute])
export const router = new Router({ routeTree: mainRouteTree })

declare module '@tanstack/react-router' {
    interface Register {
      router: typeof router
    }
}
