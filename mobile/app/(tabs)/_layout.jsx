import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function TabLayout() {
    const {isSignedIn} = useAuth();
    if(!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />
    }
  return (
    <Stack />   
  );
}