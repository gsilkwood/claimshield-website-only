export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ClaimShield DV",
    description:
      "Professional, data-backed diminished value appraisals to help you prove your claim and recover the compensation you deserve after an accident.",
    url: "https://claimshielddv.com",
    telephone: "+1-850-201-1950",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    priceRange: "$399",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Diminished Value Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diminished Value Appraisal",
            description: "Certified diminished value appraisal report with negotiation support",
          },
          price: "399",
          priceCurrency: "USD",
        },
      ],
    },
    sameAs: [
      "https://www.bbb.org/claimshielddv",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
