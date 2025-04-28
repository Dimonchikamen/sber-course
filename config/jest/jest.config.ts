import type { Config } from 'jest';
import path from 'path';

const config: Config = {
    clearMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
    rootDir: '../../',
    testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
    setupFilesAfterEnv: ['<rootDir>config/jest/jest.setup.ts'],
    verbose: true,
    moduleNameMapper: {
        '\\.svg': path.resolve(__dirname, 'JestEmptyComponent.tsx'),
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': 'identity-obj-proxy',
        '^\\$(.*)$': '<rootDir>/src/$1',
    },
    globals: {
        __IS_DEV__: true,
        __API_URL__: '',
    },
};

export default config;

