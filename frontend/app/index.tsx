import React from 'react'
import { Redirect } from 'expo-router'
import { useSession } from '@/context/SessionProvider'
import { Index as IndexScreen } from '@/screens/Index'

const Index = () => {
  const { hasMainCurrency, session, isInitialized } = useSession();

  if (session && hasMainCurrency) return <Redirect href="/(tabs)/home" />;
  if (session && !hasMainCurrency) return <Redirect href="/onboarding" />;

  return (
    <IndexScreen isPending={!isInitialized} />
  )
}

export default Index;