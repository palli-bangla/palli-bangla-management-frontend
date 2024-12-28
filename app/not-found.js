import Link from 'next/link'
import notfoundbanner from '../assets/not found page.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
 
export default function NotFound() {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <Image src={notfoundbanner} width={780} height={600} alt='not found banner'/>
      <Link href="/">
      <Button>
      Return Home
      </Button></Link>
    </div>
  )
}