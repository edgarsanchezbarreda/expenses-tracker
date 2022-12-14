import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
    const expensesContext = useContext(ExpensesContext);

    const recentExpenses = expensesContext.expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date >= date7DaysAgo && expense.date <= today;
    });
    console.log(recentExpenses);

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Last 7 days'
        />
    );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
