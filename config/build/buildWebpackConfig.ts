import type webpack from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import type { BuildOptions } from './types/config';

export function buildWebpackConfig(
    options: BuildOptions
): webpack.Configuration {
    const { mode, paths, isDev, publicPath } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[hash].js',
            path: paths.output,
            publicPath,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev ? 'inline-source-map' : undefined,
    };
}
