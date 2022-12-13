import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { ExpenseItem as ExpenseItemProps } from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ExpenseItem: React.FC<ExpenseItemProps> = ({
    id,
    description,
    amount,
    date,
}) => {
    // const navigation = useNavigation();
    // This is a react native bug that occurs for some reason.
    // Below is a solution found on Stack Overflow
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const expensePressHandler = () => {
        navigation.navigate('ManageExpense', { expenseId: id });
    };

    return (
        <Pressable
            onPress={expensePressHandler}
            style={({ pressed }) => pressed && styles.pressed}
            android_ripple={{ color: '#ccc' }}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(date)}
                    </Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 15,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        borderRadius: 4,
        width: 80,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    },
});
