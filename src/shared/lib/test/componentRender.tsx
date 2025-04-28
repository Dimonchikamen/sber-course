import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import { StoreProvider } from '$app/StoreProvider';
import type { StateSchema } from '$models';

export type ComponentRenderOptions = {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
};

export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    const { route = '/', initialState } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState}>{component}</StoreProvider>
        </MemoryRouter>
    );
}
