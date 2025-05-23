export type BuildMode = "production" | "development";

export type BuildPaths = {
    entry: string;
    output: string;
    html: string;
    src: string;
};

export type BuildOptions = {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    publicPath: string;
    apiUrl: string;
};

export type BuildEnv = {
    mode: BuildMode;
    port: number;
    apiUrl: string;
};
