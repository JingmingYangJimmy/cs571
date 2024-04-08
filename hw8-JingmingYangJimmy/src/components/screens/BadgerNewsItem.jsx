import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

function BadgerNewsItem({ article }) {

  const navigation=useNavigation();

  const handlePress=()=>{
    navigation.navigate('anotherDetail',{articleId:article.fullArticleId });
  }
  
  return (
    <Pressable onPress={handlePress}>
    <View style={{ margin: 9, borderWidth: 2, borderColor: '#ddd', borderRadius: 5, overflow: 'hidden' }}>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${article.img}` }}
        style={{ width: '100%', height: 201 }}

      />
      <Text style={{ margin: 30, fontWeight: 'bold' }}>{article.title}</Text>
    </View>
    </Pressable>
  );
}

export default BadgerNewsItem;