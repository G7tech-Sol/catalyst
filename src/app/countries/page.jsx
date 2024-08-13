'use client'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { auth, database } from '@/config/firebase'
import { useUser } from '@clerk/nextjs'
import { signInWithCustomToken } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

const DataDisplay = () => {
  const [countries, setCountries] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isLoaded, isSignedIn, user } = useUser()

  useEffect(() => {
    const authenticateFirebase = async () => {
      if (isLoaded && isSignedIn) {
        try {
          const response = await fetch('/api/generateFirebaseToken', {
            method: 'POST',
          })
          const data = await response.json()

          if (data.firebaseToken) {
            await signInWithCustomToken(auth, data.firebaseToken)
            setLoading(false)
          }
        } catch (error) {
          console.error('Firebase authentication failed:', error)
          setLoading(false)
        }
      }
    }

    authenticateFirebase()
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    if (!loading) {
      fetchData()
    }
  }, [loading])

  const fetchData = () => {
    const dbRef = ref(database, 'countries')
    onValue(
      dbRef,
      (snapshot) => {
        const fetchedCountries = snapshot.val()
        setCountries(fetchedCountries)
      },
      {
        onlyOnce: true,
      }
    )
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Countries</Heading>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Country Name</TableHeader>
            <TableHeader>Country Code</TableHeader>
            <TableHeader>Country Population</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries ? (
            Object.keys(countries).map((key) => (
              <TableRow key={key}>
                <TableCell>{countries[key].name}</TableCell>
                <TableCell>{countries[key].code}</TableCell>
                <TableCell>{countries[key].population}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>Loading...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default DataDisplay
