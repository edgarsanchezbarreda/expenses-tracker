import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import CustomButton from '../UI/CustomButton';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

type ExpenseFormProps = {
    onCancel: () => void;
    onSubmit: (expenseData: {
        description: string;
        amount: number;
        date: Date;
    }) => void;
    submitButtonLabel: string;
    selectedExpense?: {
        id: string;
        amount: number;
        description: string;
        date: Date;
    };
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    onCancel,
    onSubmit,
    submitButtonLabel,
    selectedExpense,
}) => {
    const initialInputState = {
        amount: {
            value: selectedExpense
                ? selectedExpense.amount.toFixed(2).toString()
                : '',
            isValid: true,
        },
        date: {
            value: selectedExpense
                ? getFormattedDate(selectedExpense.date)
                : '',
            isValid: true,
        },
        description: {
            value: selectedExpense ? selectedExpense.description : '',
            isValid: true,
        },
    };

    const [inputs, setInputs] = useState(initialInputState);

    // This function allows us to dynamically set the state to each input without writing separate states for each input.
    // Not necessary, but is definitely cleaner
    const inputChangedHandler = (
        inputIdentifier: string,
        enteredValue: string
    ) => {
        setInputs(currentInputs => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    };

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid: boolean =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid: boolean =
            expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        // expenseData.description.value.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            // return;
            setInputs(currentInputs => {
                return {
                    amount: {
                        value: currentInputs.amount.value,
                        isValid: amountIsValid,
                    },
                    date: {
                        value: currentInputs.date.value,
                        isValid: dateIsValid,
                    },
                    description: {
                        value: currentInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;
        }
        onSubmit(expenseData);
    };

    const formIsInvalid: boolean =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.formTitle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label='Amount'
                    keyboardType='decimal-pad'
                    onChangeText={inputChangedHandler.bind(this, 'amount')}
                    // Creates two-way binding somehow... find out
                    value={inputs.amount.value}
                    invalid={!inputs.amount.isValid}
                />
                <Input
                    style={styles.rowInput}
                    label='Date'
                    placeholder='YYYY-MM-DD'
                    maxLength={10}
                    onChangeText={inputChangedHandler.bind(this, 'date')}
                    value={inputs.date.value}
                    invalid={!inputs.date.isValid}
                />
            </View>

            <Input
                label='Description'
                multiline={true}
                onChangeText={inputChangedHandler.bind(this, 'description')}
                value={inputs.description.value}
                invalid={!inputs.description.isValid}
            />

            {formIsInvalid && (
                <Text style={styles.errorText}>
                    Invalid input values - please check your entered information
                </Text>
            )}
            <View style={styles.customButtonContainer}>
                <CustomButton
                    style={styles.customButton}
                    mode='flat'
                    onPress={onCancel}
                >
                    Cancel
                </CustomButton>
                <CustomButton
                    style={styles.customButton}
                    onPress={submitHandler}
                    children={submitButtonLabel}
                ></CustomButton>
            </View>
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        // marginTop: 12,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
});
