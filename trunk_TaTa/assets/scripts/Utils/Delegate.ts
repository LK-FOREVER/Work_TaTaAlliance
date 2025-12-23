// 泛型委托
declare type Action = () => void;
declare type Action1<T> = (t: T) => void;
declare type Action1_1<T> = (t?: T) => void;
declare type Action2<T1, T2> = (t1: T1, t2: T2) => void;
declare type Action2_2<T1, T2> = (t1: T1, t2?: T2) => void;
declare type Action3<T1, T2, T3> = (t1: T1, t2: T2, t3: T3) => void;
declare type Action4<T1, T2, T3, T4> = (t1: T1, t2: T2, t3: T3, t4: T4) => void;
declare type Func<TResult> = () => TResult;
declare type Func1<T, TResult> = (t: T) => TResult;
declare type Func2<T1, T2, TResult> = (t1: T1, t2: T2) => TResult;
declare type Func3<T1, T2, T3, TResult> = (t1: T1, t2: T2, t3: T3) => TResult;
declare type Func4<T1, T2, T3, T4, TResult> = (
    t1: T1,
    t2: T2,
    t3: T3,
    t4: T4
) => TResult;
