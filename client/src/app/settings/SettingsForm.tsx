'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as schemas from '@/lib/schemas'
// import { newRequest } from '@/mocks/mock-responses'

import * as config from './config'

const formSchema = zod.object(
  {
    whepVideoUrl: schemas.URL,
    webSocketUrl: schemas.URL,
  }
)

type StandardFormValues = zod.infer<typeof formSchema>

const defaultValues: Partial<StandardFormValues> = {
  whepVideoUrl: '',
  webSocketUrl: '',
}

export function SettingsForm() {
  const form = useForm<StandardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(values: StandardFormValues) {
    console.log(values)

    // toast.promise(promise, {
    //   loading: 'Creating file upload request...',
    //   success: () => {
    //     form.reset()
    //     return 'File upload request created!'
    //   },
    //   cancel: {
    //     label: 'Close',
    //     onClick: () => null,
    //   },
    //   error: 'Error',
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>

        <Card className='w-full'>

          <CardHeader>
            <CardTitle>Server addresses</CardTitle>
            <CardDescription>Configure the WHEP source and WebSocket.</CardDescription>
          </CardHeader>

          <CardContent className='grid w-full items-center gap-4'>

            <FormField
              control={form.control}
              name='whepVideoUrl'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-1.5'>
                  <FormLabel>WebRTC video source</FormLabel>
                  <FormControl>
                    <Input type='url' placeholder={config.PLACEHOLDERS.WHEP_VIDEO_URL} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='webSocketUrl'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-1.5'>
                  <FormLabel>WebSocket server</FormLabel>
                  <FormControl>
                    <Input type='url' placeholder={config.PLACEHOLDERS.WEB_SOCKET_URL} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </CardContent>

          <CardFooter className='flex justify-between'>
            <Button type='reset' variant='outline' onClick={() => form.reset()}>Cancel</Button>
            <Button type='submit'>Save</Button>
          </CardFooter>

        </Card>

      </form>
    </Form>
  )
}