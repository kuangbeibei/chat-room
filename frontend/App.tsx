import React, { FC, StrictMode, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Welcome from "./Welcome";
import Chat from "./Chat";

const router = createBrowserRouter([
	{
		path: "/",
		//@ts-ignore
		element: <Chat />,
	},
	{
		path: "/welcome",
		element: <Welcome />,
	},
]);

const App: FC<{}> = () => {
	return (
		<StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
			
		</StrictMode>
	);
};

export default App;
