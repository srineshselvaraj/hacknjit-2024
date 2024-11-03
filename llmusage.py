import llm, re

last_notes_text = ""

def notes_handler(text = None, request="summary"):
    global last_notes_text
    model = llm.get_model("Meta-Llama-3-8B-Instruct")
    conversation = model.conversation()
    if text:
        notes_text = text
        last_notes_text = notes_text     
    if request == "summary": 
        notes_text = last_notes_text
        return "mario kart"
        """print("summary test")
        response = conversation.prompt(f"Summarize {notes_text}", max_tokens = 8192)
        for chunk in response.text():
            print(chunk, end="")"""
        return response.text()
    elif request == "questions":
        print("americaine")
        notes_text = last_notes_text
        return ["mario kart", "ario kart", "rio kart"]
        """response = conversation.prompt(f"Given the following notes, please generate 3 unique questions to test a reader’s comprehension. The questions should focus on deeper understanding rather than surface details, encouraging the reader to think critically about the main ideas, key concepts, and implications. Provide questions that vary in type (for example, one open-ended question, one application-based question, and one that asks the reader to analyze or interpret a part of the text). The questions should be clear, specific, and relevant to the main points. \n The notes mentioned above: {notes_text}", max_tokens = 8192)
        
        pattern = r'\d+\.\s*([^?]*\?)'

        matches = re.findall(pattern, response.text())

        cleaned_questions = [match.strip() for match in matches]
        
        print(cleaned_questions)
        return cleaned_questions"""
    elif request == "flashcards":
        notes_text = last_notes_text
        return "wario kart"
        """print("hi")
        response = conversation.prompt(f"Given the following lecture notes, identify the most important definitions and create a list of flashcards formatted as a Python dictionary. Each dictionary entry should have the term as the key and the definition as the value. Here are the notes: {notes_text}", max_tokens = 8192)
        matches = re.findall(r'```(.*?)```', response.text(), re.DOTALL)
        print(matches[0])
        return matches[0]"""
    
        
