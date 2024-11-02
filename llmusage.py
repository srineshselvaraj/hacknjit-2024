import llm
from notereader import read_image_file

def notes_summary(text = None, file=None):
    model = llm.get_model("Meta-Llama-3-8B-Instruct")
    conversation = model.conversation()
    if file:
        notes_text = read_image_file(file)
    else:
        notes_text = text
    response = conversation.prompt(f"Summarize {notes_text}", max_tokens = 1000)
    return response


