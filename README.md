# COGnition

## Project Overview
### Description
An LLM-powered learning tool that allows users to quickly generate summaries, questions, and flashcards based on any given text, with OCR capabilities, a login system, and an intuitive layout.

### Inspiration
We wanted to do something in the realm of AI and decided that creating a page where students could use LLM technology to create study tools like flashcards and summaries would be very useful, since creating tools like that for studying is an intensive task that only ends up giving the student less time to use the tools they made.

## Features
- Uses OCR technology to scrape text from an image or pdf
- Generates summaries of user inputted text such as notes or articles
- Generates questions designed to test the user's reading comprehension and understanding of the text's content
- Generates flashcards of the important terms and definitions in the text in order for the user to study them 

## Tech Stack
### Front-End
- React.js
- JavaScript
- CSS
- HTML
- Bootstrap

### Back-End
- Python
- Flask
- LLM
- Pytesseract
- PIL
- PyPDF2

### Database
- PostgreSQL

## Installation

1. Clone the Repository
```
git clone https://github.com/srineshselvaraj/hacknjit-2024.git
cd hacknjit-2024
```
2. Install Dependencies

Front-End

```
cd client
npm install
npm install react-router-dom

```

Back-End
Ensure you have Conda installed to create a Conda Environment
```
conda env create -f environment.yml
conda activate cognition

```

4. Run the Project
```
#In one terminal, run the back-end
python app.py

#In another terminal, run the front-end
cd client
npm start
```

## Usage
To use the application, enter in text in the textbox. Next, click the buttons to have the website generate several different things based on which button was pressed: 
- Summarize: Generates summaries of user inputted text such as notes or articles
- Generate Questions: Generates questions designed to test the user's reading comprehension and understanding of the text's content
- Generate Flashcards: Generates flashcards of the important terms and definitions in the text in order for the user to study them

## Contributors

Anirudh Krishna Ramkumar

Srinesh Selvaraj 

John Argonza 


