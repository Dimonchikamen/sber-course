import type webpack from 'webpack';

import { buildCssLoaders } from './loaders/buildCssLoaders';
import type { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const fileLoader = {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'static/images/[hash][ext][query]'
        },
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const fontsLoader = {
        test:/\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'static/fonts/[hash][ext][query]'
        },
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const sassLoader = buildCssLoaders(isDev);

    return [fileLoader, fontsLoader, typeScriptLoader, sassLoader];
}
