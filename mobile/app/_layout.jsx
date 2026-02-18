// import { Slot, Stack } from "expo-router";
// import { ClerkProvider } from '@clerk/clerk-expo'
// import { tokenCache } from '@clerk/clerk-expo/token-cache'
// import { COLORS} from '../constants/colors'
// import SafeScreen from '../components/SafeScreen'
// export default function RootLayout() {
//   return (
//      <ClerkProvider tokenCache={tokenCache}>
//      <SafeScreen>
//         <Slot />
//      </SafeScreen>
//      </ClerkProvider>
//   )
// }
import { Slot, Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { COLORS} from '../constants/colors'
import SafeScreen from '../components/SafeScreen'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout() {
  if (!publishableKey) {
    throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY')
  }

  return (
     <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
     <SafeScreen>
        <Slot />
     </SafeScreen>
     </ClerkProvider>
  )
}