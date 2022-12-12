import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ListRenderItemInfo,
} from 'react-native';
import React from 'react';
import { ExpensesProps } from './ExpensesOutput';

// Figure out how to correctly type this
type ExpenseItem = {
    id: string;
    amount: number;
    description: string;
    date: string | Date;
};

const renderExpenseItem = (itemData: ListRenderItemInfo<ExpenseItem>) => {
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
