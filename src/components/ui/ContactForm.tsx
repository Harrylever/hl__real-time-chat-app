import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Input, TextArea } from './Input'
import { useContactForm } from 'src/app/api/hooks/useContactForm'
import clsx from 'clsx'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Required',
  }),
  email: z.string().email({ message: 'Requred' }),
  message: z.string().min(1, { message: 'Required' }).max(200, {
    message: 'Invalid message',
  }),
})

const ContactForm = () => {
  const { mutateAsync: sendForm, isPending } = useContactForm()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = {
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      }

      const response = await sendForm(data)
      if (response.data.success) {
        toast({
          variant: 'success',
          title: 'Message sent successfully',
          description: 'We will get back to you shortly',
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Message was not sent',
        description: 'Please try again later',
      })
    }
  }

  return (
    <div className="w-full mt-14 lg:mt-0 lg:w-1/2 px-7 sm:px-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-6"
      >
        <p className="text-center text-xs text-mx-grey">
          Feel free to find us virtually around the globe, we&lsquo;re always
          <br /> available to connect.
        </p>

        <div className="w-full">
          <Input
            required
            label="name"
            labelText="Name"
            register={register}
            placeholder="john doe"
            error={errors.name}
          />
        </div>

        <div className="w-full">
          <Input
            required
            label="email"
            labelText="Email"
            register={register}
            placeholder="johndoe@gmail.com"
            error={errors.email}
          />
        </div>

        <div className="relative w-full h-[100px]">
          <TextArea
            required
            label="message"
            labelText="Message"
            placeholder="Your message..."
            register={register}
            error={errors.message}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={clsx([
            'w-full py-4 text-white rounded-md',
            {
              'bg-mx-primary-3': !isPending,
              'bg-mx-primary-6 opacity-50': isPending,
            },
          ])}
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactForm
