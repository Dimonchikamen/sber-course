/* eslint-disable @typescript-eslint/naming-convention */
declare module '*bmp' {
    const src: string;
    export default src;
}

declare module '*gif' {
    const src: string;
    export default src;
}

declare module '*jpg' {
    const src: string;
    export default src;
}

declare module '*jpeg' {
    const src: string;
    export default src;
}

declare module '*png' {
    const src: string;
    export default src;
}

declare module '*wepb' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '*.module.scss' {
    const classNames: {
        [className: string]: string;
    };
    export default classNames;
}

declare module '*.module.css' {
    const classNames: {
        [className: string]: string;
    };
    export default classNames;
}

declare const __IS_DEV__: boolean;
declare const __API_URL__: string;
declare const __PUBLIC_PATH__: string;

declare type ValueOf<T extends object> = T[keyof T];

declare type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

declare const $CombinedState: unique symbol;
interface EmptyObject {
    readonly [$CombinedState]?: undefined;
}
declare type CombinedState<S> = EmptyObject & S;
