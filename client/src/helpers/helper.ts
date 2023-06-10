export function getExpenseTotal(list: any): number {
    let sum: number = 0;
    list.forEach((item: any) => { sum+=item.exp_amount; });
    return sum;
}