import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const handleLogin = async () => {
    const verifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    const confirmationResult = await signInWithPhoneNumber(auth, phone, verifier);
    setConfirmation(confirmationResult);
  };

  const confirmCode = async () => {
    try {
      await confirmation.confirm(code);
      navigation.replace('ProfileSetup');
    } catch (error) {
      alert("Invalid code");
    }
  };

  return (
    <View>
      <TextInput placeholder="Phone number" value={phone} onChangeText={setPhone} />
      <Button title="Send Code" onPress={handleLogin} />
      {confirmation && (
        <>
          <TextInput placeholder="Verification code" value={code} onChangeText={setCode} />
          <Button title="Verify" onPress={confirmCode} />
        </>
      )}
      <View id="recaptcha-container" />
    </View>
  );
}
