export default interface outputAble {
    send:(inputType: number, namespace: string, value: any) => void
}