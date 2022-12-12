import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { ExpensesProps } from './ExpensesOutput';

// Figure out how to correctly type this
const renderExpenseItem = (itemData: any) => {
    return <Text>{itemData.item.description}</Text>;
};

const ExpensesList: React.FC<ExpensesProps> = ({ expenses }) => {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={item => item.id}
        />
    );
};

export default ExpensesList;

const styles = StyleSheet.create({});
