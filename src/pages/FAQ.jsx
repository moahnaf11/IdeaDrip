import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I get started with business idea exploration?",
      answer:
        "Begin by browsing our Explore Ideas section, which showcases trending business opportunities. You can also use our Keyword Search to find specific industry ideas or check out AI Insights for personalized recommendations.",
    },
    {
      question: "Can I save interesting business ideas for later?",
      answer:
        "Yes! Click the bookmark icon on any business idea to save it to your Saved Ideas section. You can access all your saved ideas anytime from the main menu.",
    },
    {
      question: "How does the market analysis tool work?",
      answer:
        "Our Market Data tool analyzes current market trends, competition, and demand for specific business ideas. It provides key metrics and insights to help you evaluate the viability of your business concept.",
    },
    {
      question: "What's included in the competitor research?",
      answer:
        "The Competitor Research tool provides detailed analysis of existing businesses in your chosen market, including their strengths, weaknesses, market share, and strategies. This helps you identify opportunities and potential challenges.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium">{faq.question}</span>
                <FiChevronDown
                  className={`transform transition-transform duration-200 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-200 ease-in-out ${
                  openFaq === index
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="p-4 text-gray-600 border-t">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
