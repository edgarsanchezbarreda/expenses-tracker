import { StyleSheet, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense } from '../util/http';

export type ScreenNavigation = {
    navigation?: any;
    route?: any;
};

const ManageExpense: React.FC<ScreenNavigation> = ({ route, navigation }) => {
    const expenseContext = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseContext.expenses.find(
        expense => expense.id === editedExpenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        expenseContext.deleteExpense(editedExpenseId);
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = async (expenseData: {
        id: string;
        description: string;
        amount: number;
        date: Date;
    }) => {
        if (isEditing) {
            expenseContext.updateExpense(editedExpenseId, expenseData);
        } else {
            const id = await storeExpense(expenseData);
            expenseContext.addExpense({ ...expenseData, id: id });
        }
        navigation.goBack();
    };

    return (
        <View style={styles.screenContainer}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                selectedExpense={selectedExpense}
            />

            {isEditing && (
                <View style={styles.deleteButtonContainer}>
                    <IconButton
                        icon='trash'
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteButtonContainer: {
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
    },
});
