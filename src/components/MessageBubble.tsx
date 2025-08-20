// src/components/MessageBubble.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface MessageProps {
    message: {
        text: string;
        sender: 'user' | 'llm';
    };
}

const MessageBubble: React.FC<MessageProps> = ({ message }) => {
    const { colors, theme } = useTheme();

    const isUser = message.sender === 'user';
    const alignmentStyle = isUser ? styles.userContainer : styles.llmContainer;

    // Estilos dinâmicos da bolha
    const userBubbleStyle = {
        backgroundColor: '#007bff',
        borderBottomRightRadius: 2,
    };

    const llmBubbleStyle = {
        backgroundColor: theme === 'dark' ? '#333' : '#e5e5e5',
        borderBottomLeftRadius: 2,
    };

    const bubbleStyle = isUser ? userBubbleStyle : llmBubbleStyle;
    const textStyle = isUser ? styles.userText : { color: colors.text };

    return (
        <View style={[styles.container, alignmentStyle]}>
            <View style={[styles.bubble, bubbleStyle]}>
                <Text style={[styles.text, textStyle]}>{message.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    userContainer: {
        justifyContent: 'flex-end',
    },
    llmContainer: {
        justifyContent: 'flex-start',
    },
    bubble: {
        padding: 10,
        borderRadius: 15,
        maxWidth: '80%',
    },
    userText: {
        color: '#fff',
    },
    text: {
        fontSize: 16,
    },
});

export default MessageBubble;