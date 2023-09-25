import { Section } from '@/components/Section'
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx'
import { Container } from '@/components/Container'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card.tsx'
import { cn } from '@/lib/utils.ts'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ChevronsRight, ChevronsUpDown } from 'lucide-react'
import yandexTaxi from '@/assets/yandex_ad.png'
import { GoogleMap } from '@/components/GoogleMap'
import { Advert } from '@/components/Advert/Advert.tsx'

const TEN_MINUTES = 10 * 60 * 1000
export const Home = () => {
  const [additionServicesVisible, setAdditionServicesVisible] = useState(false)

  const [isAdVisible, setIsAdVisible] = useState(true)
  const [timeoutId, seTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const listener = () => {
      setIsAdVisible(false)
      const id = setTimeout(() => {
        setIsAdVisible(true)
      }, TEN_MINUTES)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      seTimeoutId(id)
    }

    window.addEventListener('click', listener)

    return () => {
      window.removeEventListener('click', listener)
    }
  }, [timeoutId])

  if (isAdVisible) {
    return (
      <div className={cn('bg-black fixed z-10 inset-0 w-[100vw] h-[100vh]')}>
        <Advert />
      </div>
    )
  }
  return (
    <main>
      {/*<Section>*/}
      {/*  <Container>Camera detection</Container>*/}
      {/*</Section>*/}
      <Section>
        <Container>
          <Card className={cn('overflow-hidden')}>
            <AspectRatio ratio={18 / 9}>
              <CardContent className={cn('p-0 w-full h-full')}>
                <img
                  className={cn('w-full h-full object-cover object-center')}
                  src={yandexTaxi}
                  alt={'Yandex taxi ad'}
                />
              </CardContent>
            </AspectRatio>
          </Card>
        </Container>
      </Section>
      <Section>
        <Container>
          <Card className={cn('overflow-hidden')}>
            <AspectRatio ratio={18 / 9}>
              <GoogleMap />
            </AspectRatio>
          </Card>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className={cn('grid grid-cols-2 gap-6')}>
            <Card className={cn('grid place-items-center p-6 bg-rose-800')}>
              <AspectRatio ratio={9 / 16}>
                <CardContent>
                  <CardTitle className={cn('mb-4')}>Some title here</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                    consequatur delectus distinctio eaque eum, facere, inventore
                    laudantium nemo nostrum odit optio pariatur perspiciatis
                    provident quis repellat reprehenderit saepe sunt, temporibus
                    voluptates voluptati facilis illo ipsa ipsum iusto
                    laboriosam, laudantium libero natus nemo odit possimus, qui
                    repellat sapiente totam unde! Ad aliquam at atque deleniti
                    est eum expedita reiciendis velit veritatis vitae! Alias
                    aperiam at libero quisquam rem repellendus vero!
                  </CardDescription>
                </CardContent>
              </AspectRatio>
            </Card>
            <div className={cn('grid grid-rows-2 gap-6')}>
              <Card className={cn('grid place-items-center p-6 bg-cyan-800')}>
                <AspectRatio ratio={16 / 9}>
                  <CardContent>
                    <CardTitle className={cn('mb-4')}>
                      Some title here
                    </CardTitle>
                    <CardDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      A consequatur delectus distinctio eaque eum, facere,
                      inventore laudantium nemo nostrum odit optio pariatur
                      perspiciatis provident.
                    </CardDescription>
                  </CardContent>
                </AspectRatio>
              </Card>
              <Card className={cn('grid place-items-center p-6 bg-orange-800')}>
                <AspectRatio ratio={16 / 9}>
                  <CardContent>
                    <CardTitle className={cn('mb-4')}>
                      Some title here
                    </CardTitle>
                    <CardDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      A consequatur delectus distinctio eaque eum, facere,
                      inventore laudantium nemo nostrum odit optio pariatur
                      perspiciatis provident.
                    </CardDescription>
                  </CardContent>
                </AspectRatio>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Collapsible
            open={additionServicesVisible}
            onOpenChange={setAdditionServicesVisible}
          >
            <div className='flex items-center justify-between space-x-4 px-4'>
              <h4 className='text-sm font-semibold'>Find new places</h4>
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='sm' className='w-9 p-0'>
                  <ChevronsUpDown className='h-4 w-4' />
                  <span className='sr-only'>Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent
              className={cn('space-y-2 grid gap-3 item-cn lg:grid-cols-2')}
            >
              <Button
                variant={'ghost'}
                className='rounded-md border px-4 py-6 fo nt-mono text-sm flex justify-between gap-3'
              >
                <h4>Food and drinks</h4>
                <ChevronsRight />
              </Button>
              <Button
                variant={'ghost'}
                className='rounded-md border px-4 py-6 font-mono text-sm flex justify-between gap-3'
              >
                <h4>Shopping</h4>
                <ChevronsRight />
              </Button>
              <Button
                variant={'ghost'}
                className='rounded-md border px-4 py-6 font-mono text-sm flex justify-between gap-3'
              >
                <h4>Hotels</h4>
                <ChevronsRight />
              </Button>
              <Button
                variant={'ghost'}
                className='rounded-md border px-4 py-6 font-mono text-sm flex justify-between gap-3'
              >
                <h4>Hostels</h4>
                <ChevronsRight />
              </Button>
              <Button
                variant={'ghost'}
                className='rounded-md border px-4 py-36font-mono text-sm flex justify-between gap-3'
              >
                <h4>Architecture</h4>
                <ChevronsRight />
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </Container>
      </Section>
      ;
    </main>
  )
}
