import llm, re
from notereader import read_image_file

summarized = False

def notes_handler(text = None, file=None, request="summary"):
    global summarized
    model = llm.get_model("Meta-Llama-3-8B-Instruct")
    conversation = model.conversation()
    if file:
        notes_text = read_image_file(file)
    elif text:
        notes_text = text        
    if request == "summary": 
        response = conversation.prompt(f"Summarize {notes_text}", max_tokens = 1000)
        summarized = True
        return response.text()
    elif request == "questions":
        if summarized == True:
            response = conversation.prompt(f"Come up with three questions that will help me test my understanding of the previously summarized notes in this exact format: '1. (question) 2. (question) 3. (question)' and do not add any other words to your response. ", max_tokens = 2000)
        else:
            response = conversation.prompt(f"Come up with three questions that will help me test my understanding of the notes below in this exact format: '1. (question) 2. (question) 3. (question)' and do not add any other words to your response. \n The notes mentioned above: {notes_text}", max_tokens = 2000)
        
        pattern = r'\d+\.\s*([^?]*\?)'

        matches = re.findall(pattern, response)

        cleaned_questions = [match.strip() for match in matches]
        
        return cleaned_questions

