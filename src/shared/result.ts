export type Result<TValue = void> = {
    ok: true,
    value: TValue
} | {
    ok: false,
    reason: string;
};