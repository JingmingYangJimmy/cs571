import React, { useState, useEffect,useRef } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Animated, Image, Pressable, Linking } from 'react-native';
import { Paragraph } from 'react-native-paper';

const ArticleDetailScreen = ({ route })=> {
    const { articleId } = route.params;
    const [article, setArticle] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const opacity = useRef(new Animated.Value(0)).current;
    opacity.addListener(() => {return});
    useEffect(() => {
        fetch(`https://cs571.org/api/f23/hw8/article?id=${articleId}`,{
        headers: {
            "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13"
        }})
          .then((response) => response.json())
          .then((data) => {
            setArticle(data);
            Animated.timing(opacity, {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }).start();
          })
          .catch(() => console.error('can not fetch the article'))
          .finally(() => setLoading(false));
      }, [articleId]);

      if(isLoading==true){
        return (
            <View>
                <Text>Loading article...</Text>
            </View>
        )
      }

      if(!article){
        return (
            <View>
                <Text>No more articles</Text>
            </View>
        )
      }

      const handlePress = () => {
        Linking.openURL(article.url).catch(()=> {
            console.error("can not open");
        });
      };


      return (
        <ScrollView>
            <Animated.View style={{opacity}}>
            <Image
        source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${article.img}` }}
        style={{ width: '100%', height: 200 }} 
      />
                <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      }}>
        {article.title}</Text>
                <Text
                style={{
                    fontSize: 20,
                    marginBottom: 40,
                  }}>By {article.author} on {article.posted}</Text>
                
                {article.body.map((paragraph, index)=>(
                    <Text key={index}>{paragraph}</Text>
                ))}
                <Text></Text>
                <Text></Text>
                <Pressable onPress={handlePress}><Text style={{ color: 'red'}}>Read full article here.</Text></Pressable>
            </Animated.View>
        </ScrollView>
      )


};

export default ArticleDetailScreen;