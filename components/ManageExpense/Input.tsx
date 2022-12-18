import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TextInputProps,
    TextStyle,
    ViewStyle,
} from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/styles';

interface InputProps extends TextInputProps {
    label: string;
    style?: any;
    invalid: boolean;
}

interface Styles {
    input: any;
    inputContainer: ViewStyle;
    label: TextStyle;
    inputMultiline: TextStyle;
    invalidLabel: TextStyle;
    invalidInput: ViewStyle;
}

const Input: React.FC<InputProps> = props => {
    const inputStyles = [styles.input];

    // Contains all props passed without 'style' prop.
    const { style, ...styleProps } = props;

    if (props.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    if (props.invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, props.style]}>
            <Text style={[styles.label, props.invalid && styles.invalidLabel]}>
                {props.label}
            </Text>
            <TextInput style={inputStyles} {...styleProps} />
        </View>
    );
};

export default Input;

const styles: Styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        marginBottom: 4,
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        color: GlobalStyles.colors.primary700,
        fontSize: 18,
        borderRadius: 6,
    },
    inputMultiline: {
        minHeight: 100,
        // textAlignVertical is to make this effect cross-platform
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    },
});
