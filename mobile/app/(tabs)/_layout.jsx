import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function TabLayout() {
    const {isSignedIn, isLoaded} = useAuth();
    if(!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />
    }
    if(!isLoaded) {
        return null;
    }
  return (
    <Tabs screenOptions={{headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.border,
        borderTopWidth:1,
        height:80,
        paddingBottom:8,
        paddingTop:8,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
      },
      
    }}> 
      <Tabs.Screen name="index" options={{title: "Recipes",tabBarIcon:({color,size})=><Ionicons name="restaurant" size={size} color={color} />}} />
      <Tabs.Screen name="search" options={{title: "Search",tabBarIcon:({color,size})=><Ionicons name="search" size={size} color={color} />}} />
      <Tabs.Screen name="favorites" options={{title: "Favorites",tabBarIcon:({color,size})=><Ionicons name="heart" size={size} color={color} />}} />
    </Tabs>
  );
}