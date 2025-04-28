import type { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import type { StateSchema } from '$models';
import { createReduxStore } from '$store';

interface StoreProviderProps {
    children: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState }) => {
    const store = createReduxStore(initialState as StateSchema);

    return <Provider store={store}>{children}</Provider>;
};
