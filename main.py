import llm

model = llm.get_model("Meta-Llama-3-8B-Instruct")
conversation = model.conversation()
userinput = input("What can I help with? ")

while userinput != "end":
    response = conversation.prompt(userinput)
    print(response.text())
    userinput = input("Message the LLM... ")




"""for chunk in response:
    print(chunk, end="")"""
