import { RouterProvider } from 'react-router-dom';

import { mainRouter } from './configure';
import { StoreProvider } from './StoreProvider';

export const App = () => {
    return (
        <StoreProvider>
            <RouterProvider router={mainRouter} />
        </StoreProvider>
    );
};
