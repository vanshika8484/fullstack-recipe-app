import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-expo'
import {favoritesStyles} from "../../assets/styles/favorites.styles"
import LoadingSpinner from '../../components/LoadingSpinner'
import NoFavoritesFound from '../../components/NoFavoritesFound'
import { API_URL } from "../../constants/api";

const Favorites = () => {
  const {signOut} = useClerk();
  const {user}=useUser();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadFavorites = async () => {
     try{
      const response = await fetch(`${API_URL}/favorites/${user.id}`);
      if(!response.ok){
        throw new Error('Failed to fetch favorites');
      }
      const favorites = await response.json();
      //transform the data to match the recipeCard component's expected format
      const transformedFavorites=favorites.map(favorite=>({
        ...favorite,
        id:favorite.recipeId
      }))
      setFavoriteRecipes(transformedFavorites);
     }catch(error){
      console.log(error);
     }
     finally{
      setLoading(false);
     }
    };
    loadFavorites();
  }, [user.id]);

  const handleSignOut = () => {
  
  };
  if(loading){
    return <LoadingSpinner message="Loading your favorites..." />
  }
  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Favorites</Text>
         
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favoriteRecipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>
    </View>
  )
}


export default Favorites