import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/UI/CustomButton';

export type ScreenNavigation = {
    navigation?: any;
    route?: any;
};

const ManageExpense: React.FC<ScreenNavigation> = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        console.log(editedExpenseId);

        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.customButtonContainer}>
                <CustomButton
                    style={styles.customButton}
                    mode='flat'
                    onPress={cancelHandler}
                >
                    Cancel
                </CustomButton>
                <CustomButton
                    style={styles.customButton}
                    onPress={confirmHandler}
                >
                    {isEditing ? 'Update' : 'Add'}
                </CustomButton>
            </View>
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
    customButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customButton: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});
