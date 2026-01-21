import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQItem } from '@/lib/types';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger
            className="text-left font-medium"
            data-testid={`faq-trigger-${item.id}`}
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            className="text-muted-foreground"
            data-testid={`faq-content-${item.id}`}
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
