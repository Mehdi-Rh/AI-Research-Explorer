# AI Research Explorer - By Mehdi Rahal

## Live Demo

https://ai-research-explorer-psi.vercel.app/

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (see .env.example)
4. Start development server: `npm run dev`

## API Configuration

- Create an account at [chosen AI provider](https://cohere.com/)
- Add API key to .env file
 
## Features Implemented

- [x] Mock research paper search with filters
- [x] AI-powered paper analysis and chat
- [x] Results visualization and browsing
- [x] Interactive chat interface for research questions
- [x] Additional bonus features (data visualizations, etc.)

## Mock Data

- **Dataset Size**: [84] research papers across [X] topics
- **Data Generation**: Data generated using githib copilot
- **Topics Covered**: Machine Learning / AI / Blockchain / Energy / Climate / Drug

## Technical Decisions

- **State Management**: [Context API usage and reasoning]
- **UI Library**: [Material-UI implementation and customization]
- **AI API**: [Cohere/Groq/HuggingFace choice and integration approach]
- **Custom Hooks**: [List main hooks created and their purposes]
- **Component Architecture**: [How you organized components and why]
- **Mock Data Strategy**: [How you created realistic research data]
- **TypeScript Usage**: [How you leveraged TypeScript for type safety]
- **Performance Optimization**: [Any optimizations implemented]

## Time Breakdown

- Setup & Planning: 2 hours
- UI Development: 6 hours
- API Integration: 2 hours
- Testing & Polish: 4 hours
- **Total**: 14 hours

## Challenges & Solutions

The main challenge was how to design the app, I thought about making everything on the same page, but could not find an optimal solution, so for each feature, I used the Copilot to generate a draft and then make  the necessary optimizations

## Future Improvements

Here are the main features that can be added to the app:
- Authentication
- Add the backend stuff (database, API integrations, etc)
- Set a thread history instead (right now, each combination of selected papers is stored and the user should continue on it)
- Add a feature to allow the user to take notes, save results, etc.
- Add copy/paste functionalities for generated responses. 
