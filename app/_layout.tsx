import { View } from 'react-native'
import { Slot } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LoaderProvider } from '@/context/LoaderContext'

const RootLayout = () => {

    const insets = useSafeAreaInsets()



  return (

    <LoaderProvider>
        <View
            style= {{ marginTop: insets.top, flex: 1}}
            
        >
            <Slot />
        </View>
    </LoaderProvider>
  )
}

export default RootLayout