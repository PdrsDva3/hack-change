import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../Pages/MainPage/MainPage';
import { RootLayout } from '../Pages';

export const AppRoutes = () => {
	return(
		<Routes>
			<Route path='/' element={<RootLayout/>}>
				<Route index element={<MainPage/>}/>

			</Route>
		</Routes>
	)
}
