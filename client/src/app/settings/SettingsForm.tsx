'use client'

import { useContext } from 'react'
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
import { DISMISS_BUTTON } from '@/components/ui/sonner'

import { DataContext } from '@/context/DataContextProvider'
import * as schemas from '@/lib/schemas'

import * as config from './config'

const formSchema = zod.object({
  urls: zod.object({
    whepVideoUrl: schemas.URL,
    webSocketUrl: schemas.URL,
  }),
})

type SettingsFormValues = zod.infer<typeof formSchema>

export function SettingsForm() {
  const { settingsData, setSettingsData } = useContext(DataContext)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: settingsData,
  })

  function onSubmit(settings: SettingsFormValues) {
    console.log(settings)
    setSettingsData(settings)

    toast.success('Settings saved!', {
      cancel: DISMISS_BUTTON,
      duration: 1500,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>

        <Card className='w-full'>

          <CardHeader>
            <CardTitle>Server addresses</CardTitle>
            <CardDescription>Configure the WHEP source and WebSocket address.</CardDescription>
          </CardHeader>

          <CardContent className='grid w-full items-center gap-4'>

            <FormField
              control={form.control}
              name='urls.whepVideoUrl'
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
              name='urls.webSocketUrl'
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
            <Button type='reset' variant='outline' onClick={() => form.reset(settingsData)}>Cancel</Button>
            <Button type='submit'>Save</Button>
          </CardFooter>

        </Card>

      </form>
    </Form>
  )
}