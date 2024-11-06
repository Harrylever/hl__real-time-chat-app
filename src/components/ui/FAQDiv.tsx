import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../../@/components/ui/accordion'

const FAQDiv = () => {
  return (
    <div className="bg-mx-white px-10">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Are group chats available?</AccordionTrigger>
          <AccordionContent>
            Yes. Group chats are an essential feature of MX Chat. You can create
            and join groups to chat with multiple people at once.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Are group chats available?</AccordionTrigger>
          <AccordionContent>
            Yes. Group chats are an essential feature of MX Chat. You can create
            and join groups to chat with multiple people at once.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Are group chats available?</AccordionTrigger>
          <AccordionContent>
            Yes. Group chats are an essential feature of MX Chat. You can create
            and join groups to chat with multiple people at once.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Are group chats available?</AccordionTrigger>
          <AccordionContent>
            Yes. Group chats are an essential feature of MX Chat. You can create
            and join groups to chat with multiple people at once.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Are group chats available?</AccordionTrigger>
          <AccordionContent>
            Yes. Group chats are an essential feature of MX Chat. You can create
            and join groups to chat with multiple people at once.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default FAQDiv
