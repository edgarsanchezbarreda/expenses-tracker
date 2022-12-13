import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ExpensesProps } from './ExpensesOutput';
import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary: React.FC<ExpensesProps> = ({
    expenses,
    expensesPeriod,
}) => {
    const expensesSum: number = expenses!.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{expensesPeriod}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    },
});
