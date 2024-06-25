import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface ArtistNoteProps {
  title: string;
  content: string;
}

const ArtistNote: React.FC<ArtistNoteProps> = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <View style={styles.noteCard}>
        <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
          <Image source={require('../../assets/images2/artist.png')} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.content}>
          {content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2327',
    padding: 0,
    marginTop: 49,
    marginBottom: 25,
  },
  noteCard: {
    backgroundColor: '#C95B65',
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 33,
    paddingBottom: 26,
    borderRadius: 20,
  },
  title: {
    fontFamily: "KaiseiRegular",
    color: '#000000',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 25,
  },
  content: {
    fontFamily: "Caslon",
    color: '#000000',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
  },
  image: {
    width: 20,
    height: 20,
    marginTop: -15,
    marginRight: 7,
  },
});

export default ArtistNote;
