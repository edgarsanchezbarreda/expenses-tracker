import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
    const expensesContext = useContext(ExpensesContext);

    return (
        <ExpensesOutput
            expenses={expensesContext.expenses}
            expensesPeriod='Total'
            fallBackText='No expenses found'
        />
    );
};

export default AllExpenses;

const styles = StyleSheet.create({});
