import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { ExpenseItem as ExpenseItemProps } from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

const ExpenseItem: React.FC<ExpenseItemProps> = ({
    description,
    amount,
    date,
}) => {
    return (
        <Pressable>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(date)}
                    </Text>
                    {/* <Text style={styles.textBase}>{date.toString()}</Text> */}
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount}</Text>
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
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
});
