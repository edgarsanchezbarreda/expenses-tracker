import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import { StoreExpenseData } from '../util/http';

const RecentExpenses = () => {
    const expensesContext = useContext(ExpensesContext);
    // const [fetchedExpenses, setFetchedExpenses] = useState<StoreExpenseData[]>(
    //     []
    // );

    useEffect(() => {
        const getExpenses = async () => {
            const expenses = await fetchExpenses();
            expensesContext.setExpenses(expenses);
        };

        getExpenses();
    }, []);

    // const recentExpenses = fetchedExpenses.filter(expense => {
    //     const today = new Date();

    //     const date7DaysAgo = getDateMinusDays(today, 7);

    //     return expense.date >= date7DaysAgo && expense.date <= today;
    // });
    const recentExpenses = expensesContext.expenses.filter(expense => {
        const today = new Date();

        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date >= date7DaysAgo && expense.date <= today;
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Last 7 days'
            fallBackText='No expenses for the last 7 days'
        />
    );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
