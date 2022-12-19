import React, { createContext, useReducer, useState } from 'react';

// const DUMMY_EXPENSES = [
//     {
//         id: 'e1',
//         description: 'A pair of shoes',
//         amount: 59.99,
//         date: new Date('2021-12-19'),
//     },
//     {
//         id: 'e2',
//         description: 'A pair of trousers',
//         amount: 89.29,
//         date: new Date('2022-01-05'),
//     },
//     {
//         id: 'e3',
//         description: 'Some bananas',
//         amount: 5.99,
//         date: new Date('2021-12-01'),
//     },
//     {
//         id: 'e4',
//         description: 'A book',
//         amount: 14.99,
//         date: new Date('2022-02-19'),
//     },
//     {
//         id: 'e5',
//         description: 'Another book',
//         amount: 18.59,
//         date: new Date('2022-02-18'),
//     },
// ];

type ExpensesContextType = {
    expenses: { id: string; amount: number; description: string; date: Date }[];
    addExpense: ({
        id,
        description,
        amount,
        date,
    }: {
        id: string;
        description: string;
        amount: number;
        date: Date;
    }) => void;
    // Must fix this type below, causing type error in RecentExpenses.tsx
    setExpenses: (expenses: any) => void;
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
    setExpenses: expenses => {},
    deleteExpense: id => {},
    updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state: any, action: { type: any; payload: any }) => {
    switch (action.type) {
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state];
        case 'SET':
            // This array is inverted because firebase loads the expenses in the order which they were added, not with the latest first like we want
            const invertedExpenseArr = action.payload.reverse();
            return invertedExpenseArr;
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
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData: {
        description: string;
        amount: number;
        date: Date;
    }) => {
        dispatch({ type: 'ADD', payload: expenseData });
    };

    const setExpenses = (expenses: {
        amount: number;
        date: Date;
        description: string;
    }) => {
        dispatch({ type: 'SET', payload: expenses });
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
        setExpenses: setExpenses,
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
