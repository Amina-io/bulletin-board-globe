export const locations = [
    {
      id: 1,
      name: "Tokyo University Library",
      country: "Japan",
      coordinates: { lat: 35.7128, lng: 139.7621 },
      context: "University Library",
      bulletinBoard: {
        items: [
          {
            id: 1,
            type: "notice",
            title: "Study Group - Advanced Mathematics",
            content: "Weekly study sessions every Thursday 6PM. Room 302. All welcome!",
            style: { rotation: -2, color: "#FFE4B5" }
          },
          {
            id: 2,
            type: "flyer",
            title: "Cherry Blossom Festival",
            content: "Join us for hanami viewing! April 15th, Ueno Park. Traditional food & music.",
            style: { rotation: 3, color: "#FFB6C1" }
          },
          {
            id: 3,
            type: "personal",
            title: "Lost: Black Notebook",
            content: "Physics notes inside. If found, please contact Yuki at yuki@email.com",
            style: { rotation: -1, color: "#F0F8FF" }
          }
        ]
      }
    },
    {
      id: 2,
      name: "Greenwich Village Café",
      country: "USA",
      coordinates: { lat: 40.7331, lng: -74.0014 },
      context: "Local Café",
      bulletinBoard: {
        items: [
          {
            id: 1,
            type: "service",
            title: "Guitar Lessons Available",
            content: "Experienced musician offering lessons. $30/hour. Call Mike: 555-0123",
            style: { rotation: 2, color: "#FFEFD5" }
          },
          {
            id: 2,
            type: "roommate",
            title: "Roommate Wanted",
            content: "2BR apartment in Brooklyn. $800/month. Pet-friendly. Contact Sarah.",
            style: { rotation: -3, color: "#E6E6FA" }
          },
          {
            id: 3,
            type: "event",
            title: "Open Mic Night",
            content: "Every Friday 8PM. Sign up at counter. Coffee & good vibes guaranteed!",
            style: { rotation: 1, color: "#F5FFFA" }
          }
        ]
      }
    },
    {
      id: 3,
      name: "Cambridge University Porter's Lodge",
      country: "UK",
      coordinates: { lat: 52.2043, lng: 0.1218 },
      context: "University College",
      bulletinBoard: {
        items: [
          {
            id: 1,
            type: "formal",
            title: "Formal Hall Notice",
            content: "Black tie dinner this Saturday. Wine pairings by the Cellar Master. Book by Wed.",
            style: { rotation: -1, color: "#F8F8FF" }
          },
          {
            id: 2,
            type: "sport",
            title: "Boat Club Tryouts",
            content: "Novice rowers welcome! Meet at the boathouse, 6AM sharp. No experience needed.",
            style: { rotation: 2, color: "#F0FFFF" }
          },
          {
            id: 3,
            type: "academic",
            title: "Philosophy Society Debate",
            content: "'Is free will an illusion?' Tuesday 7PM, Old Library. Tea & biscuits provided.",
            style: { rotation: -2, color: "#FFF8DC" }
          }
        ]
      }
    },
    {
      id: 4,
      name: "Montmartre Community Center",
      country: "France",
      coordinates: { lat: 48.8867, lng: 2.3431 },
      context: "Community Center",
      bulletinBoard: {
        items: [
          {
            id: 1,
            type: "art",
            title: "Exposition d'Art Local",
            content: "Local artists showcase. Opening night: wine & cheese. Vernissage vendredi 19h.",
            style: { rotation: 3, color: "#FFFACD" }
          },
          {
            id: 2,
            type: "language",
            title: "English-French Exchange",
            content: "Language practice partners wanted. Tuesdays 6PM. Beginners welcome!",
            style: { rotation: -1, color: "#F5F5DC" }
          },
          {
            id: 3,
            type: "lost",
            title: "Chat Perdu - Lost Cat",
            content: "Gris et blanc, répond au nom de Cléo. Récompense. Tel: 06.12.34.56.78",
            style: { rotation: 1, color: "#FFE4E1" }
          }
        ]
      }
    },
    {
      id: 5,
      name: "Melbourne University Student Union",
      country: "Australia",
      coordinates: { lat: -37.7964, lng: 144.9612 },
      context: "Student Union Building",
      bulletinBoard: {
        items: [
          {
            id: 1,
            type: "travel",
            title: "Road Trip to Byron Bay",
            content: "Looking for travel buddies! Leaving Friday, back Sunday. Split fuel costs.",
            style: { rotation: -2, color: "#F0F8FF" }
          },
          {
            id: 2,
            type: "textbook",
            title: "Psychology Textbooks for Sale",
            content: "PSYC1001 & PSYC2001 books. Good condition. $50 each or $80 for both.",
            style: { rotation: 2, color: "#FFFAF0" }
          },
          {
            id: 3,
            type: "band",
            title: "Drummer Needed",
            content: "Indie rock band seeks drummer. We have studio space. Gigs lined up!",
            style: { rotation: -1, color: "#F5FFFA" }
          }
        ]
      }
    }
  ];