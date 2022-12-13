import { StyleSheet, View } from 'react-native';
import React from 'react';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

export type ExpensesProps = {
    expenses?: {
        id: string;
        amount: number;
        description: string;
        date: Date;
    }[];
    expensesPeriod?: string;
};

const ExpensesOutput: React.FC<ExpensesProps> = ({
    expenses,
    expensesPeriod,
}) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={DUMMY_EXPENSES}
                expensesPeriod={expensesPeriod}
            />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
});
