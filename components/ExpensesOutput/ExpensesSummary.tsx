import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ExpensesProps } from './ExpensesOutput';

const ExpensesSummary: React.FC<ExpensesProps> = ({
    expenses,
    expensesPeriod,
}) => {
    const expensesSum: number = expenses!.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View>
            <Text>{expensesPeriod}</Text>
            <Text>${expensesSum.toFixed(2)}</Text>
        </View>
    );
};

export default ExpensesSummary;

const styles = StyleSheet.create({});
