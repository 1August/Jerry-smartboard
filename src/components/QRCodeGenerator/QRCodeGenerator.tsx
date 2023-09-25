import { cn } from '@/lib/utils.ts'
import QRCode from 'react-qr-code'

export const QRCodeGenerator = ({ value }: { value: string | null }) => {
  // const value = JSON.stringify([
  //   {
  //     geometry: {
  //       location: {
  //         lat: 51.1386998,
  //         lng: 71.4654406,
  //       },
  //     },
  //     name: 'Семейное кафе',
  //   },
  //   {
  //     geometry: {
  //       location: {
  //         lat: 51.16052269999999,
  //         lng: 71.4703558,
  //       },
  //     },
  //     name: 'Buiratau National Park',
  //   },
  // ])
  if (!value) return null
  return (
    <div
      className={cn(
        'h-auto my-0 mx-auto max-w-128 w-full grid place-items-center mt-6'
      )}
    >
      <QRCode
        size={350}
        value={value}
        viewBox={`0 0 256 256`}
        className={cn('border-2 p-4 rounded-2xl')}
      />
    </div>
  )
}
