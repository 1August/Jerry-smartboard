import styles from './Header.module.css'
import { cn } from '@/lib/utils.ts'
import { Container } from '@/components/Container'
import { useEffect, useState } from 'react'
import { monthNames, weekDays } from '@/data/date.ts'
import OpenWeatherMap from 'openweathermap-ts'
import { Location } from '@/types'
import { CurrentResponse } from 'openweathermap-ts/dist/types'
import { toast } from '@/components/ui/use-toast.ts'
import { Button } from '@/components/ui/button.tsx'
import { BsSun } from 'react-icons/bs'
import { WiDaySunnyOvercast } from 'react-icons/wi'
import { IoIosArrowDown } from 'react-icons/io'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { Section } from '@/components/Section'
import { useLocalStorage } from '@/hooks/useLocalStorage.ts'

export const Header = () => {
  const date = new Date()
  const dateData = {
    hour: date.getHours(),
    minutes: date.getMinutes(),
    day: date.getDate(),
    weekDay: weekDays[date.getDay()],
    month: monthNames[date.getMonth()],
  }
  const [location, setLocation] = useState<Location | null>(null)
  const [weather, setWeather] = useState<CurrentResponse | null>(null)
  const weatherTemperature = Number(weather?.main.temp).toFixed(0) + ' ℃'

  const [, setLocationStorage] = useLocalStorage('location', {
    lng: 51.088749,
    lat: 71.419069,
  })

  const openWeather = new OpenWeatherMap({
    apiKey: import.meta.env.VITE_WEATHER_API_KEY,
  })

  useEffect(() => {
    const onSuccess = (position: GeolocationPosition) => {
      setLocation({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      })
      setLocationStorage({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      })
    }

    const onError = (positionError: GeolocationPositionError) => {
      toast({
        title: `Error ${positionError.code}`,
        content: `${positionError.message}`,
      })
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  useEffect(() => {
    if (location) {
      if (weather) {
        openWeather.setUnits('metric')
        openWeather
          .getCurrentWeatherByGeoCoordinates(location.lat, location.lng)
          .then(
            (value) => {
              setWeather(value)
            },
            (error) => {
              console.log('Some error with weather', error.message)
            }
          )
      }
    }
  }, [location])

  return (
    <header className={cn(styles.homePage, 'py-6')}>
      <Section>
        <Container className={'flex items-center justify-between'}>
          <div className={cn('flex gap-4 items-center')}>
            <h3>
              {dateData.hour}:{dateData.minutes}, {dateData.weekDay},{' '}
              {dateData.day} {dateData.month}
            </h3>
          </div>
          <div>
            {weather ? (
              <Dialog>
                <DialogTrigger asChild={true}>
                  <Button
                    className={cn('flex gap-2 items-center justify-center')}
                  >
                    <WiDaySunnyOvercast /> {weatherTemperature}{' '}
                    <IoIosArrowDown size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Some weather content</DialogHeader>
                  <DialogDescription>Some desc</DialogDescription>
                </DialogContent>
              </Dialog>
            ) : (
              <Button>
                <BsSun size={32} /> 15 ℃
              </Button>
            )}
          </div>
        </Container>
      </Section>
    </header>
  )
}
