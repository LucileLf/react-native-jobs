import React from 'react'
import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hooks/useFetch'

const Popularjobs = () => {
  const router = useRouter()
  const { data, isLoading, error } = useFetch
  ('search', {
    query: 'React developer',
    num_pages: 1
  })

  //console.log(data);

  const [ selectedJob, setSelectedJob ] = useState()

  const handleCardPress = (item) => {
    router.push(`/details/${item.job_id}`);
    setSelectedJob(item.job_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show all</Text>
        </Pressable>
      </View>
      <View style={styles.cardsContainer}>
    {isLoading ? (
      <ActivityIndicator size="large" colors={COLORS.primary}/>
    ) : error ? (
      <Text> Something went wrong</Text>
    ) : <FlatList
      //data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      data={data}
      renderItem={({item}) => (
        <PopularJobCard
          item={item}
          selectedJob={selectedJob}
          handleCardPress={handleCardPress}
        />
      )}
      keyExtractor={item => item?.job_id}
      contentContainerStyle={{ columnGap: SIZES.medium}}
      horizontal
    />}
      </View>
    </View>
  )
}

export default Popularjobs
