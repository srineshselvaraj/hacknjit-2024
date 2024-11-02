import llm, time


model = llm.get_model("Meta-Llama-3-8B-Instruct")
conversation = model.conversation()
start_time = time.time()
userinput = input("What can I help with? ")

while userinput != "end":
    response = conversation.prompt(userinput, max_tokens = 1000)
    for chunk in response.text():
        print(chunk, end="")
    elapsed_time = time.time() - start_time     
    print(f"\nElapsed time: {elapsed_time} seconds")
    userinput = input("Message the LLM... ")
    start_time = time.time()


