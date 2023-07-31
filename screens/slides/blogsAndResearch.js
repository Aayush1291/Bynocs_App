import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, Linking, Dimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';

const BlogsAndResearch = ({ language, onLanguageChange, navigation }) => {
const { height, width } = Dimensions.get('window');

  const [apiData, setApiData] = useState([]);
  const [showLongDesc, setShowLongDesc] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await fetch('https://www.myjsons.com/v/76cf1318')
      .then((data) => data.json())
      .then((response) => {
        setApiData(response.items);
      });
  };

  const toggleDescription = () => {
    setShowLongDesc(!showLongDesc);
  };

  const saveLanguage = (lang) => {
    onLanguageChange(lang);
  };

  return (
    <View>
      {apiData.map((item, index) => (
        <View key={index}>
          <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(74), position: 'absolute', top: responsiveHeight(3), width: width, zIndex: 1 }}>
              <TouchableOpacity onPress={() => saveLanguage('english')}>
                <Text style={{ color: language === 'english' ? '#175ca4' : 'black', marginRight: responsiveWidth(0.6), fontSize: responsiveFontSize(3), fontFamily: 'Poppins-Regular' }}>EN</Text>
              </TouchableOpacity>
              <Text style={{ color: 'black', marginRight: responsiveWidth(0.6), fontSize: responsiveFontSize(3), fontFamily: 'Poppins-Regular' }}> | </Text>
              <TouchableOpacity onPress={() => saveLanguage('french')}>
                <Text style={{ color: language === 'french' ? '#175ca4' : 'black', fontSize: responsiveFontSize(3), fontFamily: 'Poppins-Regular' }}>FR</Text>
              </TouchableOpacity>
            </View>
          <Image
            source={{ uri: item.en.blogsAndResearch.backimage }}
            style={{ width: '100%', height: 812 }}
          />

          <View
            style={styles.Blogs_View}
          >
            {language === 'french' ? (
              <Text style={styles.Blogs_fr_title}>{item.fr.blogsAndResearch.title}</Text>
            ) : (
              <Text style={styles.Blogs_en_title}>{item.en.blogsAndResearch.title}</Text>
            )}
            {language === 'french' ? (
              <Text style={styles.Blogs_fr_Content_title}>{item.fr.blogsAndResearch.contentTitle}</Text>
            ) : (
              <Text style={styles.Blogs_en_Content_title}>{item.en.blogsAndResearch.contentTitle}</Text>
            )}
            {!showLongDesc ? (
              language === 'english' ? (
                <Text
                  style={styles.Blogs_en_desc}
                >
                  {item.en.blogsAndResearch.shortdesc}
                </Text>
              ) : (
                <Text
                  style={styles.Blogs_fr_desc}
                >
                  {item.fr.blogsAndResearch.shortdesc}
                </Text>
              )

            ) : (
              language === 'english' ? (
                <View style={{ flex: 1 }}>
                  <ScrollView>
                    <Text
                      style={styles.Blogs_en_desc}
                    >
                      {item.en.blogsAndResearch.longdesc}
                    </Text>
                    <Text style={styles.Blogs_Pdf} onPress={() => { Linking.openURL(item.en.blogsAndResearch.pdf) }}>View Document</Text>
                  </ScrollView>
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  <ScrollView>
                    <Text
                      style={styles.Blogs_fr_desc}
                    >
                      {item.fr.blogsAndResearch.longdesc}
                    </Text>
                    <Text style={styles.Blogs_Pdf} onPress={() => { Linking.openURL(item.fr.blogsAndResearch.pdf) }}>View Document</Text>
                  </ScrollView>
                </View>
              )

            )}
            <View style={{ alignItems: 'center' }}>
              <MaterialIcons
                name={showLongDesc ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={34}
                onPress={toggleDescription}
              />
            </View>
          </View>
        </View>
      ))}
      <TouchableOpacity
              onPress={() => { navigation.navigate('Login') }}
              activeOpacity={1}
              style={styles.Login_Button}
            >
              <Text
                style={styles.Login_Button_Text}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Enquiry')}
              style={styles.Enquiry_Button}
            >
              <Text
                style={styles.Enquiry_Button_Text}
              >
                ENQUIRY
              </Text>
            </TouchableOpacity>
    </View>
  );
};

export default BlogsAndResearch;
