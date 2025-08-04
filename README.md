# Common Words

Common Words is a spaced repetition language learning web app. Users can create multimedia flashcards and place them in themed decks they create themselves. The goal is to speed up the process of populating flashcard decks for self guided language learners.

## Prerequisites
- Node.js 22.x or higher
- Java 21.0.7
- Windows, macOS, or Linux operating system

Made with React Vite and Spring Boot's Jackson library, using hibernate. Database testing with MySQL desktop.

## Installation
1. Clone the repository:

    git clone https://github.com/jasonB-LC/common-words-jb.git

2. For back end:
    In IntelliJ, find common-words-backend/src/main/java/project.common_words_backend/CommonWordsBackendApplication.java
    Right click the file and choose 'Run CommonWordsBac....main()

3. For front end 

    cd common-words-frontend

    npm install

    npm run dev

    navigate browser to http://localhost:5173/

Be sure to update spring.datasource.url in application.properties to point to the local host provided by your SQL database. All Node.js dependencies should be in package.json. Run: 
```bash
pip npm install
```
in your top front-end folder to install them.
## Notes
eBook reader coming in a future update




Link to wireframe: https://excalidraw.com/#json=Aj87dcpNId7aK225JDWyA,14BBdrQdAT27tEk3nxMy0g

Link to ERD: https://www.figma.com/board/6TXJGaB4NJ6KZ9pjm9FgoQ/FigJam-ER-Diagram-Template--Community-?node-id=0-1&t=fzyC8KmMcGKhAvBC-1