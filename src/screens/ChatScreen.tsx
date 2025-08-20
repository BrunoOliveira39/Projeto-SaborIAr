// src/screens/ChatScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  StatusBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { database } from '../config/firebaseConfig';
import { ref, push, onValue } from 'firebase/database';
import MessageBubble from '../components/MessageBubble';

const ChatScreen = () => {
  const { colors, theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const chatRef = ref(database, 'chats/chat-unico');
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(loadedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Use a API Keyboard para ajustar o layout
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        text: inputText,
        sender: 'user',
        createdAt: new Date().toISOString(),
      };
      const chatRef = ref(database, 'chats/chat-unico');
      push(chatRef, newMessage);
      setInputText('');
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    chatArea: {
      flex: 1,
      padding: 10,
    },
    inputArea: {
      flexDirection: 'row',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: colors.text,
      backgroundColor: colors.background,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 20,
      paddingHorizontal: 15,
      marginRight: 10,
      color: colors.text,
      paddingVertical: 8,
    },
    sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? colors.text : '#3d3d3dff',
      borderRadius: 20,
      paddingHorizontal: 20,
    },
    sendButtonText: {
      color: theme === 'dark' ? '#000' : '#fff',
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageBubble message={item} />}
        style={dynamicStyles.chatArea}
      />
      <View style={[dynamicStyles.inputArea, { paddingBottom: insets.bottom + keyboardHeight }]}>
        <TextInput
          style={dynamicStyles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Como você está se sentindo?"
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity style={dynamicStyles.sendButton} onPress={handleSendMessage}>
          <Text style={dynamicStyles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;