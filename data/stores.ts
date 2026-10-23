export interface StoreLocation {
  id: string;
  name: string;
  tag: string;
  area: string;
  address: string;
  image: string;
  images: string[];
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  mapUrl: string;
  embedUrl: string;
  timings: {
    weekdays: string;
    sunday: string;
  };
}

export const STORES: StoreLocation[] = [
  {
    id: "main-deira",
    name: "Wadi Hattat Trading Co LLC",
    tag: "Main Showroom",
    area: "Al Sabkha, Deira",
    address: "9 8th St - Al Sabkha - Deira - Dubai - United Arab Emirates",
    image: "/stores/Wadi Hattat trading co llc.webp",
    images: ["/stores/Wadi Hattat trading co llc.webp"],
    phone: "+971526474325",
    phoneFormatted: "+971 52 647 4325",
    whatsapp: "971526474325",
    mapUrl: "https://maps.app.goo.gl/oMoFhZULKUfr7nsq6",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.267868510842!2d55.3018441!3d25.270258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43002c07bbbb%3A0x5584f8a4634d7432!2sWadi%20Hattat%20trading%20co%20llc!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
    timings: {
      weekdays: "9:00 AM – 2:00 PM & 4:00 PM – 9:00 PM",
      sunday: "Closed",
    },
  },
  {
    id: "branch-4-bur-dubai",
    name: "Wadi Hattat Trading Co LLC - Branch 4",
    tag: "Branch 4",
    area: "Bur Dubai / Al Fahidi",
    address:
      "Shop 9 Al Shawab building Souq al kabeer - Bur Dubai - Al Fahidi - Dubai - United Arab Emirates",
    image: "/stores/Wadi hattat trading co llc - br 4.webp",
    images: ["/stores/Wadi hattat trading co llc - br 4.webp"],
    phone: "+971526474325",
    phoneFormatted: "+971 52 647 4325",
    whatsapp: "971526474325",
    mapUrl: "https://maps.app.goo.gl/6jrEFdb48TJsQNmY6",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.444747379767!2d55.2955605!3d25.26434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43f246655925%3A0xedcd256221d4d8d7!2sWadi%20hattat%20trading%20co%20llc%20-%20br%204!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
    timings: {
      weekdays: "9:00 AM – 2:00 PM & 4:00 PM – 9:00 PM",
      sunday: "Closed",
    },
  },
  {
    id: "al-fahidi",
    name: "Wadi Hattat Trading",
    tag: "Al Fahidi Souq",
    area: "Al Souq Al Kabeer",
    address:
      "777W+XHF - 4 54a St - Al Souq Al Kabeer - Al Fahidi - Dubai - United Arab Emirates",
    image: "/stores/Wadi Hattat Trading.webp",
    images: ["/stores/Wadi Hattat Trading.webp"],
    phone: "+97143536515",
    phoneFormatted: "+971 4 353 6515",
    whatsapp: "971526474325",
    mapUrl: "https://maps.app.goo.gl/iECUtR3SjkeU8dwk6",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.484196160913!2d55.2955416!3d25.2630245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43409df2950b%3A0x2dc0a350518b0aca!2sWadi%20Hattat%20Trading!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
    timings: {
      weekdays: "9:00 AM – 2:00 PM & 4:00 PM – 9:00 PM",
      sunday: "Closed",
    },
  },
  {
    id: "branch-2-deira",
    name: "Wadi Hattat Trading - Branch 2",
    tag: "Branch 2",
    area: "Al Sabkha, Deira",
    address: "13 8th St - Al Sabkha - Deira - Dubai - United Arab Emirates",
    image: "/stores/Wadi Hattat trading - Branch 2.webp",
    images: ["/stores/Wadi Hattat trading - Branch 2.webp"],
    phone: "+97143536515",
    phoneFormatted: "+971 4 353 6515",
    whatsapp: "971526474325",
    mapUrl: "https://maps.app.goo.gl/N29G3AfaW15xrkEe8",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2648834419997!2d55.3021385!3d25.2703577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43000555023f%3A0xf57e36c236caff6e!2sWadi%20Hattat%20trading%20-%20Branch%202!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
    timings: {
      weekdays: "9:00 AM – 2:00 PM & 4:00 PM – 9:00 PM",
      sunday: "Closed",
    },
  },
];
