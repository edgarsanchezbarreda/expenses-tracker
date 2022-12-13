import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ListRenderItemInfo,
} from 'react-native';
import React from 'react';
import { ExpensesProps } from './ExpensesOutput';
import ExpenseItem from './ExpenseItem';

export type ExpenseItem = {
    id?: string;
    amount: number;
    description: string;
    date: Date;
};

const renderExpenseItem = (itemData: ListRenderItemInfo<ExpenseItem>) => {
    return <ExpenseItem {...itemData.item} />;
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
