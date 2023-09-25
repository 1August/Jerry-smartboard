import 'regenerator-runtime'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { Button } from '@/components/ui/button.tsx'
import { BiMicrophone, BiReset } from 'react-icons/bi'
import { PiStopCircleBold } from 'react-icons/pi'
import { cn } from '@/lib/utils.ts'
import { SpeechLanguages } from '@/components/Footer'
import { BsArrowUp } from 'react-icons/bs'
import axios from 'axios'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { QRCodeGenerator } from '@/components/QRCodeGenerator/QRCodeGenerator.tsx'
import { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Place } from '@/schemas/Chat.ts'

export type DictaphoneProps = {
  speechLanguage: SpeechLanguages
}
export const Dictaphone = (props: DictaphoneProps) => {
  const { speechLanguage } = props
  const [value, setValue] = useState<string | null>(null)

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  const handleSpeechToggle = () => {
    if (!listening) {
      SpeechRecognition.startListening({
        continuous: true,
        language: speechLanguage,
      })
      return
    }
    SpeechRecognition.stopListening()
  }

  const handleSpeechSend = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/chat/editUsersPrompt`
    console.log(transcript)
    axios
      .post(url, {
        prompt: transcript,
      })
      .then(
        (response) => {
          const newPlaces = response.data.places.reduce(
            (acc: string, place: Place) =>
              `${acc};${place.name},${place.geometry.location.lat},${place.geometry.location.lng}`,
            ''
          )

          setValue(newPlaces)
        },
        (reason) => {
          if (axios.isAxiosError(reason)) {
            console.log('Axios error', reason)
            return
          }
          console.log('Error', reason)
        }
      )
  }

  return (
    <div>
      <p className={cn('text-center my-4')}>
        Microphone is {listening ? 'on' : 'off'}
      </p>
      <div className={cn('flex items-center justify-center gap-6')}>
        <Button
          variant={'outline'}
          onClick={resetTranscript}
          className={cn('w-16 h-16 text-white rounded-full')}
        >
          <BiReset />
        </Button>
        <Button
          onClick={handleSpeechToggle}
          className={cn('w-20 h-20 text-white rounded-full bg-green-500')}
        >
          {listening ? (
            <PiStopCircleBold size={64} />
          ) : (
            <BiMicrophone size={64} />
          )}
        </Button>
        <Button
          onClick={handleSpeechSend}
          className={cn('w-16 h-16 text-white rounded-full bg-green-500')}
        >
          <BsArrowUp />
          {/*{isLoading ? 'Loading' : <BsArrowUp />}*/}
        </Button>
      </div>
      <p className={cn('my-6 text-xl')}>{transcript}</p>
      <div>
        <Section>
          <Container>
            <QRCodeGenerator value={value} />
          </Container>
        </Section>
        {value && (
          <Section>
            <Container>
              <h1>
                <a
                  href={
                    'https://www.google.com/maps/place/Nazarbayev+University/@51.092545,71.4024669,15.74z/data=!4m6!3m5!1s0x424585a5651070df:0xa0e423d92f946f00!8m2!3d51.0905303!4d71.3981646!16s%2Fm%2F0gvvk01?entry=ttu'
                  }
                  target={'_blank'}
                  className={cn(
                    'text-white text-xl hover:decoration-white flex items-center justify-center'
                  )}
                >
                  <p className={cn('flex gap-2 items-center')}>
                    Посмотреть на карте <IoIosArrowForward size={16} />
                  </p>
                </a>
              </h1>
            </Container>
          </Section>
        )}
      </div>
    </div>
  )
}
