import llm, re, json

"""CACHE_FILE_PATH = 'cache.json'

# Load cached data from file if it exists
try:
    with open(CACHE_FILE_PATH, 'r') as file:
        usercache = json.load(file)
except json.decoder.JSONDecodeError:
    usercache = []

cached_note_item = {
    "Original Notes":  "",
    "Summary": "",
    "Questions": [],
    "Flashcards": {},
    "Feedback": []
}"""


last_notes_text = ""
notes_text = ""


def notes_handler(text = None, request="summary"):
    global last_notes_text
    global notes_text
    # global cached_note_item
    model = llm.get_model("Meta-Llama-3-8B-Instruct")
    conversation = model.conversation()
    """for cached_note_item in usercache:
        if text == cached_note_item["Original Notes"]:
            if request == "summary":
                return cached_note_item["Summary"]
            elif request == "questions":
                return cached_note_item["Questions"]
            elif request == "flashcards":
                return cached_note_item["Flashcards"]"""
        
    if text:
        if request != "feedback": 
            notes_text = text
            last_notes_text = notes_text  
            #cached_note_item["Original Notes"] = notes_text
        elif request == "feedback":
            answers = text
            #cached_note_item["Feedback"] = answers   
    if request == "summary": 
        notes_text = last_notes_text
        response = conversation.prompt(f"Summarize {notes_text}", max_tokens = 8192)
        #cached_note_item["Summary"] = response.text()
        result = response.text()
    elif request == "questions":
        
        notes_text = last_notes_text
        response = conversation.prompt(f"Given the following notes, please generate 3 unique questions to test a reader’s comprehension. The questions should focus on deeper understanding rather than surface details, encouraging the reader to think critically about the main ideas, key concepts, and implications. Provide questions that vary in type (for example, one open-ended question, one application-based question, and one that asks the reader to analyze or interpret a part of the text). The questions should be clear, specific, and relevant to the main points. \n The notes mentioned above: {notes_text}", max_tokens = 8192)
        
        pattern = r'\d+\.\s*([^?]*\?)'

        matches = re.findall(pattern, response.text())

        cleaned_questions = [match.strip() for match in matches]
        
        #cached_note_item["Questions"] = cleaned_questions
        result = cleaned_questions
    elif request == "flashcards":
        notes_text = last_notes_text
        response = conversation.prompt(f"Given the following lecture notes, identify the most important definitions and create a list of flashcards formatted as a Python dictionary. COME UP WITH UNIQUE DEFINITIONS THAT AREN'T COPY PASTED FROM THE TEXT (generate them)! Each dictionary entry should have the term as the key and the definition as the value. Here are the notes: {notes_text}", max_tokens = 8192)
        matches = re.findall(r'= (.*?)```', response.text(), re.DOTALL)
        returnable = json.loads(matches[0])
        
        #cached_note_item["Flashcards"] = returnable
        result = returnable
    elif request == "feedback":
        response = conversation.prompt(f"Given the questions you just asked, provide feedback for each answer listed below, letting the user know whether they were right or wrong and where their logic can improve - structure your response as a boolean list in python with a value of true or false for each question depending on whether or not the user was right followed by feedback for each response. Here are the user's answers: {answers}")
        
        #cached_note_item["Feedback"] = response.text()
        result = response.text()
    
#    if cached_note_item not in usercache:   
#        usercache.append(cached_note_item)
#    with open(CACHE_FILE_PATH, 'w') as file:
#        json.dump(usercache, file)

    return result

    
        
