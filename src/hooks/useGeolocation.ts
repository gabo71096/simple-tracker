import { useCallback, useState } from 'react'

interface GeolocationState {
  latitude: number | undefined
  longitude: number | undefined
  error: string | null
  loading: boolean
}

export function useGeolocation(enabled: boolean) {
  const [state, setState] = useState<GeolocationState>({
    latitude: undefined,
    longitude: undefined,
    error: null,
    loading: false,
  })

  const capture = useCallback((): Promise<{ latitude?: number; longitude?: number }> => {
    return new Promise((resolve) => {
      if (!enabled) {
        resolve({})
        return
      }

      if (!navigator.geolocation) {
        setState((prev) => ({ ...prev, error: 'Geolocation is not supported by this browser.' }))
        resolve({})
        return
      }

      setState((prev) => ({ ...prev, loading: true, error: null }))

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setState({ latitude, longitude, error: null, loading: false })
          resolve({ latitude, longitude })
        },
        (err) => {
          let message = 'Unable to retrieve location.'
          switch (err.code) {
            case err.PERMISSION_DENIED:
              message = 'Location permission denied.'
              break
            case err.POSITION_UNAVAILABLE:
              message = 'Location information unavailable.'
              break
            case err.TIMEOUT:
              message = 'Location request timed out.'
              break
          }
          setState((prev) => ({ ...prev, error: message, loading: false }))
          resolve({})
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
      )
    })
  }, [enabled])

  return { ...state, capture }
}
