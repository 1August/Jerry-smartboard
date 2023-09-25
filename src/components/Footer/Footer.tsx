import { Container } from '@/components/Container'
import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { BsMouse, BsWifi2 } from 'react-icons/bs'
import { Section } from '@/components/Section'
import { MdSos } from 'react-icons/md'
import { BiUserVoice } from 'react-icons/bi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { Dictaphone } from '@/components/Dictophone/Dictaphone.tsx'
import { useState } from 'react'

export type SpeechLanguages = 'ru' | 'en' | 'tr'
export const Footer = () => {
  // const [speechDialogVisible, setSpeechDialogVisible] = useState(false)

  // const handleSpeechDialogToggle = () => {
  //   setSpeechDialogVisible((prev) => !prev)
  // }
  const [isChangeLanguageOpen, setIsChangeLanguageOpen] = useState(false)
  const [speechLanguage, setSpeechLanguage] = useState<SpeechLanguages>('en')

  const handleSpeechLanguageChange = (language: SpeechLanguages) => {
    setSpeechLanguage(language)
    setIsChangeLanguageOpen(false)
  }

  return (
    <footer className={cn('my-12')}>
      <Section>
        <Container className={cn('flex items-center justify-center')}>
          <div
            className={cn(
              'w-min flex items-center justify-evenly gap-8 border-2 rounded-full p-4'
            )}
          >
            <Button
              className={cn('w-16 h-16 bg-cyan-500 text-white rounded-full')}
            >
              <BsMouse />
            </Button>
            <Button
              className={cn('w-16 h-16 bg-red-500 text-white rounded-full')}
            >
              <MdSos />
            </Button>
            <Separator orientation={'vertical'} className={cn('h-8')} />
            <Dialog>
              <DialogTrigger asChild={true}>
                <Button
                  variant={'outline'}
                  className={cn('w-16 h-16 text-white rounded-full')}
                >
                  <BiUserVoice />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Tell me about your plans for today?</DialogHeader>
                <DialogDescription>
                  <Dictaphone speechLanguage={speechLanguage} />
                </DialogDescription>
              </DialogContent>
            </Dialog>
            <Separator orientation={'vertical'} className={cn('h-8')} />
            <Button
              variant={'outline'}
              className={cn('w-16 h-16 text-white rounded-full')}
            >
              <div className={cn('grid place-items-center gap-1')}>
                <BsWifi2 size={24} /> Wifi
              </div>
            </Button>
            <Dialog open={isChangeLanguageOpen}>
              <DialogTrigger asChild={true}>
                <Button
                  onClick={() => setIsChangeLanguageOpen(true)}
                  variant={'outline'}
                  className={cn('w-16 h-16' + ' text-white rounded-full')}
                >
                  {speechLanguage}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Choose your language</DialogHeader>
                <DialogDescription className={cn('grid gap-3')}>
                  <Button
                    variant={'outline'}
                    onClick={() => handleSpeechLanguageChange('ru')}
                  >
                    Russian
                  </Button>
                  <Button
                    variant={'outline'}
                    onClick={() => handleSpeechLanguageChange('en')}
                  >
                    English
                  </Button>
                  <Button
                    variant={'outline'}
                    onClick={() => handleSpeechLanguageChange('tr')}
                  >
                    Turkish
                  </Button>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </Container>
      </Section>
    </footer>
  )
}
