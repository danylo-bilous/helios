import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import UserProfile from "./components/UserProfile"
import ArtistNote from "./components/ArtistNote"
import Interviews from "./components/Interviews"
import MusicCard from "./components/MusicCard"
import Footer from "./components/Footer"
import { getSignedUrl } from '@/s3-utils';

export default function HomeScreen() {
  const interviewList = [
    {
      id: '1',
      title: 'Raising a Child',
      author: 'Gitanjali J Agneno',
      imageUrl: 'interview1.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nisl sodales, dapibus velit id, convallis risus.'
    },
    {
      id: '2',
      title: 'Living Simply',
      author: 'Swann Washuk',
      imageUrl: 'interview2.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nisl sodales, dapibus velit id, convallis risus.'
    },
    {
      id: '3',
      title: 'Heart and the Market',
      author: 'Jay Pushankar',
      imageUrl: 'interview3.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nisl sodales, dapibus velit id, convallis risus.'
    },
  ];

  useEffect(() => {
    const fetchImageUrls = async () => {
      const interviewImageUrlList: object[] = [];

      for (const item of interviewList) {
        const imageUrl = await getSignedUrl('heliosassets', item.imageUrl);
        interviewImageUrlList.push({ id: item.id, title: item.title, author: item.author, imageUrl: imageUrl, description: item.description });
      }

      setInterviewsData(interviewImageUrlList);
    };

    fetchImageUrls();
  }, []);
  const [interviewsData, setInterviewsData] = useState<object[]>([]);

  return (
    <ScrollView style={styles.container}>
      <UserProfile
        header={'DIRECTOR | ACTOR'}
        author={'Aryan Bhattacharjee'}
        contentImage={'profile.png'}
        followIcon={'plus.png'}
        patronIcon={'crown.png'}
      />
      <ArtistNote
        title={'Artist’s Note'}
        content={'I will answer one question - what is the essence of this publication; in other words, the question of what this publication will grow to become.'}
      />
      <Interviews interviewsData={interviewsData} />
      <MusicCard
        header={'Music'}
        title={'Transcendence'}
        type={'EXTENDED PLAY'}
        headerIcon={'piano.png'}
        contentIcon={'music.png'}
      />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2327'
  },
});