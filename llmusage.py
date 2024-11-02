import llm
import time
from notereader import read_image_file


model = llm.get_model("Meta-Llama-3-8B-Instruct")
conversation = model.conversation()
start_time = time.time()
#userinput = input("What can I help with? ")
notes_text = read_image_file("hacknjit-2024/textimagetest.png")
print("Response recieved!")
response = conversation.prompt(f"Summarize {notes_text}", max_tokens = 1000)
for chunk in response.text():
    print(chunk, end="")



"""while userinput != "end":
    response = conversation.prompt(userinput, max_tokens = 1000)
    for chunk in response.text():
        print(chunk, end="")
    elapsed_time = time.time() - start_time     
    print(f"\nElapsed time: {elapsed_time} seconds")
    userinput = input("Message the LLM... ")
    start_time = time.time()
"""

