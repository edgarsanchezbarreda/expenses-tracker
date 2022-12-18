import React, { createContext, useReducer, useState } from 'react';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19'),
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05'),
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01'),
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19'),
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2022-02-18'),
    },
];

type ExpensesContextType = {
    expenses: { id: string; amount: number; description: string; date: Date }[];
    addExpense: ({
        description,
        amount,
        date,
    }: {
        description: string;
        amount: number;
        date: Date;
    }) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (
        id: string,
        {
            description,
            amount,
            date,
        }: {
            description: string;
            amount: number;
            date: Date;
        }
    ) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: id => {},
    updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state: any, action: { type: any; payload: any }) => {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense: { id: string }) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {
                ...updatableExpense,
                ...action.payload.data,
            };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter(
                (expense: { id: string }) => expense.id !== action.payload
            );
        default:
            return state;
    }
};

const ExpensesContextProvider = ({ children }: { children: any }) => {
    const [expensesState, dispatch] = useReducer(
        expensesReducer,
        DUMMY_EXPENSES
    );

    const addExpense = (expenseData: {
        description: string;
        amount: number;
        date: Date;
    }) => {
        dispatch({ type: 'ADD', payload: expenseData });
    };

    const deleteExpense = (id: string) => {
        dispatch({ type: 'DELETE', payload: id });
    };

    const updateExpense = (
        id: string,
        expenseData: {
            description: string;
            amount: number;
            date: Date;
        }
    ) => {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    };

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
};

export default ExpensesContextProvider;
