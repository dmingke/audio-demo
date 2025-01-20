type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}

interface A {
    name: string;
    age: number;
    sex: number;
}

type A1 = Pick<A, 'name'|'age'>