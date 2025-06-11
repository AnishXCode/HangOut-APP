import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db, auth } from '../firebaseConfig';

export default function ProfileSetup({ navigation }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) setImage(result.uri);
  };

  const handleSave = async () => {
    const uid = auth.currentUser.uid;
    let photoUrl = '';

    if (image) {
      const imgRef = ref(storage, `profiles/${uid}`);
      const img = await fetch(image);
      const blob = await img.blob();
      await uploadBytes(imgRef, blob);
      photoUrl = await getDownloadURL(imgRef);
    }

    await setDoc(doc(db, "users", uid), {
      name,
      bio,
      photoUrl
    });

    navigation.replace('Home');
  };

  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Bio" value={bio} onChangeText={setBio} />
      <Button title="Save Profile" onPress={handleSave} />
    </View>
  );
}
