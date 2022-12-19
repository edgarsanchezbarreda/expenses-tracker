import axios from 'axios';

const BASE_URL = 'https://expense-tracker-37e63-default-rtdb.firebaseio.com';

export type StoreExpenseData = {
    id?: string;
    amount: number;
    date: Date;
    description: string;
};

export const storeExpense = async (
    expenseData: StoreExpenseData
): Promise<string> => {
    const response = await axios.post(`${BASE_URL}/expenses.json`, expenseData);
    const id = response.data.name;

    return id;
};

export const fetchExpenses = async (): Promise<StoreExpenseData[]> => {
    const response = await axios.get(`${BASE_URL}/expenses.json`);

    const expenses: StoreExpenseData[] = [];

    // console.log(response.data);

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }

    return expenses;
};
