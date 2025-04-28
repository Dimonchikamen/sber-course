import { readdirSync } from 'fs';
import path from 'path';
import type webpack from 'webpack';

import type { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        // Динамические aliases по внешним папкам src
        alias: readdirSync(path.resolve(options.paths.src), {
            withFileTypes: true,
        })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .reduce(
                (aliases, folderName) => ({
                    ...aliases,
                    [`$${folderName}`]: path.resolve(`${options.paths.src}/${folderName}`),
                }),
                {}
            ),
    };
}
