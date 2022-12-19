import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

export type ExpensesProps = {
    expenses: {
        id?: string;
        amount: number;
        description: string;
        date: Date;
    }[];
    expensesPeriod?: string;
    fallBackText?: string;
};

const ExpensesOutput: React.FC<ExpensesProps> = ({
    expenses,
    expensesPeriod,
    fallBackText,
}) => {
    let content = <Text style={styles.fallBackText}>{fallBackText}</Text>;

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />;
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={expenses}
                expensesPeriod={expensesPeriod}
            />
            {/* <ExpensesList expenses={expenses} /> */}
            {content}
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
    fallBackText: {
        marginTop: 32,
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
});
