import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export default function HomeScreen() {
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      const uid = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));
      const firstDegree = userDoc.data().friends || [];

      let graphData = [];

      for (const fid of firstDegree) {
        const friendDoc = await getDoc(doc(db, 'users', fid));
        const secondDegree = friendDoc.data().friends || [];

        graphData.push({ id: fid, type: '1st-degree' });

        secondDegree.forEach(sid => {
          if (sid !== uid && !firstDegree.includes(sid)) {
            graphData.push({ id: sid, type: '2nd-degree' });
          }
        });
      }

      setGraph(graphData);
    };

    fetchConnections();
  }, []);

  return (
    <View>
      <Text>Graph View</Text>
      <FlatList
        data={graph}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.type}: {item.id}</Text>
        )}
      />
    </View>
  );
}
