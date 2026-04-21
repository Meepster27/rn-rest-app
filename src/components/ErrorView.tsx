import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorView = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>{message || 'An error occurred. Please try again.'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8d7da',
        padding: 20,
    },
    errorText: {
        color: '#721c24',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ErrorView;